import "source-map-support/register";

import { Context } from "aws-lambda";
import fetch, { Request, RequestInit, Response } from "node-fetch";

import { config } from "./config";
import { IStoredShopDataCreate, IWebhookConfig } from "./interfaces";
import { withAsyncMonitoring } from "./lib/monitoring";
import { IWebhook } from "./lib/shopify";

async function updateOrRemoveExistingWebhooks(
    shopDomain: string,
    accessToken: string,
    webhooks: IWebhookConfig[],
    currentWebhooks: IWebhook[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<void> {
    // Check the existing webhooks
    for (const existingWebhook of currentWebhooks) {
        const newWebhook = webhooks.find((w) => w.topic === existingWebhook.topic);
        if (newWebhook === undefined) {
            // Removing any that should no longer be installed
            console.log("Removing webhook", existingWebhook);
            await fetchFn(`https://${shopDomain}/admin/webhooks/${existingWebhook.id}.json`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
                method: "DELETE",
            });
        } else {
            // Updating existing webhooks if they have changed
            if (existingWebhook.address !== newWebhook.address || existingWebhook.format !== newWebhook.format) {
                console.log("Updating webhook", newWebhook);
                const { snsTopicArn, stateMachineArn, ...updateWebhook } = newWebhook;
                await fetchFn(`https://${shopDomain}/admin/webhooks/${existingWebhook.id}.json`, {
                    body: JSON.stringify({ webhook: updateWebhook }),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": accessToken,
                    },
                    method: "PUT",
                });
            } else {
                console.log("Existing webhook [1]", existingWebhook);
            }
        }
    }
}

async function addNewWebhooks(
    shopDomain: string,
    accessToken: string,
    webhooks: IWebhookConfig[],
    currentWebhooks: IWebhook[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<void> {
    // Check the new webhooks and add them if they don't exist
    for (const newWebhook of webhooks) {
        console.log("New Webhook", newWebhook);

        const existingWebhook = currentWebhooks.find((w) => w.topic === newWebhook.topic);
        if (existingWebhook === undefined) {
            console.log("Adding webhook", newWebhook);
            const { snsTopicArn, stateMachineArn, ...createWebhook } = newWebhook;
            await fetchFn(`https://${shopDomain}/admin/webhooks.json`, {
                body: JSON.stringify({ webhook: createWebhook }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
                method: "POST",
            });
        } else {
            console.log("Existing webhook [2]", existingWebhook);
        }
    }
}

export async function handlerAsync(
    event: IStoredShopDataCreate,
    webhooks: IWebhookConfig[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<IStoredShopDataCreate> {
    const { accessToken, id: shopDomain } = event;
    if (!shopDomain) {
        console.log("shopDomain missing from the event");
        return event;
    }

    // Filter the mandatory webhooks
    const installableWebhooks = webhooks.filter((w) => {
        return w.topic !== "customers/redact" && w.topic !== "shop/redact";
    });

    if (installableWebhooks.length > 0) {
        // Get a list of all existing webhooks
        // TODO - Should this be paginated?
        const resp = await fetchFn(`https://${shopDomain}/admin/webhooks.json`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken,
            },
            method: "GET",
        });
        console.log("Response", resp);
        const json = await resp.json();
        console.log("JSON", json);
        const currentWebhooks = json.webhooks as IWebhook[];

        console.log("Configured webhooks", installableWebhooks);

        await updateOrRemoveExistingWebhooks(shopDomain, accessToken, installableWebhooks, currentWebhooks, fetchFn);
        await addNewWebhooks(shopDomain, accessToken, installableWebhooks, currentWebhooks, fetchFn);
    }

    return event;
}

export const handler = withAsyncMonitoring<IStoredShopDataCreate, Context, IStoredShopDataCreate>(
    async (event: IStoredShopDataCreate): Promise<IStoredShopDataCreate> => {
        return await handlerAsync(event, config.webhooks, fetch);
    });
