'use client'
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import useWebRTC from './useWebRTC';

const chatListStyle = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const WebRTCChat: React.FC = () => {
  const {
    addIceCandidate,
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
  const [message, setMessage] = useState<string>('');

  return (
    <div className="flex-col space-y-4">
      <div className="flex space-x-4">
        <div>
          <List sx={chatListStyle}>
            {chatLog.map((msg, index) => (
              <>
                <ListItem key={index} >
                  <ListItemText primary={msg} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </div>
        <Input
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              sendMessage(message);
              setMessage('');
            }
          }}
          value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" onClick={() => (sendMessage(message), setMessage(''))}>Send</Button>
      </div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" component="div">
            SDP stuff
          </Typography>
          <ButtonGroup orientation="vertical">
            <Button variant="outlined" onClick={createSdpOffer}>Generate Offer</Button>
            <Button variant="outlined" onClick={async () => {
              const clipboardValue = await navigator.clipboard.readText()
              handleRemoteOffer(clipboardValue)
            }}>Handle remote offer from clipboard</Button>
            <Button variant="outlined" onClick={async () => {
              const clipboardValue = await navigator.clipboard.readText()
              handleRemoteAnswer(clipboardValue)
            }}>Handle remote answer from clipboard</Button>
            <div>
              <Typography component="div">{sdpOffer ? 'Offer available to use- copy and go to other tab' : 'Click generate offer'}</Typography>
              <Button variant="outlined" disabled={!sdpOffer} onClick={() => navigator.clipboard.writeText(sdpOffer)}>Copy offer</Button>
            </div>
            <div>
              <Typography component="div">{sdpAnswer ? 'Answer available to use- copy and go back to first tab' : 'Click handle offer after copying from other tab'}</Typography>
              <Button variant="outlined" onClick={() => navigator.clipboard.writeText(sdpAnswer)}>Copy answer</Button>
            </div>
          </ButtonGroup>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" component="div">
            Ice stuff
          </Typography>
          <Button variant="outlined" onClick={async () => {
            const clipboardValue = await navigator.clipboard.readText()
            addIceCandidate(clipboardValue)
          }}>Add Ice Candidate from clipboard</Button>

          <div>
            <Typography component="div">{iceCandidates.length > 0 ? "Ice Candidate available- copy and go to other tab" : "No ice candidates yet"}</Typography>
            <Button variant="outlined" disabled={iceCandidates.length === 0} onClick={() => navigator.clipboard.writeText(iceCandidates[0])}>Copy first ice candidate</Button>
          </div>
        </CardContent>
      </Card>

    </div >
  );
};

export default WebRTCChat;
