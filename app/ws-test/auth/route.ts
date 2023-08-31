import Pusher from "pusher";
import { PUSHER_CONFIG } from "../pusher-config";
import { NextRequest, NextResponse } from "next/server";

const { appId, host, port, appKey, secret } = PUSHER_CONFIG;

export async function POST(request: NextRequest) {
  const pusher = new Pusher({
    appId,
    key: appKey,
    secret,
    host,
    port: `${port}`,
  });
  const data = await request.formData();

  // TODO: Error handling if `socket_id` or `channel_name` don't exist

  // https://pusher.com/docs/channels/server_api/authorizing-users/#implementing-the-authorization-endpoint-for-a-private-channel
  const socketId = data.get("socket_id") as string;
  const channel = data.get("channel_name") as string;
  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel);

  return NextResponse.json(authResponse);
}
