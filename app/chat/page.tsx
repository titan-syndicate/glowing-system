'use client'
import { useState } from 'react';
import Button from '@mui/material/Button';

import useWebRTC from './useWebRTC';

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
  // const [peerConnection] = useState(new RTCPeerConnection());
  // const [dataChannel] = useState(peerConnection.createDataChannel('chat'));
  const [message, setMessage] = useState<string>('');
  // const [chatLog, setChatLog] = useState<string[]>([]);

  // #region Input handlers
  // const [remoteOfferInputValue, setRemoteOfferInputValue] = useState('');  // Initial value is an empty string
  // const [iceCandidateInputValue, setIceCandidateInputValue] = useState('');  // Initial value is an empty string
  // const [remoteAnswerInputValue, setRemoteAnswerInputValue] = useState('');  // Initial value is an empty string

  // const handleRemoteInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRemoteOfferInputValue(event?.target?.value);
  // }

  // const handleIceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIceCandidateInputValue(event.target.value);
  // }

  // const handleRemoteAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRemoteAnswerInputValue(event.target.value);
  // }
  // #endregion

  return (
    <div className="flex-col space-y-4">
      <div className="flex space-x-4">
        <div>
          {chatLog.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="text-blue-400" onClick={() => sendMessage(message)}>Send</button>
      </div>
      <div>
        <button className="text-orange-400" onClick={createSdpOffer}>Generate Offer</button>
      </div>
      <div>
        {/* <label>Remote Offer</label> */}
        {/* <input
          type="text"
          value={remoteOfferInputValue}
          onChange={handleRemoteInputChange}
        /> */}
        <button className="text-green-500" onClick={async () => {
          // handleRemoteAnswer(remoteAnswerInputValue)
          const clipboardValue = await navigator.clipboard.readText()
          handleRemoteOffer(clipboardValue)
        }}>Handle remote offer from clipboard</button>
      </div>
      <div>
        {/* <label>Remote answer</label> */}
        {/* <input
          type="text"
          value={remoteAnswerInputValue}
          onChange={handleRemoteAnswerInputChange}
        /> */}
        <button className="text-green-500" onClick={async () => {
          // handleRemoteAnswer(remoteAnswerInputValue)
          const clipboardValue = await navigator.clipboard.readText()
          handleRemoteAnswer(clipboardValue)
        }}>Handle remote answer from clipboard</button>
      </div>
      <div>
        {/* <label>Ice Candidate</label> */}
        {/* <input
          type="text"
          value={iceCandidateInputValue}
          onChange={handleIceInputChange}
        /> */}
        <button className="text-green-500" onClick={async () => {
          // handleRemoteAnswer(remoteAnswerInputValue)
          const clipboardValue = await navigator.clipboard.readText()
          addIceCandidate(clipboardValue)
        }}>Add Ice Candidate from clipboard</button>
      </div>
      <div>
        <h2>{sdpOffer ? 'Offer available to use- copy and go to other tab' : 'Click generate offer'}</h2>
        <button disabled={!sdpOffer} className="text-green-500" onClick={() => navigator.clipboard.writeText(sdpOffer)}>Copy offer</button>
      </div>
      <div>
        <h2>{sdpAnswer ? 'Answer available to use- copy and go back to first tab' : 'Click handle offer after copying from other tab'}</h2>
        <button className="text-green-500" onClick={() => navigator.clipboard.writeText(sdpAnswer)}>Copy answer</button>
      </div>
      <div>
        <h2>{iceCandidates.length > 0 ? "Ice Candidate available- copy and go to other tab" : "No ice candidates yet"}</h2>
        <Button variant="outlined" disabled={iceCandidates.length === 0} onClick={() => navigator.clipboard.writeText(iceCandidates[0])}>Copy first ice candidate</Button>
      </div>
    </div>
  );
};

export default WebRTCChat;
