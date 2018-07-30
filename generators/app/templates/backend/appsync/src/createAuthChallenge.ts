import "source-map-support/register";

import { CognitoUserPoolEvent, Context } from "aws-lambda";

import { withAsyncMonitoring } from "./lib/monitoring";

export const handler = withAsyncMonitoring<CognitoUserPoolEvent, Context, CognitoUserPoolEvent>(
    async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
        if (!event.request.session || event.request.session.length === 0) {
            // For the first challenge ask for a JWT token
            event.response.publicChallengeParameters = {
                distraction: "Yes",
            };
            event.response.privateChallengeParameters = {
                distraction: "Yes",
            };
            // @ts-ignore
            event.response.challengeMetadata = "JWT";
        }

        console.log("Response", event.response);

        return event;
    });
