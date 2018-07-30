import "source-map-support/register";

import { Context } from "aws-lambda";
import fetch, { Request, RequestInit, Response } from "node-fetch";

import { config } from "./config";
import { IStoredShopDataCreate } from "./interfaces";
import { withAsyncMonitoring } from "./lib/monitoring";
import { ICreateScriptTag, IScriptTag, IUpdateScriptTag } from "./lib/shopify";

export async function handlerAsync(
    event: IStoredShopDataCreate,
    scriptTags: ICreateScriptTag[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<IStoredShopDataCreate> {
    const { accessToken, id: shopDomain } = event;

    // TODO This code needs to be made idempotent
    const currentScriptTags = await allScriptTags(shopDomain, accessToken, fetchFn);
    await deleteScriptTags(shopDomain, accessToken, currentScriptTags, scriptTags, fetchFn);
    await updateScriptTags(shopDomain, accessToken, currentScriptTags, scriptTags, fetchFn);
    await createScriptTags(shopDomain, accessToken, currentScriptTags, scriptTags, fetchFn);

    return event;
}

async function allScriptTags(
    shopDomain: string,
    accessToken: string,
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<IScriptTag[]> {
    const resp = await fetchFn(`https://${shopDomain}/admin/script_tags.json`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
        },
        method: "GET",
    });
    console.log(resp);
    const json = await resp.json();
    return json.script_tags as IScriptTag[];
}

async function createScriptTags(
    shopDomain: string,
    accessToken: string,
    currentTags: IScriptTag[],
    requiredScriptTags: ICreateScriptTag[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const promises: Array<Promise<any>> = [];

        console.log("Checking for ScriptTags that need to be created");
        requiredScriptTags.forEach((tag) => {
            if (!currentTags.some((currentValue, _index, _array) => currentValue.src === tag.src)) {
                console.log("ScriptTag needs to be created", tag);
                promises.push(fetchFn(`https://${shopDomain}/admin/script_tags.json`, {
                    body: JSON.stringify({ script_tag: tag }),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": accessToken,
                    },
                    method: "POST",
                }));
            }
        });

        if (promises.length > 0) {
            Promise.all(promises)
                .then((scriptTag) => {
                    console.log("ScriptTag created", scriptTag);
                    resolve();
                })
                .catch((err) => {
                    console.log("ScriptTag failed to create", err);
                    reject(err);
                });
        } else {
            console.log("No ScriptTags needed creating");
            resolve();
        }
    });
}

async function deleteScriptTags(
    shopDomain: string,
    accessToken: string,
    currentTags: IScriptTag[],
    requiredScriptTags: ICreateScriptTag[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const promises: Array<Promise<any>> = [];

        console.log("Checking for ScriptTags that need to be deleted");
        currentTags.forEach((tag) => {
            if (!requiredScriptTags.some((currentValue, _index, _array) => currentValue.src === tag.src)) {
                console.log("ScriptTag needs to be deleted", tag);
                promises.push(fetchFn(`https://${shopDomain}/admin/script_tags/${tag.id}.json`, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": accessToken,
                    },
                    method: "DELETE",
                }));
            }
        });

        if (promises.length > 0) {
            Promise.all(promises)
                .then((scriptTag) => {
                    console.log("ScriptTag deleted", scriptTag);
                    resolve();
                })
                .catch((err) => {
                    console.log("ScriptTag failed to delete", err);
                    reject(err);
                });
        } else {
            console.log("No ScriptTags needed deleting");
            resolve();
        }
    });
}

async function updateScriptTags(
    shopDomain: string,
    accessToken: string,
    currentTags: IScriptTag[],
    requiredScriptTags: IUpdateScriptTag[],
    fetchFn: (url: string | Request, init?: RequestInit) => Promise<Response>,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const promises: Array<Promise<any>> = [];

        console.log("Checking for ScriptTags that need to be updated");
        currentTags.forEach((tag) => {
            requiredScriptTags.forEach((currentValue) => {
                let requireUpdate = false;

                if (currentValue.src === tag.src) {
                    if ("event" in currentValue && currentValue.event !== tag.event) {
                        requireUpdate = true;
                    }
                    if ("display_scope" in currentValue && currentValue.display_scope !== tag.display_scope) {
                        requireUpdate = true;
                    }
                }

                if (requireUpdate) {
                    console.log("ScriptTag needs to be updated", tag);
                    promises.push(fetchFn(`https://${shopDomain}/admin/script_tags/${tag.id}.json`, {
                        body: JSON.stringify({ script_tag: tag }),
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "X-Shopify-Access-Token": accessToken,
                        },
                        method: "PUT",
                    }));
                }
            });
        });

        if (promises.length > 0) {
            Promise.all(promises)
                .then((scriptTag) => {
                    console.log("ScriptTag updated", scriptTag);
                    resolve();
                })
                .catch((err) => {
                    console.log("ScriptTag failed to update", err);
                    reject(err);
                });
        } else {
            console.log("No ScriptTags needed update");
            resolve();
        }
    });
}

export const handler = withAsyncMonitoring<IStoredShopDataCreate, Context, IStoredShopDataCreate>(
    async (event: IStoredShopDataCreate): Promise<IStoredShopDataCreate> => {
        return await handlerAsync(event, config.scriptTags, fetch);
    });
