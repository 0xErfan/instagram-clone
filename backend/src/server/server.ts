import { IncomingMessage, ServerResponse } from "http";

const { createServer } = require('http');
const router = require('../../dist/server/router.js')

const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    router(req, res)
});

server.listen(port, hostname, () => {
    console.log(`Server listening on port ${port}`);
});