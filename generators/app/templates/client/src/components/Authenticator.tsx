import { Auth } from "aws-amplify";
import * as React from "react";

import { Spinner } from "./Spinner";

interface IAuthenticatorProps {
    children?: React.ReactNode;
}

interface IAuthenticatorState {
    user: any;
}

export class Authenticator extends React.Component<IAuthenticatorProps, IAuthenticatorState> {
    constructor(props: IAuthenticatorProps) {
        super(props);
        this.state = {
            user: null,
        };
    }

    public async componentDidMount(): Promise<void> {
        const user = await Auth.currentAuthenticatedUser();

        this.setState({
            user,
        });
    }

    public render(): JSX.Element {
        const { user } = this.state;
        const { children } = this.props;

        if (!user) {
            return <Spinner />;
        }

        return <>{children}</>;
    }
}
