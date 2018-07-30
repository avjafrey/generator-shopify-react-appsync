import { ProxyResult } from "aws-lambda";

export function badRequest(message: string): ProxyResult {
    return {
        body: JSON.stringify({
            error: 400,
            message,
        }),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 400,
    };
}

export function internalError(): ProxyResult {
    return {
        body: JSON.stringify({
            error: 500,
            message: "Internal Error",
        }),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 500,
    };
}

export function noContent(): ProxyResult {
    return {
        body: "",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 204,
    };
}

export function ok(body: any): ProxyResult {
    return {
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        },
        statusCode: 200,
    };
}
