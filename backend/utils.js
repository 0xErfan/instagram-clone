const isUrlSegmentEqual = (url, str, index = 1) => url.split('/')?.[index] === str;

const notFoundRoute = (res, msg = undefined) => {
    sendResponse(res, 404, msg ?? 'Route not found buddy.')
};

const getReqBody = async req => {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', chunk => {
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

const sendResponse = (res, statusCode, data) => {

    let responseBody;

    if (typeof data === 'object') {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        responseBody = JSON.stringify(data);
    } else {
        res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
        responseBody = data;
    }

    res.end(responseBody);
};

export {
    isUrlSegmentEqual,
    notFoundRoute,
    getReqBody,
    sendResponse,
}