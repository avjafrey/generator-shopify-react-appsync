import { SNSEvent } from "aws-lambda";
import * as AWS from "aws-sdk";
import { handlerAsync } from "../shopUpdate";

beforeAll(() => {
    process.env.SHOPS_TABLE = "shops";
});

afterAll(() => {
    delete process.env.SHOPS_TABLE;
});

test("Happy path", async () => {
    const event: SNSEvent = {
        Records: [{
            EventSource: "",
            EventSubscriptionArn: "",
            EventVersion: "",
            Sns: {
                Message: JSON.stringify({
                    accessToken: "accessToken",
                    data: {
                        address1: "",
                        address2: "",
                        city: "",
                        country: "Australia",
                        country_code: "",
                        country_name: "",
                        county_taxes: "",
                        created_at: "",
                        currency: "",
                        customer_email: null,
                        domain: "mystore.example.com",
                        eligible_for_card_reader_giveaway: false,
                        eligible_for_payments: false,
                        email: "john@example.com",
                        finances: false,
                        force_ssl: true,
                        google_apps_domain: null,
                        google_apps_login_enabled: null,
                        has_discounts: false,
                        has_gift_cards: false,
                        has_storefront: false,
                        iana_timezone: "Australia/NSW",
                        id: 1,
                        latitude: 1,
                        longitude: 1,
                        money_format: "",
                        money_in_emails_format: "",
                        money_with_currency_format: "",
                        money_with_currency_in_emails_format: "",
                        myshopify_domain: "example.myshopify.com",
                        name: "Test Store",
                        password_enabled: false,
                        phone: null,
                        plan_display_name: "",
                        plan_name: "partner",
                        primary_locale: "",
                        primary_location_id: 1,
                        province: "",
                        province_code: "",
                        requires_extra_payments_agreement: false,
                        setup_required: false,
                        shop_owner: "",
                        source: null,
                        tax_shipping: null,
                        taxes_included: null,
                        timezone: "",
                        updated_at: "",
                        weight_unit: "",
                        zip: "",
                    },
                    event: "shop/update",
                    shopDomain: "example.myshopify.com",
                }),
                MessageAttributes: {},
                MessageId: "",
                Signature: "",
                SignatureVersion: "",
                SigningCertUrl: "",
                Subject: "",
                Timestamp: "",
                TopicArn: "",
                Type: "",
                UnsubscribeUrl: "",
            },
        }],
    };

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    dynamodb.update = jest.fn().mockName("dynamodb.update").mockReturnValueOnce({
        promise: () => new Promise<void>((resolve) => resolve()),
    });

    const result = await handlerAsync(
        event,
        dynamodb,
    );

    expect(result).toBeTruthy();
    expect(dynamodb.update).toBeCalledWith({
        ExpressionAttributeNames: {
            "#P0": "country",
            "#P1": "domain",
            "#P2": "email",
            "#P3": "name",
            "#P4": "platform",
            "#P5": "platformPlan",
            "#P6": "timezone",
        },
        ExpressionAttributeValues: {
            ":P0": "Australia",
            ":P1": "mystore.example.com",
            ":P2": "john@example.com",
            ":P3": "Test Store",
            ":P4": "SHOPIFY",
            ":P5": "partner",
            ":P6": "Australia/NSW",
        },
        Key: {
            id: "example.myshopify.com",
        },
        TableName: "shops",
        UpdateExpression: "SET #P0 = :P0, #P1 = :P1, #P2 = :P2, #P3 = :P3, #P4 = :P4, #P5 = :P5, #P6 = :P6",
    });
});
