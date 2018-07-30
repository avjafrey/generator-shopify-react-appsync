import { parseQueryString } from "../query-string";

test("Single parametere with a leading ?", () => {
    const result = parseQueryString("?shop=example.myshopify.com");
    expect(result.shop).toBe("example.myshopify.com");
});

test("Multiple parameters with a leading ?", () => {
    const result = parseQueryString("?a=1&shop=example.myshopify.com&b=2");
    expect(result.a).toBe("1");
    expect(result.shop).toBe("example.myshopify.com");
    expect(result.b).toBe("2");
});

test("Single parametere without a leading ?", () => {
    const result = parseQueryString("shop=example.myshopify.com");
    expect(result.shop).toBe("example.myshopify.com");
});

test("Multiple parameters without a leading ?", () => {
    const result = parseQueryString("a=1&shop=example.myshopify.com&b=2");
    expect(result.a).toBe("1");
    expect(result.shop).toBe("example.myshopify.com");
    expect(result.b).toBe("2");
});
