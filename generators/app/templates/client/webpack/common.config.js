const path = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    return {
        entry: ["babel-polyfill", "whatwg-fetch", "raf", "./src/index.tsx"],

        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "../dist"),
            publicPath: "/",
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "shopify-react-appsync",
                template: "src/index.ejs",
            }),
            new FaviconsWebpackPlugin({
                logo: path.resolve(__dirname, "../src/favicon.png"),
                prefix: "favicons/",
                inject: true,
                background: "#ffffff",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],

        resolve: {
            mainFields: ["browser", "main", "module"],
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".tsx", ".ts", ".mjs", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto",
                },
                {
                    test: /^(?!.*\.global\.css$).*\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                camelCase: true,
                                modules: true,
                                namedExport: true,
                                sourceMap: true,
                            },
                        }
                    ],
                },
                {
                    test: /^(?!.*\.global\.s(c|a)ss$).*\.s(c|a)ss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                camelCase: true,
                                modules: true,
                                namedExport: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        }
                    ],
                },
                {
                    test: /\.global\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                camelCase: true,
                                modules: false,
                                namedExport: true,
                                sourceMap: true,
                            },
                        }
                    ]
                },
                {
                    test: /\.global\.s(c|a)ss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                camelCase: true,
                                modules: false,
                                namedExport: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        }
                    ],
                },
                { test: /\.(graphql|gql)$/, loader: "graphql-tag/loader", exclude: /node_modules/ },
                { test: /\.js$/, loader: "source-map-loader", enforce: "pre", exclude: /node_modules/ },
                { test: /\.tsx$/, loader: "source-map-loader", enforce: "pre", exclude: /node_modules/ },
                { test: /\.tsx?$/, loader: ["ts-loader"] }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
    };
};
