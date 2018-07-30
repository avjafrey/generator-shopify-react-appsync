import { CognitoUserPoolEvent, Context } from "aws-lambda";
import { handler } from "../defineAuthChallenge";

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
        triggerSource: "DefineAuthChallenge_Authentication",
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

    expect(result.response.challengeName).toBe("CUSTOM_CHALLENGE");
    expect(result.response.failAuthentication).toBe(false);
    expect(result.response.issueTokens).toBe(false);
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
        triggerSource: "DefineAuthChallenge_Authentication",
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

    expect(result.response.challengeName).toBe("CUSTOM_CHALLENGE");
    expect(result.response.failAuthentication).toBe(false);
    expect(result.response.issueTokens).toBe(false);
});

test("Issues tokens if there is one successful challenge in the session", async () => {
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
        triggerSource: "DefineAuthChallenge_Authentication",
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

    expect(result.response.failAuthentication).toBe(false);
    expect(result.response.issueTokens).toBe(true);
});

test("Fails if there is one failed challenge in the session", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            session: [{
                challengeName: "CUSTOM_CHALLENGE",
                challengeResult: false,
            }],
            userAttributes: {},
        },
        response: {},
        triggerSource: "DefineAuthChallenge_Authentication",
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

    expect(result.response.failAuthentication).toBe(true);
    expect(result.response.issueTokens).toBe(false);
});

test("Fails with anything else", async () => {
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            session: [{
                challengeName: "CUSTOM_CHALLENGE",
                challengeResult: false,
            },
            {
                challengeName: "CUSTOM_CHALLENGE",
                challengeResult: false,
            }],
            userAttributes: {},
        },
        response: {},
        triggerSource: "DefineAuthChallenge_Authentication",
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

    expect(result.response.failAuthentication).toBe(true);
    expect(result.response.issueTokens).toBe(false);
});
