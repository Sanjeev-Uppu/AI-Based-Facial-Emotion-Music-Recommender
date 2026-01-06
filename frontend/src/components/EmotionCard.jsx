const displayEmotionMap = {
  happy: "HAPPY",
  sad: "SAD",
  angry: "ANGRY",
  neutral: "NEUTRAL",
  surprised: "SURPRISE"
};

export default function EmotionCard({ emotion }) {
  return (
    <div className="card">
      <h2>Detected Emotion</h2>
      <p className="emotion">
        {displayEmotionMap[emotion] || emotion.toUpperCase()}
      </p>
    </div>
  );
}
