import { useState, useEffect } from "react";
import axios from "axios";
import Camera from "./components/Camera";
import EmotionCard from "./components/EmotionCard";
import SongCard from "./components/SongCard";

export default function App() {
  const [emotion, setEmotion] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!emotion) return;

    // 🔹 Normalize emotion before sending to backend
    const normalizedEmotion =
      emotion === "surprised" ? "surprise" : emotion;

    axios
      .post("http://localhost:8000/recommend", {
        emotion: normalizedEmotion,
      })
      .then((res) => {
        setSongs(res.data.songs);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setSongs([]);
      });
  }, [emotion]);

  return (
    <div className="container">
      <h1>Emotion-Based Music Recommendation</h1>

      {/* Camera detects raw emotion from face-api.js */}
      <Camera onEmotion={setEmotion} />

      {/* Display emotion (UI-friendly formatting handled inside component) */}
      {emotion && <EmotionCard emotion={emotion} />}

      {/* Render recommended songs */}
      {songs.length > 0 &&
        songs.map((song, index) => (
          <SongCard key={index} song={song} />
        ))}
    </div>
  );
}
