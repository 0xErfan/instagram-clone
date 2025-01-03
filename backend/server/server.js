import { createServer } from "http";
import router from './router.js'

const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

const server = createServer((req, res) => {
    router(req, res)
});

server.listen(port, hostname, () => {
    console.log(`Server listening on port ${port}`);
});