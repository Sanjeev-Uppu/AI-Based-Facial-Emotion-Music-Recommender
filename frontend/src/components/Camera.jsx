import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function Camera({ onEmotion }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const start = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        setLoading(false);

        intervalId = setInterval(async () => {
          if (!videoRef.current) return;

          const result = await faceapi
            .detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceExpressions();

          if (result?.expressions) {
            const emotion = Object.keys(result.expressions).reduce((a, b) =>
              result.expressions[a] > result.expressions[b] ? a : b
            );
            onEmotion(emotion);
          }
        }, 2000);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    start();

    return () => {
      clearInterval(intervalId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, [onEmotion]);

  return (
    <div className="camera-wrapper">
      {loading && <div className="camera-loader">Scanning face…</div>}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="camera-video"
      />

      <div className="scan-frame"></div>
    </div>
  );
}
