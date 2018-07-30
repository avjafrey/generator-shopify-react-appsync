const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./common.config.js");

module.exports = merge(common(), {
    devtool: "source-map",

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development"),
            },

            // AWS API Gateway endpoint for the AppSync service
            API_GATEWAY: JSON.stringify("PLEASE CHANGE"),

            // AWS AppSync authentication type
            APPSYNC_AUTH_TYPE: JSON.stringify("AMAZON_COGNITO_USER_POOLS"),

            // AWS AppSync authentication type
            APPSYNC_ENDPOINT: JSON.stringify("PLEASE CHANGE"),

            // AWS AppSync authentication type
            APPSYNC_REGION: JSON.stringify("PLEASE CHANGE"),

            // Domain for Amplify cookie storage
            AUTH_COOKIE_DOMAIN: JSON.stringify("localhost"),

            // Cookie expiry time for Amplify cookie storage
            AUTH_COOKIE_EXPIRES: JSON.stringify(365),

            // Path for Amplify cookie storage
            AUTH_COOKIE_PATH: JSON.stringify("/"),

            // The key used to store our temporary OAuth token in localStorage
            AUTH_TOKEN_KEY: JSON.stringify("authToken"),

            //  AWS Cognito Identity Pool ID
            AWS_COGNITO_IDENTITY_POOL_ID: JSON.stringify("PLEASE CHANGE"),

            //  AWS Cognito Identity Pool ID
            AWS_COGNITO_REGION: JSON.stringify("PLEASE CHANGE"),

            //  AWS Cognito User Pool ID
            AWS_COGNITO_USER_POOL_ID: JSON.stringify("PLEASE CHANGE"),

            //  AWS Cognito User Pool Client ID
            AWS_COGNITO_USER_POOL_CLIENT_ID: JSON.stringify("PLEASE CHANGE"),

            // Set to true to enable an embedded app or false to disable it
            ENABLED_EMBEDDED: JSON.stringify(true),

            // The key used to store the shop domain in localStorage
            SHOP_KEY: JSON.stringify("shop"),

            // Your Shopify API Key
            SHOPIFY_API_KEY: JSON.stringify("<%= shopifyApiKey %>"),
        }),
        new CopyWebpackPlugin([
            { from: "node_modules/react/umd/react.production.min.js", to: "js/react.js" },
            { from: "node_modules/react-dom/umd/react-dom.production.min.js", to: "js/react-dom.js" },
        ], {}),
    ],
});
