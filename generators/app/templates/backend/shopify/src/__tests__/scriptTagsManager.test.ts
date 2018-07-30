import * as fetch from "jest-fetch-mock";

import { IStoredShopDataCreate } from "../interfaces";
import { ICreateScriptTag } from "../lib/shopify";
import { handlerAsync } from "../scriptTagsManager";

beforeAll(() => {
    process.env.SHOPS_TABLE = "shops";
});

afterAll(() => {
    delete process.env.SHOPS_TABLE;
});

test("Adds new script tags", async () => {
    const event: IStoredShopDataCreate = {
        accessToken: "accessToken",
        country: "AU",
        domain: "mystore.example.com",
        email: "john@example.com",
        id: "example.myshopify.com",
        installedAt: "2018-01-01T00:00:00Z",
        name: "John's Example Store",
        platform: "SHOPIFY",
        platformPlan: "plus",
        timezone: "Australia/NSW",
        userId: "CognitoUser",
    };

    const scriptTags: ICreateScriptTag[] = [
        {
            display_scope: "all",
            event: "onload",
            src: "https://example.com/1",
        },
        {
            display_scope: "all",
            event: "onload",
            src: "https://example.com/2",
        },
    ];

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({
        script_tags: [
            {
                created_at: "created_at",
                display_scope: "all",
                event: "onload",
                id: 1,
                src: "https://example.com/1",
                updated_at: "updated_at",
            },
        ],
    }));
    fetch.mockResponseOnce(JSON.stringify({
        script_tag: {
            created_at: "created_at",
            display_scope: "all",
            event: "onload",
            id: 2,
            src: "https://example.com/2",
            updated_at: "updated_at",
        },
    }));
    const result = await handlerAsync(
        event,
        scriptTags,
        // @ts-ignore
        fetch,
    );

    expect(result).toEqual(event);
    // @ts-ignore
    expect(fetch.mock.calls.length).toBe(2);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toEqual("https://example.myshopify.com/admin/script_tags.json");
    // @ts-ignore
    expect(fetch.mock.calls[0][1]).toEqual({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "GET",
    });
    // @ts-ignore
    expect(fetch.mock.calls[1][0]).toEqual("https://example.myshopify.com/admin/script_tags.json");
    // @ts-ignore
    expect(fetch.mock.calls[1][1]).toEqual({
        // tslint:disable-next-line:max-line-length
        body: "{\"script_tag\":{\"display_scope\":\"all\",\"event\":\"onload\",\"src\":\"https://example.com/2\"}}",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "POST",
    });
});

test("Deletes old script tags", async () => {
    const event: IStoredShopDataCreate = {
        accessToken: "accessToken",
        country: "AU",
        domain: "mystore.example.com",
        email: "john@example.com",
        id: "example.myshopify.com",
        installedAt: "2018-01-01T00:00:00Z",
        name: "John's Example Store",
        platform: "SHOPIFY",
        platformPlan: "plus",
        timezone: "Australia/NSW",
        userId: "CognitoUser",
    };

    const scriptTags: ICreateScriptTag[] = [
        {
            display_scope: "all",
            event: "onload",
            src: "https://example.com/1",
        },
    ];

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({
        script_tags: [
            {
                created_at: "created_at",
                display_scope: "all",
                event: "onload",
                id: 1,
                src: "https://example.com/1",
                updated_at: "updated_at",
            },
            {
                created_at: "created_at",
                display_scope: "all",
                event: "onload",
                id: 2,
                src: "https://example.com/2",
                updated_at: "updated_at",
            },
        ],
    }));
    fetch.mockResponseOnce(JSON.stringify({}));

    const result = await handlerAsync(
        event,
        scriptTags,
        // @ts-ignore
        fetch,
    );

    expect(result).toEqual(event);
    // @ts-ignore
    expect(fetch.mock.calls.length).toBe(2);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toEqual("https://example.myshopify.com/admin/script_tags.json");
    // @ts-ignore
    expect(fetch.mock.calls[0][1]).toEqual({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "GET",
    });
    // @ts-ignore
    expect(fetch.mock.calls[1][0]).toEqual("https://example.myshopify.com/admin/script_tags/2.json");
    // @ts-ignore
    expect(fetch.mock.calls[1][1]).toEqual({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "DELETE",
    });
});

test("Updates existing script tags", async () => {
    const event: IStoredShopDataCreate = {
        accessToken: "accessToken",
        country: "AU",
        domain: "mystore.example.com",
        email: "john@example.com",
        id: "example.myshopify.com",
        installedAt: "2018-01-01T00:00:00Z",
        name: "John's Example Store",
        platform: "SHOPIFY",
        platformPlan: "plus",
        timezone: "Australia/NSW",
        userId: "CognitoUser",
    };

    const scriptTags: ICreateScriptTag[] = [
        {
            display_scope: "online_store",
            event: "onload",
            src: "https://example.com/1",
        },
    ];

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({
        script_tags: [
            {
                created_at: "created_at",
                display_scope: "all",
                event: "onload",
                id: 1,
                src: "https://example.com/1",
                updated_at: "updated_at",
            },
        ],
    }));
    fetch.mockResponseOnce(JSON.stringify({
        script_tag: {
            created_at: "created_at",
            display_scope: "all",
            event: "onload",
            id: 1,
            src: "https://example.com/1",
            updated_at: "updated_at",
        },
    }));
    const result = await handlerAsync(
        event,
        scriptTags,
        // @ts-ignore
        fetch,
    );

    expect(result).toEqual(event);
    // @ts-ignore
    expect(fetch.mock.calls.length).toBe(2);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toEqual("https://example.myshopify.com/admin/script_tags.json");
    // @ts-ignore
    expect(fetch.mock.calls[0][1]).toEqual({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "GET",
    });
    // @ts-ignore
    expect(fetch.mock.calls[1][0]).toEqual("https://example.myshopify.com/admin/script_tags/1.json");
    // @ts-ignore
    expect(fetch.mock.calls[1][1]).toEqual({
        // tslint:disable-next-line:max-line-length
        body: "{\"script_tag\":{\"created_at\":\"created_at\",\"display_scope\":\"all\",\"event\":\"onload\",\"id\":1,\"src\":\"https://example.com/1\",\"updated_at\":\"updated_at\"}}",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "accessToken",
        },
        method: "PUT",
    });
});
