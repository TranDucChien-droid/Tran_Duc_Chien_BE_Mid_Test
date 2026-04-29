import crypto from "crypto";

export function generateApiKey(userId, email) {
    const randomString = crypto.randomUUID();

    const apiKey = `mern-$${userId}$-$${email}$-$${randomString}$`;

    return {
        apiKey,
        randomString,
    };
}

export function parseApiKey(apiKey) {
    const regex = /^mern-\$(.+?)\$\-\$(.+?)\$\-\$(.+?)\$$/;

    const match = apiKey.match(regex);

    if (!match) return null;

    const [, userId, email, randomString] = match;

    return { userId, email, randomString };
}
