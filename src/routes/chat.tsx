import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Peer from "peerjs";
import { useRef } from "react";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

// 2. Simpel komponent
function ChatPage() {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [remotePeerId, setRemotePeerId] = useState("");
  const peerRef = useRef<Peer | null>(null);
  const [cameraOn, setCameraOn] = useState(true); // til at sætte kamera til og fra
  const [micOn, setMicOn] = useState(true); // til at sætte mikrofon til og fra
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // laver opkald
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      console.log("Peer ID:", id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      window.navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localStreamRef.current = stream; // <-- Tilføjet denne linje
          const localVideo = document.getElementById(
            "local-video",
          ) as HTMLVideoElement;
          if (localVideo) localVideo.srcObject = stream;

          call.answer(stream);

          call.on("stream", (remoteStream) => {
            const remoteVideo = document.getElementById(
              "remote-video",
            ) as HTMLVideoElement;
            if (remoteVideo) remoteVideo.srcObject = remoteStream;
          });
        });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const callPeer = () => {
    // tilslutter bruger
    const peer = peerRef.current;
    if (!peer || !remotePeerId) return;

    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream; // <-- Tilføjet denne linje
        const localVideo = document.getElementById(
          "local-video",
        ) as HTMLVideoElement;
        if (localVideo) localVideo.srcObject = stream;

        const call = peer.call(remotePeerId, stream);

        call.on("stream", (remoteStream) => {
          const remoteVideo = document.getElementById(
            "remote-video",
          ) as HTMLVideoElement;
          if (remoteVideo) remoteVideo.srcObject = remoteStream;
        });
      });
  };

  //tænd/sluk for kamera metode
  const toggleCamera = () => {
    const stream = localStreamRef.current;
    if (!stream) return;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = !cameraOn;
    });

    setCameraOn(!cameraOn);
  };

  //tænd/sluk for mikrofon metode
  const toggleMic = () => {
    const stream = localStreamRef.current;
    if (!stream) return;

    stream.getAudioTracks().forEach((track) => {
      track.enabled = !micOn;
    });

    setMicOn(!micOn);
  };

  //læg på metode
  const disconnectCall = () => {
    const localVideo = document.getElementById(
      "local-video",
    ) as HTMLVideoElement;
    const remoteVideo = document.getElementById(
      "remote-video",
    ) as HTMLVideoElement;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    if (localVideo) localVideo.srcObject = null;
    if (remoteVideo) remoteVideo.srcObject = null;

    const peer = peerRef.current;
    if (peer) {
      peer.destroy();
      peerRef.current = null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Chat med dine Star Wars buddies!
      </h1>

      {peerId ? (
        <>
          <p>
            Dit Star Wars ID er :{" "}
            <code className="text-blue-600">{peerId}</code>
          </p>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Indtast modtagerens Peer ID"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={callPeer}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Forbind
            </button>
          </div>

          {/* Videoer */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <video
              id="local-video"
              autoPlay
              muted
              className="border w-full h-[400px]"
            />
            <video
              id="remote-video"
              autoPlay
              className="border w-full h-[400px]"
            />
          </div>

          {/* Knapperne – NU under videoerne, ikke fixed */}
          <div className="flex justify-center mt-6 gap-6">
            <button
              onClick={toggleCamera}
              className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 text-white"
              title="Toggle kamera"
            >
              🎥
            </button>
            <button
              onClick={toggleMic}
              className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 text-white"
              title="Toggle mikrofon"
            >
              🎤
            </button>
            <button
              onClick={disconnectCall}
              className="bg-gray-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-700 text-white"
              title="Læg på"
            >
              ❌
            </button>
          </div>
        </>
      ) : (
        <p>Forbinder til PeerJS server...</p>
      )}
    </div>
  );
}
