"use client";

import { Container } from "@mui/material";
import PusherJS from "pusher-js";
import { useEffect } from "react";

PusherJS.logToConsole = true;

const SoketiTest = () => {
  useEffect(() => {
    // 1. Connect to PusherJS channel
    let client = new PusherJS("app-key", {
      cluster: "",
      wsHost: "127.0.0.1",
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });

    // 3. Recieve messages when other clients have connected
    client.subscribe("chat-room").bind("message", (message: any) => {
      console.log(`${message.sender} says: ${message.content}`);
    });

    // 2. Send a message saying we've connected
    console.log("sending message");
    client.send_event(
      "chat-message",
      { sender: "asdf", content: "asdffdsa" }
      // "chat-room"
    );
  });

  return <Container>Testing</Container>;
};

export default SoketiTest;
