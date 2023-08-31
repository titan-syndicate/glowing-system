"use client";

import { Button, Container } from "@mui/material";
import PusherJS, { Channel } from "pusher-js";
import { useCallback, useEffect, useState } from "react";
import { PUSHER_CONFIG } from "./pusher-config";

PusherJS.logToConsole = true;

const CHAT_MESSAGE_EVENT = "client-new-chat-message";
const CHANNEL_NAME = "private-chat-room";

const SoketiTest = () => {
  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    // 1. Connect to PusherJS channel
    let client = new PusherJS(PUSHER_CONFIG.appKey, {
      cluster: "",
      wsHost: PUSHER_CONFIG.host,
      wsPort: PUSHER_CONFIG.port,
      forceTLS: false,
      enableStats: false,
      enabledTransports: ["ws", "wss"],
    });

    // 3. Recieve messages when other clients have connected
    const channel = client.subscribe(CHANNEL_NAME);

    channel.bind(CHAT_MESSAGE_EVENT, (message: any) => {
      console.log(`${message.sender} says: ${message.content}`);
    });

    // 2. Send a message saying we've connected
    channel.bind("pusher:subscription_succeeded", () => {
      console.log("sending message");
      channel.trigger(CHAT_MESSAGE_EVENT, {
        sender: "asdf",
        content: "asdffdsa",
      });
    });

    setChannel(channel);
  }, []);

  const sendMessageCb = useCallback(
    () =>
      channel?.trigger(CHAT_MESSAGE_EVENT, {
        sender: "asdf",
        content: "button clicked; message sent",
      }),
    [channel]
  );

  return (
    <Container>
      <Button variant="contained" onClick={sendMessageCb}>
        Send message
      </Button>
    </Container>
  );
};

export default SoketiTest;
