import { EmptyState } from "@shopify/polaris";
import * as React from "react";

export function UnexpectedError() {
    return (
        <main role="main">
            <EmptyState
                heading="Unexpected Error"
                action={{ content: "Application Home", url: "/" }}
                image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
                <p>Well this is embarrasing. Something unexpected happened and we couldn't recover.</p>
            </EmptyState>
        </main>
    );
}
