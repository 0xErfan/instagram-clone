const isUrlSegmentEqual = (url, str, index = 1) => url.split('/')?.[index] === str;

const notFoundRoute = (res, msg = undefined) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: msg ?? 'Route not found buddy.' }));
};

const getReqBody = async req => {

    return new Promise((res, rej) => {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try {
                res(JSON.parse(body))
            } catch (err) {
                rej(new Error('Invalid JSON'))
            }
        })

    })

}

export {
    isUrlSegmentEqual,
    notFoundRoute,
    getReqBody,
}