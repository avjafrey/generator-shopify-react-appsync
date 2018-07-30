import { CognitoUserPoolEvent, Context } from "aws-lambda";
import { createJWT } from "../lib/jwt";
import { handler } from "../verifyAuthChallengeResponse";

beforeAll(() => {
    process.env.JWT_ISS = "jwt-iss";
    process.env.JWT_SECRET = "jwt-secret";
});

afterAll(() => {
    delete process.env.JWT_ISS;
    delete process.env.JWT_SECRET;
});

test("Returns failure if JWT_SECRET environment variable isn't set", async () => {
    // @ts-ignore
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            // tslint:disable-next-line:max-line-length
            challengeAnswer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjY0NDg5NjIsImlhdCI6MTUyNjQ0ODk1MiwiaXNzIjoiand0LWlzcyIsImp0aSI6Imp3dC1pc3MiLCJzdWIiOiJleGFtcGxlQG15c2hvcGlmeS5jb20ifQ.rR9a9ulWy0UPXvN6NN5eGmaE0-CYS0MidICduVXH7uo",
            userAttributes: {},
        },
        response: {},
        triggerSource: "VerifyAuthChallengeResponse_Authentication",
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

    expect(result.response.answerCorrect).toBe(false);
});

test("Returns failure if no challenge answer is provided", async () => {
    // @ts-ignore
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            challengeAnswer: "",
            userAttributes: {},
        },
        response: {},
        triggerSource: "VerifyAuthChallengeResponse_Authentication",
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

    expect(result.response.answerCorrect).toBe(false);
});

test("Returns failure if token doesn't validate", async () => {
    // @ts-ignore
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            // tslint:disable-next-line:max-line-length
            challengeAnswer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjY0NDg5NjIsImlhdCI6MTUyNjQ0ODk1MiwiaXNzIjoiand0LWlzcyIsImp0aSI6Imp3dC1pc3MiLCJzdWIiOiJleGFtcGxlQG15c2hvcGlmeS5jb20ifQ.rR9a9ulWy0UPXvN6NN5eGmaE0-CYS0MidICduVXH7uo",
            userAttributes: {},
        },
        response: {},
        triggerSource: "VerifyAuthChallengeResponse_Authentication",
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

    expect(result.response.answerCorrect).toBe(false);
});

test("Returns success if the token is valid", async () => {
    const challengeAnswer = createJWT("example@myshopify.com", process.env.JWT_ISS || "", new Date(), 600);

    // @ts-ignore
    const event: CognitoUserPoolEvent = {
        callerContext: {
            awsSdkVersion: "1",
            clientId: "",
        },
        region: "",
        request: {
            challengeAnswer,
            userAttributes: {},
        },
        response: {},
        triggerSource: "VerifyAuthChallengeResponse_Authentication",
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

    expect(result.response.answerCorrect).toBe(true);
});
