import { ICreateScriptTag, ICreateWebhook, IShop, WebhookTopic } from "./lib/shopify";

export interface IWebhookConfig extends ICreateWebhook {
    snsTopicArn?: string;
    stateMachineArn?: string;
}

export interface IShopifyConfig {
    scriptTags: ICreateScriptTag[];
    webhooks: IWebhookConfig[];
}

export interface IBaseMessage {
    shopDomain: string;
    event: WebhookTopic | "app/auth_complete" | "app/installed";
    data: object | null;
}

export interface IAppUninstalledMessage extends IBaseMessage {
    data: IShop;
}

export interface IShopUpdateMessage extends IBaseMessage {
    data: IShop;
}

export interface IStoredShopDataUpdate {
    country: string;
    domain: string;
    email: string;
    id: string;
    name: string;
    platform: "SHOPIFY";
    platformPlan: string;
    timezone: string;
}

export interface IStoredShopDataCreate extends IStoredShopDataUpdate {
    accessToken: string;
    installedAt: string;
    userId: string;
}

export interface IStoredShopData extends IStoredShopDataUpdate, IStoredShopDataUpdate {
    accessToken: string;
    installedAt: string;
}
