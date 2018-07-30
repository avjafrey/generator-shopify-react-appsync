import { Auth } from "aws-amplify";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

declare const AUTH_TOKEN_KEY: string;
declare const SHOP_KEY: string;

export interface ILogoutScreenProps extends RouteComponentProps<{}> {
}

export class LogoutScreen extends React.Component<ILogoutScreenProps, {}> {
    constructor(props: ILogoutScreenProps) {
        super(props);
        this.state = {};
    }

    // Renders the logout page
    public render(): JSX.Element {
        // Remove the token and shop from our session storage. These are used by the CheckAuth to determine if someone
        // is logged in
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(SHOP_KEY);

        Auth.signOut();

        document.title = "Shopify App — Logout";

        // Redirect the user to login page
        return <Redirect push={true} to="/login" />;
    }
}
