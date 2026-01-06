export default function SongCard({ song }) {
  return (
    <div className="card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>

      <a href={song.spotify} target="_blank" rel="noreferrer">
        🎵 Spotify
      </a>
      <br />
      <a href={song.youtube} target="_blank" rel="noreferrer">
        ▶ YouTube
      </a>
    </div>
  );
}
