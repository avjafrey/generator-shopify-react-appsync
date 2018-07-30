import { CognitoUserPoolEvent, Context } from "aws-lambda";
import { handler } from "../createAuthChallenge";

test("Works with no session", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            userAttributes: {},
        },
        response: {},
        triggerSource: "CreateAuthChallenge_Authentication",
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

    expect(result.response.publicChallengeParameters).toEqual({
        distraction: "Yes",
    });

    expect(result.response.privateChallengeParameters).toEqual({
        distraction: "Yes",
    });
});

test("Works with an empty session", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            session: [],
            userAttributes: {},
        },
        response: {},
        triggerSource: "CreateAuthChallenge_Authentication",
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

    expect(result.response.publicChallengeParameters).toEqual({
        distraction: "Yes",
    });

    expect(result.response.privateChallengeParameters).toEqual({
        distraction: "Yes",
    });
});

test("Works with a session that has values", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            session: [{
                challengeName: "CUSTOM_CHALLENGE",
                challengeResult: true,
            }],
            userAttributes: {},
        },
        response: {},
        triggerSource: "CreateAuthChallenge_Authentication",
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

    expect(result.response.publicChallengeParameters).not.toEqual({
        distraction: "Yes",
    });

    expect(result.response.privateChallengeParameters).not.toEqual({
        distraction: "Yes",
    });
});
