import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Login } from "../components/Login";
import { parseQueryString } from "../lib/query-string";
import { PolarisErrorScreen } from "../screens/PolarisErrorScreen";

declare const API_GATEWAY: string;
declare const AUTH_TOKEN_KEY: string;
declare const SHOP_KEY: string;

export interface ILoginScreenProps extends RouteComponentProps<{}> {
}

export interface ILoginScreenState {
    disableInstall: boolean;
    errorMessage: string | undefined;
    installMessage: string;
    shop: string;
}

export class LoginScreen extends React.Component<ILoginScreenProps, ILoginScreenState> {
    constructor(props: ILoginScreenProps) {
        super(props);
        this.state = {
            disableInstall: false,
            errorMessage: undefined,
            installMessage: "Install",
            shop: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Once the component has mounted we should check to see if the shop query string parameter was provided and
    // automatically log into that store.
    public componentDidMount(): void {
        const params = parseQueryString(this.props.location.search);
        const shop = params.shop;
        if (shop !== undefined) {
            // Validate the shop domain and set the state
            const errorMessage = this.shopErrorMessage(shop);
            this.setState({
                errorMessage,
                shop,
            });

            // Iff there was no error message the attempt to login
            if (errorMessage === undefined) {
                this.doLogin(shop);
            }
        }
    }

    // Render the login page
    public render(): JSX.Element {
        if (window.top !== window.self) {
            window.top.location.href = window.self.location.href;
        }

        document.title = "Shopify App — Installation";

        return (
            <AppProvider forceRedirect={false}>
                <PolarisErrorScreen>
                    <Login
                        shop={this.state.shop}
                        disableInstall={this.state.disableInstall}
                        handleSubmit={this.handleSubmit}
                        handleStoreChanged={this.handleChange}
                        errorMessage={this.state.errorMessage}
                        installMessage={this.state.installMessage}
                    />
                </PolarisErrorScreen>
            </AppProvider>
        );
    }

    // Obtain the OAuth URL and redirect the user to it.
    private doLogin(shop: string): void {
        this.setState({
            disableInstall: true,
            installMessage: "Please wait...",
        }, async () => {
            localStorage.setItem(SHOP_KEY, this.state.shop);
            const callbackUrl =
                `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
                + "/auth/shopify/callback";
            // tslint:disable-next-line:max-line-length
            const url = `${API_GATEWAY}/auth/shopify?callback-url=${callbackUrl}&shop=${shop}`;
            try {
                const result = await fetch(url, {
                    cache: "no-cache",
                    method: "GET",
                });
                if (result.ok) {
                    const json = await result.json();
                    localStorage.setItem(AUTH_TOKEN_KEY, json.token);
                    // If the current window is the 'parent', change the URL by setting location.href
                    if (window.top === window.self) {
                        window.location.href = json.authUrl;

                        // If the current window is the 'child', change the parent's URL with postMessage
                    } else {
                        const message = JSON.stringify({
                            data: { location: window.location.origin + "?shop=" + shop },
                            message: "Shopify.API.remoteRedirect",
                        });
                        window.parent.postMessage(message, `https://${shop}`);
                    }
                    this.setState({
                        errorMessage: undefined,
                        installMessage: "Install",
                    });
                    return;
                } else {
                    console.error(result.statusText);
                }
            } catch (err) {
                console.error(err);
            }
            this.setState({
                disableInstall: false,
                errorMessage: "API Call Failed.",
                installMessage: "Install",
            });
        });
    }

    // Update our state as the shop component changed
    private handleChange(value: string, id: string): void {
        this.setState({ [id as keyof ILoginScreenState]: value } as any);
    }

    // Returns the error message if the shop domain is invalid, otherwise null
    private shopErrorMessage(shop: string): string | undefined {
        if (shop.match(/^[a-z][a-z0-9\-]*\.myshopify\.com$/i) == null) {
            return "Shop URL must end with .myshopify.com";
        }
        return undefined;
    }

    // Validate the shop domain and attempt the OAuth process it there is no error
    private handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
        evt.preventDefault();
        const errorMessage = this.shopErrorMessage(this.state.shop);
        this.setState({
            errorMessage,
        });
        if (errorMessage === undefined) {
            this.doLogin(this.state.shop);
        }
    }
}
