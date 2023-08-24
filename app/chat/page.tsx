'use client'
import { useState } from 'react';

const WebRTCChat: React.FC = () => {
  const [peerConnection] = useState(new RTCPeerConnection());
  const [dataChannel] = useState(peerConnection.createDataChannel('chat'));
  const [message, setMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  const [remoteOfferInputValue, setRemoteOfferInputValue] = useState('');  // Initial value is an empty string
  const [iceOfferInputValue, setIceOfferInputValue] = useState('');  // Initial value is an empty string
  const [remoteAnswerInputValue, setRemoteAnswerInputValue] = useState('');  // Initial value is an empty string

  const handleRemoteInputChange = (event) => {
    setRemoteOfferInputValue(event.target.value);
  }

  const handleIceInputChange = (event) => {
    setIceOfferInputValue(event.target.value);
  }

  const handleRemoteAnswerInputChange = (event) => {
    setRemoteAnswerInputValue(event.target.value);
  }

  // Handle the data channel events
  dataChannel.onopen = (event) => {
    console.log('Data channel is open and ready to be used.');
  };

  dataChannel.onmessage = (event) => {
    console.log('Received message:', event.data);
    setChatLog((prevLog) => [...prevLog, `Friend: ${event.data}`]);
  };

  peerConnection.ondatachannel = (event) => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = (event) => {
      console.log('Received message:', event.data);
      setChatLog((prevLog) => [...prevLog, `Friend: ${event.data}`]);
    };
  };

  const sendMessage = () => {
    dataChannel.send(message);
    setChatLog((prevLog) => [...prevLog, `You: ${message}`]);
    setMessage('');
  };

  // Additional code for SDP offer/answer and ICE candidates will go here.
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("New ICE candidate:", JSON.stringify(event.candidate));
    }
  };

  const addIceCandidate = () => {
    const candidate = new RTCIceCandidate(JSON.parse(iceOfferInputValue));
    peerConnection.addIceCandidate(candidate);
  }

  const createOffer = () => {
    peerConnection.createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        console.log("Offer:", JSON.stringify(peerConnection.localDescription));
      });
  }

  const handleRemoteOffer = () => {
    const remoteOffer = new RTCSessionDescription(JSON.parse(remoteOfferInputValue));
    peerConnection.setRemoteDescription(remoteOffer).then(() => {
      return peerConnection.createAnswer();
    }).then(answer => {
      return peerConnection.setLocalDescription(answer);
    }).then(() => {
      console.log("Answer:", JSON.stringify(peerConnection.localDescription));
    });
  }

  const handleRemoteAnswer = () => {
    const remoteAnswer = new RTCSessionDescription(JSON.parse(remoteAnswerInputValue));
    peerConnection.setRemoteDescription(remoteAnswer);
  }


  return (
    <>
      <div>
        <div>
          {chatLog.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <div>
        <button onClick={sendMessage}>Send</button>
        <button onClick={createOffer}>Generate Offer</button>
        </div>
      </div>
      <div>
        <label>Remote Offer</label>
        <input
          type="text"
          value={remoteOfferInputValue}
          onChange={handleRemoteInputChange}
        />
      <button onClick={handleRemoteOffer}>Handle remote offer</button>
      </div>
      <div>
        <label>Remote answer</label>
        <input
          type="text"
          value={remoteAnswerInputValue}
          onChange={handleRemoteAnswerInputChange}
        />
      <button onClick={handleRemoteAnswer}>Handle remote answer</button>
      </div>
      <div>
        <label>Ice Candidate</label>
        <input
          type="text"
          value={iceOfferInputValue}
          onChange={handleIceInputChange}
        />
      <button onClick={addIceCandidate}>Add Ice Candidate</button>
      </div>
    </>
  );
};

export default WebRTCChat;
