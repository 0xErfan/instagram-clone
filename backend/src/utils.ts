const { IncomingMessage, ServerResponse } = require("http")

const isUrlSegmentEqual = (url: string, str: string, index = 1) => url.split('/')?.[index] === str;

const notFoundRoute = (res: typeof ServerResponse, msg = undefined) => {
    sendResponse(res, 404, msg ?? 'Route not found buddy.')
};

const getReqBody = async (req: typeof IncomingMessage) => {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', (chunk: string | number) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body)
                resolve(parsedBody)
            } catch (err) {
                reject(new Error(`Invalid JSON, ${err}`))
            }
        })

    })

}

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
        set: (tokenName: string, tokenValue: string, httpOnly = true, expiration: number, path = '/') => {
            res.writeHead(status, {
                'Set-Cookie': `${tokenName}=${JSON.stringify(tokenValue)};${httpOnly && 'httpOnly;'}Max-Age=${expiration};Path=${path}`
            })
        },
        get: (cookie: string, cookieName: string) => {
            const cookieTarget = cookie.toString().split(';').find(cc => {
                return cc.split('=')[0] == cookieName
            })
            return cookieTarget;
        },
        delete: (name: string) => {
            res.writeHead(200, {
                'Set-Cookie': `${name}=; HttpOnly; Max-Age=0; Path=/`
            });
        }
    }
}

export {
    isUrlSegmentEqual,
    notFoundRoute,
    getReqBody,
    sendResponse,
    isAllKeysFilled,
    useCookie,
}