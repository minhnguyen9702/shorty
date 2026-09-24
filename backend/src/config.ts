function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not set`);
    }
    return value;
}

function parseBaseUrl(value: string): string {
    if (!URL.canParse(value)) {
        throw new Error(`BASE_URL is not a valid URL: ${value}`);
    }
    return value.replace(/\/+$/, "");
}

export const databaseUrl = required("DATABASE_URL");
export const baseUrl = parseBaseUrl(required("BASE_URL"));
export const port = Number(process.env.PORT ?? 3000);
