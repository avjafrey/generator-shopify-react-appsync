import "source-map-support/register";

import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import * as querystring from "querystring";

import { badRequest, internalError, ok } from "./lib/http";
import { createJWT } from "./lib/jwt";
import { withAsyncMonitoring } from "./lib/monitoring";
import { getRandomString } from "./lib/string";

export async function handlerAsync(event: APIGatewayEvent, now: Date, nonce: string): Promise<ProxyResult> {
    try {
        const shopifyApiKey = process.env.SHOPIFY_API_KEY;
        const shopifyScope = process.env.SHOPIFY_SCOPE;

        if (!shopifyApiKey) {
            throw new Error("SHOPIFY_API_KEY environment variable not set");
        }

        if (!shopifyScope) {
            throw new Error("SHOPIFY_SCOPE environment variable not set");
        }

        if (!event.queryStringParameters) {
            return badRequest("No query string paramters found");
        }

        const { "callback-url": callbackUrl, "per-user": perUser, shop } = event.queryStringParameters;

        if (!callbackUrl) {
            return badRequest("'callback-url' parameter missing");
        }

        if (!shop) {
            return badRequest("'shop' parameter missing");
        }

        if (!shop.match(/[a-z0-9][a-z0-9\-]*\.myshopify\.com/i)) {
            return badRequest("'shop' parameter must end with .myshopify.com and may only contain a-z, 0-9, - and .");
        }

        // Build our authUrl
        const eNonce = querystring.escape(nonce);
        const eClientId = querystring.escape(shopifyApiKey);
        const eScope = querystring.escape(shopifyScope.replace(":", ","));
        const eCallbackUrl = querystring.escape(callbackUrl);
        const option = perUser === "true" ? "&option=per-user" : "";
        // tslint:disable-next-line:max-line-length
        const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${eClientId}&scope=${eScope}&redirect_uri=${eCallbackUrl}&state=${eNonce}${option}`;

        // Return the authURL
        return ok({
            authUrl,
            token: createJWT(shop, nonce, now, 600),
        });
    } catch (e) {
        console.log("Error", e);
        return internalError();
    }
}

export const handler = withAsyncMonitoring<APIGatewayEvent, Context, ProxyResult>(
    async (event: APIGatewayEvent): Promise<ProxyResult> => {
        return await handlerAsync(event, new Date(), getRandomString());
    });
