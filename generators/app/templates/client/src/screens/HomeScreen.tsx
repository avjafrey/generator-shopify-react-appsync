import { Card, DisplayText, FooterHelp, Page, Subheading } from "@shopify/polaris";
import { Alert } from "@shopify/polaris/embedded";
import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";

import { Authenticator } from "../components/Authenticator";
import { Embedded } from "../components/Embedded";
import { HomeScreenQuery, HomeScreenQueryVariables } from "../schema";

import * as HomeScreenGQL from "../graphql/HomeScreenQuery.graphql";

export interface IHomeScreenState {
    showModal: boolean;
}

export class HomeScreen extends React.Component<RouteComponentProps<{}>, IHomeScreenState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            showModal: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    // Renders a demo homepage
    public render(): JSX.Element {
        document.title = "Shopify App — Home";

        const homeScreenQueryVariables: HomeScreenQueryVariables = {
            shopDomain: "growing-ecommerce.myshopify.com",
        };

        return (
            <Embedded>
                <Authenticator>
                    <div className="application">
                        <Page
                            title="Example application"
                            primaryAction={{ content: "Save", onAction: this.handleSave }}
                        >
                            <Card sectioned={true}>
                                <DisplayText size="small">
                                    This starter kit makes it easy to get started building embedded Shopify apps using
                                    React, Polaris, TypeScript and AWS AppSync.
                                </DisplayText>
                            </Card>

                            <Card sectioned={true}>
                                <Subheading>The Tech Stack</Subheading>
                                <ul>
                                    <li><a href="https://facebook.github.io/react/" target="_blank">React</a></li>
                                    <li><a href="http://www.uptowncss.com/" target="_blank">TypeScript</a></li>
                                    <li><a href="https://palantir.github.io/tslint/" target="_blank">TSLint</a></li>
                                    <li><a href="https://polaris.shopify.com/" target="_blank">Polaris</a></li>
                                </ul>
                                <p>
                                    For more information please see the
                                    <a href="https://github.com/buggy/shopify-react-appsync">README</a>.
                                </p>
                            </Card>

                            <Card sectioned={true}>
                                <Subheading>Shop Info</Subheading>
                                <Query<HomeScreenQuery, HomeScreenQueryVariables>
                                    query={HomeScreenGQL}
                                    fetchPolicy={"network-only"}
                                    variables={homeScreenQueryVariables}
                                >
                                    {({ loading, error, data }) => {
                                        console.log("LOADING", loading);
                                        console.log("ERROR", error);
                                        console.log("DATA", data);

                                        if (loading) { return <p>Loading...</p>; }
                                        if (error) { return <p>Error :(</p>; }
                                        if (!data || !data.shop) { return <p>No Data</p>; }

                                        const {
                                            accessToken,
                                            country,
                                            domain,
                                            email,
                                            id,
                                            installedAt,
                                            name,
                                            platform,
                                            platformPlan,
                                            timezone,
                                        } = data.shop;

                                        return (
                                            <dl key={id}>
                                                <dt>accessToken</dt>
                                                <dd>{accessToken}</dd>
                                                <dt>country</dt>
                                                <dd>{country}</dd>
                                                <dt>domain</dt>
                                                <dd>{domain}</dd>
                                                <dt>email</dt>
                                                <dd>{email}</dd>
                                                <dt>installedAt</dt>
                                                <dd>{installedAt}</dd>
                                                <dt>name</dt>
                                                <dd>{name}</dd>
                                                <dt>platform</dt>
                                                <dd>{platform}</dd>
                                                <dt>platformPlan</dt>
                                                <dd>{platformPlan}</dd>
                                                <dt>timezone</dt>
                                                <dd>{timezone}</dd>
                                            </dl>
                                        );
                                    }}
                                </Query>
                            </Card>

                            <Alert
                                open={this.state.showModal}
                                onConfirm={this.hideModal}
                                confirmContent="Ok"
                            >
                                Saved!!
                            </Alert>

                            <FooterHelp>
                                Shopify Serverless Starter Kit &mdash; &copy; 2017
                                <a href="http://www.growingecommerce.com/" target="_blank">
                                    Growing eCommerce Pty Ltd
                                </a>.
                            </FooterHelp>
                        </Page>
                    </div>
                </Authenticator>
            </Embedded>
        );
    }

    // Called when the Alert is confirmed. By changing showModal to false here when render() is called it outputs
    // the Alert with open = false
    private hideModal(): void {
        this.setState({
            showModal: false,
        });
    }

    // Called when the save button is clicked. By changing showModal to true here when render() is called it outputs
    // the Alert with open = true
    private async handleSave(): Promise<void> {
        this.setState({
            showModal: true,
        });
    }
}
