import "source-map-support/register";

import { CognitoUserPoolEvent, Context } from "aws-lambda";

import { withAsyncMonitoring } from "./lib/monitoring";

const autoConfirmDomains = [
    "@myshopify.com",
];

// Cognito User Pool Pre SignUp trigger to make sure the email address is stored as lower case.
export const handler = withAsyncMonitoring<CognitoUserPoolEvent, Context, CognitoUserPoolEvent>(
    async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
        if (event.request.userAttributes.email) {
            for (const domain of autoConfirmDomains) {
                if (event.request.userAttributes.email.endsWith(domain)) {
                    // @ts-ignore
                    event.response = {
                        autoConfirmUser: true,
                    };
                }
            }
        }

        return event;
    });
