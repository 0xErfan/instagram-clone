import { IncomingMessage, ServerResponse } from "http";
const connectToDB = require('../configs/db')
const { createServer } = require('http');
const router = require('../server/router')

const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {

  const origin = 'http://localhost:5173';

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  await connectToDB();
  router(req, res);

});

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});
