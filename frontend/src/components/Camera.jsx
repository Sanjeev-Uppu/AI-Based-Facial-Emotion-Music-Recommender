import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function Camera({ onEmotion }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let intervalId;

    const start = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      intervalId = setInterval(async () => {
        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (result && result.expressions) {
          const emotion = Object.keys(result.expressions).reduce((a, b) =>
            result.expressions[a] > result.expressions[b] ? a : b
          );
          onEmotion(emotion);
        }
      }, 2000);
    };

    start();

    return () => {
      clearInterval(intervalId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, [onEmotion]);

  return <video ref={videoRef} autoPlay muted width="320" />;
}
