import * as AWS from "aws-sdk";
import * as fetch from "jest-fetch-mock";

import { handlerAsync } from "../getShopSettings";
import { IStoredShopDataUpdate } from "../interfaces";

import * as GetShopSettingsQueryGQL from "../graphql/GetShopSettingsQuery.graphql";

beforeAll(() => {
    process.env.SHOPS_TABLE = "shops";
});

afterAll(() => {
    delete process.env.SHOPS_TABLE;
});

test("Happy path", async () => {
    const event: IStoredShopDataUpdate = {
        accessToken: "accessToken",
        country: "AU",
        email: "john@example.com",
        installedAt: "2018-01-01 00:00:00",
        name: "John's Example Store",
        planDisplayName: "Super Plan",
        planName: "plus",
        platform: "shopify",
        shopDomain: "example.myshopify.com",
        timezone: "Australia/NSW",
    };

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    dynamodb.update = jest.fn().mockName("dynamodb.update").mockReturnValueOnce({
        promise: () => new Promise<void>((resolve) => resolve()),
    });

    const shop = {
        data: {
            shop: {
                county_taxes: null,
                domain: "example.com",
                email: "owner@example.myshopify.com",
                name: "My Store",
                source: "partner",
                tax_shipping: null,
                taxes_included: null,
                timezone: "Australia/Sydney",
            },
        },
    };

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(shop));

    const result = await handlerAsync(
        event,
        dynamodb,
        // @ts-ignore
        fetch,
    );

    expect(result).toEqual(event);
    expect(fetch).toBeCalledWith(
        "https://example.myshopify.com/admin/api/graphql.json",
        {
            body: GetShopSettingsQueryGQL,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/graphql",
                "X-Shopify-Access-Token": "accessToken",
            },
            method: "POST",
        },
    );
    expect(dynamodb.update).toBeCalledWith({
        ExpressionAttributeNames: {
            "#P0": "accessToken",
            "#P1": "id",
            "#P2": "installedAt",
            "#P3": "platform",
        },
        ExpressionAttributeValues: {
            ":P0": "access_token",
            ":P1": "SHOPIFY_1",
            ":P2": "1970-01-18T15:51:57.740Z",
            ":P3": "SHOPIFY",
        },
        Key: {
            id: "SHOPIFY_1",
        },
        TableName: "shops",
        UpdateExpression: "SET #P0 = :P0, #P1 = :P1, #P2 = :P2, #P3 = :P3",
    });
});
