import { createServer } from "http";

const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify('gotta'));
});

server.listen(port, hostname, () => {
    console.log(`Server listening on port ${port}`);
});