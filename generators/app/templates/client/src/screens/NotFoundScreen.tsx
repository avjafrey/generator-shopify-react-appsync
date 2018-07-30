import { EmptyState, Page } from "@shopify/polaris";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Embedded } from "../components/Embedded";

export class NotFoundScreen extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {};
    }

    // Renders the not found page
    public render(): JSX.Element {
        document.title = "Shopify App — Page Not Found";

        return (
            <Embedded>
                <div className="application">
                    <Page title="Page Not Found">
                        <EmptyState
                            heading="Page Not Found"
                            action={{ content: "Go to Dashboard", url: "/" }}
                            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                        >
                            <p>Oh no! We could not find the page you were looking for.</p>
                        </EmptyState>
                    </Page>
                </div>
            </Embedded>
        );
    }
}
