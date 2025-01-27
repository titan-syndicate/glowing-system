"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import useWebRTC from "./useWebRTC";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Container,
  SxProps,
} from "@mui/material";
import { Instructions } from "./instructions";
import { ExpandMore } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const chatListStyle: SxProps = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const containerStyle: SxProps = {
  display: "flex",
  flexFlow: "column",
  gap: "16px",
  padding: "8px",
};

const WebRTCChat: React.FC = () => {
  const {
    addIceCandidates,
    chatLog,
    createSdpOffer,
    handleRemoteAnswer,
    handleRemoteOffer,
    dataChannelState,
    iceCandidates,
    sdpAnswer,
    sdpOffer,
    sendMessage,
  } = useWebRTC();
  const [message, setMessage] = useState<string>("");

  return (
    <Container sx={containerStyle}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" component="h1">
            Chat
          </Typography>
          <div>
            <List sx={chatListStyle}>
              {chatLog.map((msg, index) => (
                <>
                  <ListItem key={index}>
                    <ListItemText primary={msg} />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </div>
          <Input
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                sendMessage(message);
                setMessage("");
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => (sendMessage(message), setMessage(""))}
          >
            Send
          </Button>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" component="h1">
            SDP stuff
          </Typography>
          <Grid container spacing={2}>
            <Grid md={6}>
              <ButtonGroup orientation="vertical">
                <Button variant="outlined" onClick={createSdpOffer}>
                  Generate Offer
                </Button>
                <Button
                  variant="outlined"
                  onClick={async () => {
                    const clipboardValue = await navigator.clipboard.readText();
                    handleRemoteOffer(clipboardValue);
                  }}
                >
                  Handle remote offer from clipboard
                </Button>
                <Button
                  variant="outlined"
                  onClick={async () => {
                    const clipboardValue = await navigator.clipboard.readText();
                    handleRemoteAnswer(clipboardValue);
                  }}
                >
                  Handle remote answer from clipboard
                </Button>
                <div>
                  <Typography component="div">
                    {sdpOffer
                      ? "Offer available to use- copy and go to other tab"
                      : "Click generate offer"}
                  </Typography>
                  <Button
                    variant="outlined"
                    disabled={!sdpOffer}
                    onClick={() => navigator.clipboard.writeText(sdpOffer)}
                  >
                    Copy offer
                  </Button>
                </div>
                <div>
                  <Typography component="div">
                    {sdpAnswer
                      ? "Answer available to use- copy and go back to first tab"
                      : "Click handle offer after copying from other tab"}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigator.clipboard.writeText(sdpAnswer)}
                  >
                    Copy answer
                  </Button>
                </div>
              </ButtonGroup>
            </Grid>
            <Grid md={6}>
              <Instructions />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" component="h1">
            Ice stuff
          </Typography>
          <Button
            variant="outlined"
            onClick={async () => {
              const clipboardValue = await navigator.clipboard.readText();
              addIceCandidates(clipboardValue);
            }}
          >
            Add Ice Candidates from clipboard
          </Button>

          <div>
            <Typography component="div">
              {iceCandidates.length > 0
                ? "Ice Candidates available- copy and go to other tab"
                : "No ice candidates yet"}
            </Typography>
            <Button
              variant="outlined"
              disabled={iceCandidates.length === 0}
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(iceCandidates))
              }
            >
              Copy ice candidates
            </Button>
          </div>
        </CardContent>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          ICE candidates
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            {iceCandidates.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
          <pre>{sdpOffer}</pre>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

// Export dynamic() to avoid SSR (because RTCPeerConnection and friends don't exist server-side)
export default dynamic(() => Promise.resolve(WebRTCChat), { ssr: false });
