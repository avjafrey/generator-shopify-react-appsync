import { APIGatewayEvent } from "aws-lambda";
import { handlerAsync } from "../authBegin";

beforeAll(() => {
    process.env.JWT_ISS = "jwt-iss";
    process.env.JWT_SECRET = "jwt-secret";
    process.env.SHOPIFY_API_KEY = "shopify-api-key";
    process.env.SHOPIFY_SCOPE = "read_script_tags:write_script_tags";
});

afterAll(() => {
    delete process.env.JWT_ISS;
    delete process.env.JWT_SECRET;
    delete process.env.SHOPIFY_API_KEY;
    delete process.env.SHOPIFY_SCOPE;
});

test("A valid GET returns 200 and a valid object", async () => {
    const event: APIGatewayEvent = {
        body: null,
        headers: {},
        httpMethod: "GET",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: {
            "callback-url": "http://www.example.com/auth/shopify/callback",
            "per-user": "false",
            "shop": "example.myshopify.com",
        },
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

    const now = new Date(1525917850);
    const result = await handlerAsync(event, now, "randomString");

    expect(result).toEqual({
        // tslint:disable-next-line:max-line-length
        body: "{\"authUrl\":\"https://example.myshopify.com/admin/oauth/authorize?client_id=shopify-api-key&scope=read_script_tags%2Cwrite_script_tags&redirect_uri=http%3A%2F%2Fwww.example.com%2Fauth%2Fshopify%2Fcallback&state=randomString\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjY1MTcsImlhdCI6MTUyNTkxNywiaXNzIjoiand0LWlzcyIsImp0aSI6InJhbmRvbVN0cmluZyIsInN1YiI6ImV4YW1wbGUubXlzaG9waWZ5LmNvbSJ9.8e7_eu13Rx8atTvK1sejo1T7bC1R-NymofEsmQ6bwSY\"}",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 200,
    });
});
