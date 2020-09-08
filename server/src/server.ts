import express from 'express';
import http from 'http';
import https from 'https';
import path from "path";
import * as WebSocket from "ws";

import { SocketMessage } from '@shared/SocketMessage';

// Create a new express app instance
const app: express.Application = express();

// This will serve the GUI frontend in production
app.use(express.static(path.join(__dirname, "../../react", "dist")));

// Start Express server on port 8080 or the env.PORT
// To set the env.PORT: ex. "PORT=4242 node server.js"
const httpPort = process.env.PORT || 80;
const serverHttp = http.createServer(app).listen(httpPort, () => {
  console.log(`App is listening on port ${httpPort}!`);
});

const httpsPort = 443;
const serverHttps = https.createServer({}, app).listen(httpsPort, () => {
  console.log(`App is listening on port ${httpsPort}!`);
})

// Create the websocket interface
// The parameter "server" is from above when app.listen is called. 
// app.listen returns an HTTP/HTTPS server instance
const socket = new WebSocket.Server({ server: serverHttp });
socket.on("connection", (ws: WebSocket) => {
  console.log('New Connection!');
  const helloMessage = {message: "Hello from Node!"} as SocketMessage;
  ws.send(JSON.stringify(helloMessage));
  ws.on('message', (data: WebSocket.Data) => {
    const msg = JSON.parse(data.toString()) as SocketMessage;
    console.log(msg); 
  })
});

