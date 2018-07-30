import { IShopifyConfig } from "./interfaces";

export const config: IShopifyConfig = {
    // The ScriptTags that should be added when the application is installed. Set to [] for none
    scriptTags: [
            // { src: "https://www.example.com/tag.js", event: "onload", display_scope: "all" }
        ],
    // The Webhooks that should be added when the application is installed. Set to [] for none
    webhooks: [
            {
                address: `${process.env.WEBHOOKS_URL}/app/uninstalled`,
                format: "json",
                snsTopicArn: process.env.APP_UNINSTALLED_TOPIC_ARN || "",
                topic: "app/uninstalled",
            },
            {
                address: `${process.env.WEBHOOKS_URL}/shop/update`,
                format: "json",
                snsTopicArn: process.env.SHOP_UPDATE_TOPIC_ARN || "",
                topic: "shop/update",
            },
        ],
};
