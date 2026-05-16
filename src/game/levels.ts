export interface LevelConfig {
  id: number;
  name: string;
  chapter: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  groundColor: string;
  accentColor: string;
  skyTop: string;
  skyBottom: string;
  ambient: number;
  particle: "petals" | "stars" | "snow" | "rain" | "lanterns" | "embers" | "photos";
  cutsceneTitle: string;
  cutsceneText: string;
}

export const LEVELS: LevelConfig[] = [
  {
    id: 0,
    name: "First Meeting",
    chapter: "Chapter One",
    fogColor: "#f4a261",
    fogNear: 18,
    fogFar: 80,
    groundColor: "#3a1f2b",
    accentColor: "#ffd27a",
    skyTop: "#ff9a76",
    skyBottom: "#5b2a4a",
    ambient: 0.6,
    particle: "embers",
    cutsceneTitle: "And there you were…",
    cutsceneText:
      "A golden evening I never planned for. One look, and the whole world quieted down.",
  },
  {
    id: 1,
    name: "Falling In Love",
    chapter: "Chapter Two",
    fogColor: "#7a3a8a",
    fogNear: 18,
    fogFar: 75,
    groundColor: "#1a0a2a",
    accentColor: "#ff6fa3",
    skyTop: "#3a0a4a",
    skyBottom: "#0a0014",
    ambient: 0.45,
    particle: "petals",
    cutsceneTitle: "Lost in your laugh",
    cutsceneText:
      "Neon nights, rose petals on the breeze — somewhere between hellos and good-nights, I fell.",
  },
  {
    id: 2,
    name: "Beautiful Memories",
    chapter: "Chapter Three",
    fogColor: "#2a4a7a",
    fogNear: 20,
    fogFar: 90,
    groundColor: "#0a1530",
    accentColor: "#9fd7ff",
    skyTop: "#1a2a5a",
    skyBottom: "#02050f",
    ambient: 0.5,
    particle: "photos",
    cutsceneTitle: "Every frame, a feeling",
    cutsceneText:
      "Polaroids floating like quiet stars — proof we lived, laughed, loved.",
  },
  {
    id: 3,
    name: "Through The Storm",
    chapter: "Chapter Four",
    fogColor: "#1a1f2a",
    fogNear: 14,
    fogFar: 60,
    groundColor: "#05080f",
    accentColor: "#7fb3ff",
    skyTop: "#0a0f1f",
    skyBottom: "#000004",
    ambient: 0.3,
    particle: "rain",
    cutsceneTitle: "Still, I chose you",
    cutsceneText:
      "Distance tried. Silence tried. Your name kept finding its way back to my soul.",
  },
  {
    id: 4,
    name: "Stronger Together",
    chapter: "Chapter Five",
    fogColor: "#ffb27a",
    fogNear: 22,
    fogFar: 95,
    groundColor: "#2a1a14",
    accentColor: "#ffd27a",
    skyTop: "#ff9a55",
    skyBottom: "#3a1a2a",
    ambient: 0.6,
    particle: "embers",
    cutsceneTitle: "Sunrise, hand in hand",
    cutsceneText:
      "The storm passed. We didn't. We came out warmer, softer, stronger.",
  },
  {
    id: 5,
    name: "Future Dreams",
    chapter: "Chapter Six",
    fogColor: "#1a2a5a",
    fogNear: 24,
    fogFar: 100,
    groundColor: "#0a0a2a",
    accentColor: "#ffe27a",
    skyTop: "#3a2a8a",
    skyBottom: "#05051a",
    ambient: 0.55,
    particle: "lanterns",
    cutsceneTitle: "A lifetime in front of us",
    cutsceneText:
      "Floating lanterns over a city we haven't built yet — but will, together.",
  },
  {
    id: 6,
    name: "Anniversary",
    chapter: "Final Chapter",
    fogColor: "#5a2a4a",
    fogNear: 22,
    fogFar: 90,
    groundColor: "#1a0820",
    accentColor: "#ffd27a",
    skyTop: "#7a2a5a",
    skyBottom: "#1a0420",
    ambient: 0.7,
    particle: "photos",
    cutsceneTitle: "Happy Anniversary, my love",
    cutsceneText: "One more run — straight into forever.",
  },
];
