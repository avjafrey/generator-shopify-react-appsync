export function parseQueryString(queryString: string): { [name: string]: string } {
    const result: { [name: string]: string } = {};

    const start = queryString.substring(0, 1) === "?" ? 1 : 0;
    const components = queryString.substring(start).split("&");
    for (const component of components) {
        const [key, val] = component.split("=");
        result[key] = decodeURIComponent(val);
    }

    return result;
}
