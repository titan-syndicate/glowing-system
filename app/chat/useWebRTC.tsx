import { useState } from "react";

interface WebRTC {
  addIceCandidate: (candidate: string) => void;
  chatLog: string[];
  /**
   * Call this first and provide sdpOffer to the other peer.
   */
  createSdpOffer: () => void;
  handleRemoteAnswer: (answer: string) => void;
  handleRemoteOffer: (offer: string) => void;
  dataChannelState: string;
  iceCandidates: string[];
  sdpAnswer: string;
  /**
   * Generate with createSdpOffer and send to other peer.
   */
  sdpOffer: string;
  sendMessage: (message: string) => void;
}

export default function useWebRTC(): WebRTC {
  const [peerConnection] = useState(new RTCPeerConnection());
  const [dataChannel] = useState(peerConnection.createDataChannel("chat"));
  const [dataChannelState, setDataChannelState] = useState<string>(
    dataChannel.readyState
  );
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [iceCandidates, setIceCandidates] = useState<string[]>([]);
  const [sdpOffer, setSdpOffer] = useState<string>("");
  const [sdpAnswer, setSdpAnswer] = useState<string>("");

  // #region SDP Offer/Answer
  const createSdpOffer = () => {
    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        setSdpOffer(JSON.stringify(peerConnection.localDescription));
      });
  };

  const handleRemoteOffer = (offer: string) => {
    const remoteOffer = new RTCSessionDescription(JSON.parse(offer));
    peerConnection
      .setRemoteDescription(remoteOffer)
      .then(() => {
        return peerConnection.createAnswer();
      })
      .then((answer) => {
        return peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        setSdpAnswer(JSON.stringify(peerConnection.localDescription));
      });
  };

  const handleRemoteAnswer = (answer: string) => {
    const remoteAnswer = new RTCSessionDescription(JSON.parse(answer));
    peerConnection.setRemoteDescription(remoteAnswer);
  };
  // #endregion

  // #region Messaging
  dataChannel.onopen = (event) => {
    setDataChannelState(dataChannel.readyState);
  };

  dataChannel.onmessage = (event) => {
    setChatLog((prevLog) => [...prevLog, `Friend: ${event.data}`]);
  };

  peerConnection.ondatachannel = (event) => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = (event) => {
      setChatLog((prevLog) => [...prevLog, `Friend: ${event.data}`]);
    };
  };

  const sendMessage = (message: string) => {
    dataChannel.send(message);
    setChatLog((prevLog) => [...prevLog, `You: ${message}`]);
  };
  // #endregion

  // #region Ice Candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      setIceCandidates((prevCandidates) => [
        ...prevCandidates,
        JSON.stringify(event.candidate),
      ]);
    }
  };

  const addIceCandidate = (iceCandidate: string) => {
    const candidate = new RTCIceCandidate(JSON.parse(iceCandidate));
    peerConnection.addIceCandidate(candidate);
  };
  // #endregion

  return {
    addIceCandidate,
    chatLog,
    createSdpOffer,
    dataChannelState,
    handleRemoteAnswer,
    handleRemoteOffer,
    iceCandidates,
    sendMessage,
    sdpAnswer,
    sdpOffer,
  };
}
