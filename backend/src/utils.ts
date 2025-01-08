const { IncomingMessage, ServerResponse } = require("http")
const { hash, compare } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')

const isUrlSegmentEqual = (url: string, str: string, index = 1) => url.split('/')?.[index] === str;

const notFoundRoute = (res: typeof ServerResponse, msg = undefined) => {
    sendResponse(res, 404, msg ?? 'Route not found buddy.')
};

const getReqBody = async (req: typeof IncomingMessage) => {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', (chunk: unknown) => {
            if (Buffer.isBuffer(chunk)) {
                body += chunk.toString();
            } else if (typeof chunk === 'string') {
                body += chunk;
            } else {
                reject(new Error(`Unexpected chunk type: ${typeof chunk}`));
            }
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch (err: any) {
                reject(new Error(`Invalid JSON: ${err?.message}`));
            }
        });

        req.on('error', (err: any) => {
            reject(new Error(`Request error: ${err?.message!}`));
        });

    });

};

const sendResponse = (res: typeof ServerResponse, statusCode: number, data: object | string) => {

    let responseBody: unknown;

    if (typeof data === 'object') {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        responseBody = JSON.stringify(data);
    } else {
        res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
        responseBody = data;
    }

    res.end(responseBody);
};

const isAllKeysFilled = (obj: object): boolean => {

    if (obj == null || typeof obj !== 'object') return true;

    return Object.values(obj).every((val) => {
        if (val !== null && typeof val === 'object') {
            return isAllKeysFilled(val);
        } else {
            return val !== null && val.toString().trim().length > 0;
        }
    });

};

const useCookie = (res: typeof ServerResponse, status = 200) => {
    return {
        set: (tokenName: string, tokenValue: string, httpOnly = true, expiration = Number(process.env.tokenExpirationTime), path = '/') => {
            res.writeHead(status, {
                'Set-Cookie': `${tokenName}=${JSON.stringify(tokenValue)};${httpOnly && 'httpOnly;'}Max-Age=${expiration};Path=${path}`
            })
        },
        get: (cookie: string, cookieName: string) => {
            const cookieTarget = cookie.toString().split(';').find(cc => {
                return cc.split('=')[0] == cookieName
            })
            return cookieTarget?.split('=')[1];
        },
        remove: (name: string) => {
            res.writeHead(200, {
                'Set-Cookie': `${name}=; HttpOnly; Max-Age=0; Path=/`
            });
        }
    }
}

const hashPassword = async (pass: string | number) => {
    let hashedPass = await hash(pass, 12)
    return hashedPass;
}

const comparePassword = async (password: string | number, hash: string) => {
    let compareResult = await compare(password, hash)
    return compareResult;
}

const encryptToken = async (data: unknown, expiresIn = '7h'): Promise<string> => {

    const secretKey = process.env?.secretKey
    const encryptedToken = await sign(data, secretKey, { expiresIn });

    return encryptedToken;
}

const decryptToken = async (token: string) => {

    let decryptedToken;

    try {
        const secretKey = process.env?.secretKey
        decryptedToken = await verify(token, secretKey);
    } catch (error) {
        throw new Error(error as string)
    }

    return decryptedToken;

}

export {
    isUrlSegmentEqual,
    notFoundRoute,
    getReqBody,
    sendResponse,
    isAllKeysFilled,
    useCookie,
    encryptToken,
    decryptToken,
    comparePassword,
    hashPassword,

}