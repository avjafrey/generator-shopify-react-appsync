import "source-map-support/register";

import { CognitoUserPoolEvent, Context } from "aws-lambda";
import * as jwt from "jsonwebtoken";

import { withAsyncMonitoring } from "./lib/monitoring";

export const handler = withAsyncMonitoring<CognitoUserPoolEvent, Context, CognitoUserPoolEvent>(
    async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
        const jwtSecret = process.env.JWT_SECRET;
        // @ts-ignore
        const challengeAnswer: string = event.request.challengeAnswer;
        if (!jwtSecret || !challengeAnswer) {
            console.log("No JWT_SECRET or challengeAnswer");
            event.response.answerCorrect = false;
        } else {
            try {
                jwt.verify(challengeAnswer, jwtSecret, {
                    clockTolerance: 600,
                    issuer: process.env.JWT_ISS || "<%= appname %>",
                    subject: event.userName,
                });
                event.response.answerCorrect = true;
            } catch (err) {
                console.log("Error verifying nonce", err);
                event.response.answerCorrect = false;
            }
        }

        return event;
    });
