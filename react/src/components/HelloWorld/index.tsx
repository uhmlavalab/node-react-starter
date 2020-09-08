import React from "react";
import Logo from "../../../public/lavalogo.png";

import { SocketMessage } from "@shared/SocketMessage";

const HelloWorld: React.FC = () => {
  // Get the address of the server
  const hostname = window.location.hostname;

  // Get the port of the server
  let port = "80";
  if (window.location.port !== "") {
    port = window.location.port;
  } else if (window.location.protocol.indexOf("s") !== -1) {
    port = "443";
  }

  // Create a websocket connection and send a message.
  const socketAddress = `ws://${hostname}:${port}`;
  const socket = new WebSocket(socketAddress);
  socket.onopen = (e) => {
    console.log("Connected To Server!");
    const helloMessage = { message: "Hello from React!" } as SocketMessage;
    socket.send(JSON.stringify(helloMessage));
    socket.onmessage = (message) => {
      const msg = JSON.parse(message.data) as SocketMessage;
      console.log(msg);
    };
  };
  return (
    <>
      <h1 style={{ margin: "0" }}>
        Node React Starter
        <img src={Logo} style={{ height: "37px", float: "right" }}></img>
      </h1>

      <hr />

      <h3>Environmental bb variablesss:</h3>
      <p>
        process.env.PRODUCTION: <b>{process.env.PRODUCTION.toString()}</b>
      </p>
      <p>
        process.env.NAME: <b>{process.env.NAME}</b>
      </p>
      <p>
        process.env.VERSION: <b>{process.env.VERSION}</b>
      </p>
    </>
  );
};

export default HelloWorld;
