import { useEffect, useRef, useState } from "react";

const TRACK = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"; // soft romantic piano

export function MusicToggle({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    ref.current.volume = 0.35;
    ref.current.play().catch(() => {});
  }, [enabled]);

  const toggle = () => {
    if (!ref.current) return;
    ref.current.muted = !muted;
    setMuted(!muted);
    if (!muted) ref.current.play().catch(() => {});
  };

  return (
    <>
      <audio ref={ref} src={TRACK} loop preload="auto" />
      {enabled && (
        <button onClick={toggle}
          className="fixed bottom-6 right-6 z-40 glass rounded-full w-12 h-12 flex items-center justify-center text-gold hover:scale-110 transition-transform">
          {muted ? "🔇" : "🎵"}
        </button>
      )}
    </>
  );
}
