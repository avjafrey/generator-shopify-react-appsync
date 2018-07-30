import "source-map-support/register";

import { Context } from "aws-lambda";
import * as AWS from "aws-sdk";
import fetch, { Request, RequestInit, Response } from "node-fetch";

import { IStoredShopDataUpdate } from "./interfaces";
import { writeShop } from "./lib/dynamodb";
import { withAsyncMonitoring } from "./lib/monitoring";
import { GetShopSettingsQuery } from "./schema-shopify";

import * as GetShopSettingsQueryGQL from "./graphql/GetShopSettingsQuery.graphql";

export async function handlerAsync(
    event: any,
    dynamodb: AWS.DynamoDB.DocumentClient,
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<IStoredShopDataUpdate> {
    const { accessToken, id: shopDomain } = event;

    const resp = await fetchFn(`https://${shopDomain}/admin/api/graphql.json`, {
        body: GetShopSettingsQueryGQL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/graphql",
            "X-Shopify-Access-Token": accessToken,
        },
        method: "POST",
    });

    const json = await resp.json();
    const shop = (json.data as GetShopSettingsQuery).shop;

    const data: IStoredShopDataUpdate = {
        country: "shop.country",
        domain: "shop.domain",
        email: shop.email,
        id: shopDomain,
        name: shop.name,
        platform: "SHOPIFY",
        platformPlan: "shop.plan_name",
        timezone: "shop.iana_timezone",
    };

    await writeShop(dynamodb, data);

    return data;
}

export const handler = withAsyncMonitoring<any, Context, IStoredShopDataUpdate>(
    async (event: any): Promise<IStoredShopDataUpdate> => {
        const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

        return await handlerAsync(event, dynamodb, fetch);
    });
