import { CognitoUserPoolEvent, Context } from "aws-lambda";
import { handler } from "../preSignUp";

test("Auto verifies @myshopify.com accounts", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            userAttributes: {
                email: "test@myshopify.com",
            },
        },
        response: {
            autoConfirmUser: false,
        },
        triggerSource: "PreSignUp_SignUp",
        userPoolId: "",
        version: 1,
    };

    const context: Context = {
        awsRequestId: "",
        callbackWaitsForEmptyEventLoop: false,
        functionName: "",
        functionVersion: "",
        invokedFunctionArn: "",
        logGroupName: "",
        logStreamName: "",
        memoryLimitInMB: 256,

        // Functions
        getRemainingTimeInMillis: () => 1,

        done: (_error?: Error, _result?: any) => { return; },
        fail: (_error: Error | string) => { return; },
        succeed: (_messageOrObject: any, _object?: any) => { return; },
    };

    const result = await handler(event, context);

    expect(result.response.autoConfirmUser).toBeTruthy();
});

test("Does not auto verify @example.com accounts", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            userAttributes: {
                email: "test@example.com",
            },
        },
        response: {
            autoConfirmUser: false,
        },
        triggerSource: "PreSignUp_SignUp",
        userPoolId: "",
        version: 1,
    };

    const context: Context = {
        awsRequestId: "",
        callbackWaitsForEmptyEventLoop: false,
        functionName: "",
        functionVersion: "",
        invokedFunctionArn: "",
        logGroupName: "",
        logStreamName: "",
        memoryLimitInMB: 256,

        // Functions
        getRemainingTimeInMillis: () => 1,

        done: (_error?: Error, _result?: any) => { return; },
        fail: (_error: Error | string) => { return; },
        succeed: (_messageOrObject: any, _object?: any) => { return; },
    };

    const result = await handler(event, context);

    expect(result.response.autoConfirmUser).toBeFalsy();
});
