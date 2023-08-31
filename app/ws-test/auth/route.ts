import Pusher from "pusher";
import { PUSHER_CONFIG } from "../pusher-config";
import { NextRequest } from "next/server";

const { appId, host, port, appKey, secret } = PUSHER_CONFIG;

export async function POST(request: NextRequest) {
  const pusher = new Pusher({
    appId,
    key: appKey,
    secret,
    host,
    port: `${port}`,
  });

  const data = await request.json();

  // https://pusher.com/docs/channels/server_api/authorizing-users/#implementing-the-authorization-endpoint-for-a-private-channel
  const socketId = data.socket_id;
  const channel = data.channel_name;
  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel);

  return new Response(JSON.stringify(authResponse));
}
