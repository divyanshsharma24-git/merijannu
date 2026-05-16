import { create } from "zustand";

export type GameState =
  | "menu"
  | "playing"
  | "cutscene"
  | "levelComplete"
  | "ending"
  | "paused";

export type LevelId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Store {
  state: GameState;
  level: LevelId;
  hearts: number;
  fragments: number;
  distance: number;
  lane: -1 | 0 | 1;
  jump: number; // 0..1 jump timer
  slide: number; // 0..1 slide timer
  speed: number;
  unlockedMemories: number[];
  paused: boolean;

  setState: (s: GameState) => void;
  setLane: (l: -1 | 0 | 1) => void;
  triggerJump: () => void;
  triggerSlide: () => void;
  addHeart: () => void;
  addFragment: (memoryIndex?: number) => void;
  tick: (dt: number) => void;
  startGame: () => void;
  nextLevel: () => void;
  hit: () => void;
  reset: () => void;
  togglePause: () => void;
}

const LEVEL_GOALS = [120, 180, 220, 260, 300, 340, 380];

export const useGame = create<Store>((set, get) => ({
  state: "menu",
  level: 0,
  hearts: 0,
  fragments: 0,
  distance: 0,
  lane: 0,
  jump: 0,
  slide: 0,
  speed: 14,
  unlockedMemories: [],
  paused: false,

  setState: (s) => set({ state: s }),
  setLane: (l) => set({ lane: l }),
  triggerJump: () => {
    if (get().jump <= 0 && get().slide <= 0) set({ jump: 1 });
  },
  triggerSlide: () => {
    if (get().slide <= 0 && get().jump <= 0) set({ slide: 1 });
  },
  addHeart: () => set((s) => ({ hearts: s.hearts + 1 })),
  addFragment: (idx) =>
    set((s) => ({
      fragments: s.fragments + 1,
      unlockedMemories:
        idx !== undefined && !s.unlockedMemories.includes(idx)
          ? [...s.unlockedMemories, idx]
          : s.unlockedMemories,
    })),
  tick: (dt) => {
    const s = get();
    if (s.state !== "playing" || s.paused) return;
    const newDistance = s.distance + s.speed * dt;
    const newJump = Math.max(0, s.jump - dt * 1.4);
    const newSlide = Math.max(0, s.slide - dt * 1.6);
    set({ distance: newDistance, jump: newJump, slide: newSlide });

    const goal = LEVEL_GOALS[s.level];
    if (newDistance >= goal) {
      set({ state: "cutscene" });
    }
  },
  startGame: () =>
    set({
      state: "playing",
      level: 0,
      distance: 0,
      hearts: 0,
      fragments: 0,
      lane: 0,
      jump: 0,
      slide: 0,
      speed: 14,
      unlockedMemories: [],
    }),
  nextLevel: () => {
    const s = get();
    const next = (s.level + 1) as LevelId;
    if (next > 6) {
      set({ state: "ending" });
      return;
    }
    set({
      level: next,
      state: "playing",
      distance: 0,
      speed: Math.min(26, s.speed + 1.5),
      lane: 0,
      jump: 0,
      slide: 0,
    });
  },
  hit: () =>
    set((s) => ({ hearts: Math.max(0, s.hearts - 1), speed: Math.max(10, s.speed - 1) })),
  reset: () =>
    set({
      state: "menu",
      level: 0,
      distance: 0,
      hearts: 0,
      fragments: 0,
      lane: 0,
      jump: 0,
      slide: 0,
      speed: 14,
      unlockedMemories: [],
    }),
  togglePause: () => set((s) => ({ paused: !s.paused })),
}));

export const LEVEL_TARGETS = LEVEL_GOALS;
