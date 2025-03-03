import { IncomingMessage, ServerResponse } from "http";
const connectToDB = require('../configs/db')
const { createServer } = require('http');
const router = require('../server/router')

const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  await connectToDB()
  router(req, res)

});

server.listen(port, hostname, () => {
  console.log(`Server listening on port ${port}`);
});
