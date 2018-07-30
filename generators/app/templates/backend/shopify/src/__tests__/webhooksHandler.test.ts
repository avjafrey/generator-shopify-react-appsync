import { APIGatewayEvent } from "aws-lambda";
import * as AWS from "aws-sdk";
import { IWebhookConfig } from "../interfaces";
import { handlerAsync } from "../webhooksHandler";

beforeAll(() => {
    process.env.SHOPIFY_API_SECRET = "shopify-api-secret";
});

afterAll(() => {
    delete process.env.SHOPIFY_API_SECRET;
});

test("A valid webhook returns 200 and publishes the event", async () => {
    const webhooks: IWebhookConfig[] = [
        {
            address: "https://app.example.com/app/uninstalled",
            format: "json",
            snsTopicArn: "app-uninstalled-topic-arn",
            stateMachineArn: "app-uninstalled-step-function-arn",
            topic: "app/uninstalled",
        },
    ];

    const event: APIGatewayEvent = {
        body: JSON.stringify({ domain: "example.com" }),
        headers: {
            "X-Shopify-Hmac-Sha256": "ybRQeRpiVxlaSLj+9rQhn2MatBPoSRa29XyCHHkUqNY=",
            "X-Shopify-Shop-Domain": "example.myshopify.com",
            "X-Shopify-Topic": "app/uninstalled",
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: null,
            httpMethod: "POST",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: "127.0.0.1",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            stage: "test",
        },
        resource: "",
        stageVariables: null,
    };

    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });
    sns.publish = jest.fn().mockName("sns.publish").mockReturnValue({
        promise: () => new Promise<AWS.SNS.PublishResponse>((resolve) => resolve({
            MessageId: "1",
        })),
    });

    const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
    stepFunctions.startExecution = jest.fn().mockName("stepFunctions.startExecution").mockReturnValueOnce({
        promise: () => new Promise((resolve) => resolve({
            $response: {
                requestId: "request-id",
            },
        })),
    });

    const result = await handlerAsync(
        event,
        webhooks,
        sns,
        stepFunctions,
    );

    expect(result).toEqual({
        body: "",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 204,
    });
    expect(sns.publish).toBeCalledWith({
        // tslint:disable-next-line:max-line-length
        Message: "{\"data\":{\"domain\":\"example.com\"},\"event\":\"app/uninstalled\",\"shopDomain\":\"example.myshopify.com\"}",
        TopicArn: "app-uninstalled-topic-arn",
    });
    expect(stepFunctions.startExecution).toBeCalledWith({
        // tslint:disable-next-line:max-line-length
        input: "{\"data\":{\"domain\":\"example.com\"},\"event\":\"app/uninstalled\",\"shopDomain\":\"example.myshopify.com\"}",
        stateMachineArn: "app-uninstalled-step-function-arn",
    });
});

// This returns 204 as we are probably receiving a webhook that was previously configured and it's safe to ignore it.
test("A non configured X-Shopify-Topic returns 204", async () => {
    const webhooks: IWebhookConfig[] = [
        {
            address: "https://app.example.com/app/uninstalled",
            format: "json",
            snsTopicArn: "app-uninstalled-topic-arn",
            topic: "app/uninstalled",
        },
    ];

    const event: APIGatewayEvent = {
        body: JSON.stringify({ domain: "example.com" }),
        headers: {
            "X-Shopify-Hmac-Sha256": "ybRQeRpiVxlaSLj+9rQhn2MatBPoSRa29XyCHHkUqNY=",
            "X-Shopify-Shop-Domain": "example.myshopify.com",
            "X-Shopify-Topic": "shop/update",
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: null,
            httpMethod: "POST",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: "127.0.0.1",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            stage: "test",
        },
        resource: "",
        stageVariables: null,
    };

    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });
    sns.publish = jest.fn().mockName("sns.publish").mockReturnValue({
        promise: () => new Promise<AWS.SNS.PublishResponse>((resolve) => resolve({
            MessageId: "1",
        })),
    });

    const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
    stepFunctions.startExecution = jest.fn().mockName("stepFunctions.startExecution").mockReturnValueOnce({
        promise: () => new Promise((resolve) => resolve({
            $response: {
                requestId: "request-id",
            },
        })),
    });

    const result = await handlerAsync(
        event,
        webhooks,
        sns,
        stepFunctions,
    );

    expect(result).toEqual({
        body: "",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 204,
    });
    expect(sns.publish).not.toBeCalled();
    expect(stepFunctions.startExecution).not.toBeCalled();
});

