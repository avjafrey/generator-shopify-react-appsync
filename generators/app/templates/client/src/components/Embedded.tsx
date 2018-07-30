import { AppProvider } from "@shopify/polaris";
import * as React from "react";
import { Redirect } from "react-router-dom";

import { PolarisErrorScreen } from "../screens/PolarisErrorScreen";

declare const SHOP_KEY: string;
declare const SHOPIFY_API_KEY: string;

export interface IEmbeddedState {
    showModal: boolean;
}

export class Embedded extends React.Component<{}, IEmbeddedState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    // Renders a demo homepage
    public render(): JSX.Element {
        const shop = localStorage.getItem(SHOP_KEY);

        if (shop === undefined) {
            return <Redirect to="/login" />;
        }

        return (
            <AppProvider
                apiKey={SHOPIFY_API_KEY}
                // linkComponent={({children, url, ...rest}) => <Link to={url} {...rest}>{children}</Link>}
                shopOrigin={`https://${shop}`}
                forceRedirect={true}
            >
                <PolarisErrorScreen>
                    {this.props.children}
                </PolarisErrorScreen>
            </AppProvider>
        );
    }
}
