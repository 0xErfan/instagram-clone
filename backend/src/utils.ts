const { IncomingMessage, ServerResponse } = require("http")
const { hash, compare } = require('bcrypt')
const url = require('url')

type CheckerFunction = (
    req: typeof IncomingMessage,
    res: typeof ServerResponse
) => Promise<boolean>;

type HandlerFunction = (
    req: typeof IncomingMessage,
    res: typeof ServerResponse
) => void;

const middleware = async (
    req: typeof IncomingMessage,
    res: typeof ServerResponse,
    checkerFn: CheckerFunction,
    next: HandlerFunction
): Promise<void> => {

    try {
        const isAllowed = await checkerFn(req, res);

        if (isAllowed) {
            next(req, res);
        } else {
            if (!res.writableEnded) {
                sendResponse(res, 403, { message: 'Access Denied' })
            }
        }
    } catch (error) {
        console.error('Middleware Error:', error);
        // just making sure an error response got sended.
        if (!res.writableEnded) {
            sendResponse(res, 500, { message: 'Internal Server Error' })
        }
    }

};

const isUrlSegmentEqual = (url: string, str: string, index = 1) => url.split('/')?.[index] === str;

const extractValueFromSegment = (url: string, index = 1) => url.split('/')?.[index]

const notFoundRoute = (res: typeof ServerResponse, msg = undefined) => {
    sendResponse(res, 404, { message: msg || 'Route not found buddy.'})
};

const getReqBody = async (req: typeof IncomingMessage): Promise<unknown> => {

    return new Promise(resolve => {

        let body = '';

        req.on('data', (chunk: unknown) => {
            if (Buffer.isBuffer(chunk)) {
                body += chunk?.toString();
            } else if (typeof chunk === 'string') {
                body += chunk;
            } else if (chunk instanceof Uint8Array) {
                body += Buffer.from(chunk)?.toString();
            } else {
                console.log(`Unexpected chunk type: ${typeof chunk}`);
                resolve({})
            }
        });

        req.on('end', () => {
            if (body) { // Only parse if body is not empty
                try {
                    const parsedBody = JSON.parse(body);
                    resolve(parsedBody);
                } catch (err: any) {
                    resolve({})
                }
            } else resolve({})
        });

        req.on('error', (err: any) => {
            console.log(`error while getting req body: ${err}`)
            resolve({})
        });

    });

};

const getQueryParams = (req: typeof IncomingMessage) => {
    const parsedUrl = url.parse(req.url!, true); // true to parse query as an object
    return parsedUrl.query;
}

const sendResponse = (
    res: typeof ServerResponse,
    statusCode: number,
    data: object = { message: '', data: null, errors: [], success: true }
) => {

    let responseBody: unknown;

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    responseBody = JSON.stringify(data);

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
            const newToken = `${tokenName}=${JSON.stringify(tokenValue)};${httpOnly && 'httpOnly;'}Max-Age=${expiration};Path=${path}`
            res.writeHead(status, {
                'Set-Cookie': newToken,
            })
            return newToken.replace('httpOnly;', '')
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

export {
    isUrlSegmentEqual,
    notFoundRoute,
    getReqBody,
    sendResponse,
    isAllKeysFilled,
    useCookie,
    comparePassword,
    hashPassword,
    middleware,
    getQueryParams,
    extractValueFromSegment
}
