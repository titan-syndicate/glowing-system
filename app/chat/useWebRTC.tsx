import { useState } from "react";

interface WebRTC {
  addIceCandidates: (candidate: string) => void;
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
  const [peerConnection] = useState(
    new RTCPeerConnection({
      iceServers: [
        {
          // More available at https://gist.github.com/zziuni/3741933
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    })
  );
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
    if (event.candidate !== null) {
      // TODO: Send candidate to remote peer via WebSockets
      setIceCandidates((prevCandidates) => [
        ...prevCandidates,
        JSON.stringify(event.candidate),
      ]);
      if (event.candidate?.candidate === "") {
        // Finished generating candidates
        // Not sure if there's anything we actually need to do here
      }
    }
  };

  peerConnection.onicegatheringstatechange = () => {
    switch (peerConnection.iceGatheringState) {
      case "new":
        break;
      case "gathering":
        break;
      case "complete": {
        // We've got all the ICE candidates; now we can update the UI and copy them all
      }
    }
  };

  const addIceCandidates = (iceCandidates: string) => {
    JSON.parse(iceCandidates).forEach((c: string) => {
      const candidate = new RTCIceCandidate(JSON.parse(c));
      peerConnection.addIceCandidate(candidate);
    });
  };
  // #endregion

  return {
    addIceCandidates,
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
