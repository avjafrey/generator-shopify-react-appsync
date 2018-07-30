import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { UnexpectedError } from "../components/UnexpectedError";

export interface IErrorScreenState {
    hasError: boolean;
}

export class PolarisErrorScreen extends React.Component<{}, IErrorScreenState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public componentDidCatch(error: Error, info: any): void {
        console.error("ERROR", error);
        console.error("INFO", info);

        // ADD REMOTE LOGGING HERE

        this.setState({hasError: true});
    }

    // Renders a demo homepage
    public render(): React.ReactNode {
        document.title = "Shopify App — Error";

        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div className="application">
                <UnexpectedError />
            </div>
        );
    }
}