test("A null body returns 400", async () => {
    const webhooks: IWebhookConfig[] = [];

    const event: APIGatewayEvent = {
        body: null,
        headers: {
            "X-Shopify-Hmac-Sha256": "ybRQeRpiVxlaSLj+9rQhn2MatBPoSRa29XyCHHkUqNY=",
            "X-Shopify-Shop-Domain": "example.myshopify.com",
            "X-Shopify-Topic": "app/uninstalled",
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: null,
            httpMethod: "POST",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: "127.0.0.1",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            stage: "test",
        },
        resource: "",
        stageVariables: null,
    };

    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });

    const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
    stepFunctions.startExecution = jest.fn().mockName("stepFunctions.startExecution").mockReturnValueOnce({
        promise: () => new Promise((resolve) => resolve({})),
    });

    const result = await handlerAsync(
        event,
        webhooks,
        sns,
        stepFunctions,
    );

    expect(result).toEqual({
        body: JSON.stringify({ error: 400, message: "Body was null" }),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 400,
    });
    expect(stepFunctions.startExecution).not.toBeCalled();
});

test("Invalid HMAC header returns 400", async () => {
    const webhooks: IWebhookConfig[] = [];

    const event: APIGatewayEvent = {
        body: JSON.stringify({ domain: "example.com" }),
        headers: {
            "X-Shopify-Hmac-Sha256": "wrong-value",
            "X-Shopify-Shop-Domain": "example.myshopify.com",
            "X-Shopify-Topic": "app/uninstalled",
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: null,
            httpMethod: "POST",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: "127.0.0.1",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            stage: "test",
        },
        resource: "",
        stageVariables: null,
    };

    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });

    const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
    stepFunctions.startExecution = jest.fn().mockName("stepFunctions.startExecution").mockReturnValueOnce({
        promise: () => new Promise((resolve) => resolve({
            $response: {
                requestId: "request-id",
            },
        })),
    });

    const result = await handlerAsync(
        event,
        webhooks,
        sns,
        stepFunctions,
    );

    expect(result).toEqual({
        body: JSON.stringify({ error: 400, message: "X-Shopify-Hmac-Sha256 header validation failed" }),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 400,
    });
    expect(stepFunctions.startExecution).not.toBeCalled();
});

test("Missing HMAC header returns 400", async () => {
    const webhooks: IWebhookConfig[] = [];

    const event: APIGatewayEvent = {
        body: JSON.stringify({ domain: "example.com" }),
        headers: {
            "X-Shopify-Shop-Domain": "example.myshopify.com",
            "X-Shopify-Topic": "app/uninstalled",
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: null,
            httpMethod: "POST",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: "127.0.0.1",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            stage: "test",
        },
        resource: "",
        stageVariables: null,
    };

    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });

    const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
    stepFunctions.startExecution = jest.fn().mockName("stepFunctions.startExecution").mockReturnValueOnce({
        promise: () => new Promise((resolve) => resolve({
            $response: {
                requestId: "request-id",
            },
        })),
    });

    const result = await handlerAsync(
        event,
        webhooks,
        sns,
        stepFunctions,
    );

    expect(result).toEqual({
        body: JSON.stringify({ error: 400, message: "X-Shopify-Hmac-Sha256 header validation failed" }),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 400,
    });
    expect(stepFunctions.startExecution).not.toBeCalled();
});
