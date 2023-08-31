"use client";

import { Container } from "@mui/material";
import PusherJS from "pusher-js";
import { useEffect } from "react";

PusherJS.logToConsole = true;

const CHAT_MESSAGE_EVENT = "client-new-chat-message";

const SoketiTest = () => {
  useEffect(() => {
    // 1. Connect to PusherJS channel
    let client = new PusherJS("app_key", {
      cluster: "",
      wsHost: "127.0.0.1",
      wsPort: 8080,
      forceTLS: false,
      enableStats: false,
      enabledTransports: ["ws", "wss"],
    });

    // 3. Recieve messages when other clients have connected
    const channel = client.subscribe("chat-room");

    channel.bind(CHAT_MESSAGE_EVENT, (message: any) => {
      console.log(`${message.sender} says: ${message.content}`);
    });

    // 2. Send a message saying we've connected
    channel.bind("pusher:subscription_succeeded", () => {
      console.log("sending message");
      channel.trigger(
        CHAT_MESSAGE_EVENT,
        { sender: "asdf", content: "asdffdsa" }
        // "chat-room"
      );
    });
  });

  return <Container>Testing</Container>;
};

export default SoketiTest;
