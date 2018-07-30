import { AppProvider } from "@shopify/polaris";
import { Auth } from "aws-amplify";
import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { Callback } from "../components/Callback";
import { parseQueryString } from "../lib/query-string";
import { PolarisErrorScreen } from "../screens/PolarisErrorScreen";

declare const API_GATEWAY: string;
declare const AUTH_TOKEN_KEY: string;

export interface ICallbackScreenProps extends RouteComponentProps<{}> {
    children?: React.ReactNode;
}

export interface ICallbackScreenState {
    callbackSuccess: boolean;
    errorMessage: string | null;
    shop: string | undefined;
    sessionToken: string | undefined;
}

export class CallbackScreen extends React.Component<ICallbackScreenProps, ICallbackScreenState> {
    constructor(props: ICallbackScreenProps) {
        super(props);
        this.state = {
            callbackSuccess: false,
            errorMessage: null,
            sessionToken: undefined,
            shop: undefined,
        };
    }

    // This calls our API passing all of the query string parameters plus the token we receive when we started the
    // OAuth process. If it succeeds then set callbackSuccess to true triggering a redirect. If it fails then set
    // the errorMessage in the state so we display an error
    public async componentDidMount(): Promise<void> {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token === null) {
            return this.setState({ errorMessage: "Missing token" });
        }

        const params = parseQueryString(this.props.location.search);

        const url = `${API_GATEWAY}/auth/shopify`;
        const body = {
            params,
            token,
        };
        try {
            const result = await fetch(url, {
                body: JSON.stringify(body),
                cache: "no-cache",
                method: "POST",
            });
            if (result.ok) {
                const json = await result.json();
                const userName = params.shop.replace(".myshopify.com", "@myshopify.com");
                const user = await Auth.signIn(userName);
                if (user.challengeName === "CUSTOM_CHALLENGE" && user.challengeParam.distraction === "Yes") {
                    await Auth.sendCustomChallengeAnswer(user, json.token);
                }
                this.setState({
                    callbackSuccess: true,
                    errorMessage: null,
                });
            } else {
                console.error(result.statusText);
                this.setState({
                    callbackSuccess: false,
                    errorMessage: "API Call Failed.",
                });
            }
        } catch (err) {
            console.error(err);
            this.setState({
                callbackSuccess: false,
                errorMessage: "API Call Failed.",
            });
        }
    }

    // This first time this is called it will render "Please wait..." while the API call is performed. If that
    // is successfull then we'll redirect to / otherwise we'll update the page to display the errorMessage
    public render(): JSX.Element {
        document.title = "Shopify App — Callback";

        if (this.state.callbackSuccess) {
            return <Redirect to="/" />;
        } else {
            return (
                <AppProvider forceRedirect={false}>
                    <PolarisErrorScreen>
                        <div className="application">
                            <Callback errorMessage={this.state.errorMessage} loginUrl={`/login`} />
                        </div>
                    </PolarisErrorScreen>
                </AppProvider>
            );
        }
    }
}
