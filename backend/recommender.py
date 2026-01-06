import json
from pathlib import Path

DATA_PATH = Path(__file__).parent / "data" / "songs.json"

with open(DATA_PATH, "r") as f:
    SONGS = json.load(f)

def recommend_songs(emotion: str):
    return SONGS.get(emotion.lower(), [])
