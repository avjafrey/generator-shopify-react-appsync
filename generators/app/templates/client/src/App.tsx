import ApolloClient from "apollo-client";
import Amplify, { Auth } from "aws-amplify";
import AWSAppsyncClient, { AUTH_TYPE } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CallbackScreen } from "./screens/CallbackScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { LogoutScreen } from "./screens/LogoutScreen";
import { NotFoundScreen } from "./screens/NotFoundScreen";
import { UnexpectedErrorScreen } from "./screens/UnexpectedErrorScreen";

declare const APPSYNC_AUTH_TYPE: AUTH_TYPE;
declare const APPSYNC_ENDPOINT: string;
declare const APPSYNC_REGION: string;
declare const AUTH_COOKIE_DOMAIN: string;
declare const AUTH_COOKIE_EXPIRES: number;
declare const AUTH_COOKIE_PATH: string;
declare const AWS_COGNITO_IDENTITY_POOL_ID: string;
declare const AWS_COGNITO_REGION: string;
declare const AWS_COGNITO_USER_POOL_ID: string;
declare const AWS_COGNITO_USER_POOL_CLIENT_ID: string;

Amplify.configure({
    Auth: {
        cookieStorage: {
            domain: AUTH_COOKIE_DOMAIN,
            expires: AUTH_COOKIE_EXPIRES,
            path: AUTH_COOKIE_PATH,
            secure: true,
        },
        identityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
        region: AWS_COGNITO_REGION,
        userPoolId: AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
    },
});

// @ts-ignore
const client: ApolloClient<{}> = new AWSAppsyncClient<{}>({
    auth: {
        jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
        type: APPSYNC_AUTH_TYPE,
    },
    region: APPSYNC_REGION,
    url: APPSYNC_ENDPOINT,
});

export class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <UnexpectedErrorScreen>
                <React.StrictMode>
                    <ApolloProvider client={client}>
                        // @ts-ignore
                        <Rehydrated>
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/auth/:platform/callback" component={CallbackScreen} />
                                    <Route path="/login" component={LoginScreen} />
                                    <Route path="/logout" component={LogoutScreen} />
                                    <Route path="/" component={HomeScreen} exact={true} />
                                    <Route component={NotFoundScreen} />
                                </Switch>
                            </BrowserRouter>
                        </Rehydrated>
                    </ApolloProvider>
                </React.StrictMode>
            </UnexpectedErrorScreen>
        );
    }
}
