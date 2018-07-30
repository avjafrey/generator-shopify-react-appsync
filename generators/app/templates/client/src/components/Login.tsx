import { Button, DisplayText, FormLayout, TextField } from "@shopify/polaris";
import * as React from "react";

import { Spinner } from "./Spinner";

import * as styles from "./Login.scss";

interface ILoginProps {
    disableInstall: boolean;
    handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
    handleStoreChanged: (value: string, id: string) => void;
    errorMessage: string | undefined;
    installMessage: string;
    shop: string;
}

export function Login(props: ILoginProps) {
    return (
        <main role="main" className={styles.main}>
            <header className={styles.header}>
                <DisplayText size="extraLarge">Shopify App — Installation</DisplayText>
            </header>
            <div className={styles.form}>
                <form onSubmit={props.handleSubmit}>
                    <FormLayout>
                        <TextField
                            autoFocus={true}
                            error={props.errorMessage}
                            id="shop"
                            label="Please enter the “myshopify” domain of your store"
                            name="shop"
                            onChange={props.handleStoreChanged}
                            placeholder="example.myshopify.com"
                            value={props.shop}
                        />
                        {props.disableInstall && <Spinner />}
                        <Button
                            primary={true}
                            fullWidth={true}
                            size="large"
                            submit={true}
                            loading={props.disableInstall}
                        >
                            {props.installMessage}
                        </Button>
                    </FormLayout>
                </form>
            </div>
        </main>
    );
}
