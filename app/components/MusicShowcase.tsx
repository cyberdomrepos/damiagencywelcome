"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Track = {
  src: string;
  cover?: string;
  title?: string;
};

export default function MusicShowcase({ tracks }: { tracks: Track[] }) {
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () =>
      setProgress((a.currentTime / Math.max(1, a.duration)) * 100);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", () => setPlaying(false));
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", () => setPlaying(false));
    };
  }, [index]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, index]);

  const prev = () => {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  };
  const next = () => {
    setIndex((i) => (i + 1) % tracks.length);
    setPlaying(true);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-xl bg-black/30 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="col-span-1 flex justify-center">
            <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] relative rounded-lg overflow-hidden">
              {tracks[index]?.cover ? (
                <Image
                  src={tracks[index].cover}
                  alt={tracks[index].title ?? "cover"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                  No cover
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {tracks[index]?.title ?? "Untitled"}
                </h3>
                <p className="text-sm text-gray-300">
                  {tracks[index]?.src.split("/").pop()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  aria-label="Previous track"
                  onClick={prev}
                  className="px-3 py-2 bg-white/6 text-white rounded-md"
                >
                  ‹
                </button>
                <button
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={() => setPlaying((p) => !p)}
                  className="px-4 py-2 bg-teal-400 text-black rounded-md font-semibold"
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  aria-label="Next"
                  onClick={next}
                  className="px-3 py-2 bg-white/6 text-white rounded-md"
                >
                  ›
                </button>
              </div>

              <div className="w-full bg-white/6 h-2 rounded overflow-hidden mt-3">
                <div
                  className="h-full bg-teal-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {tracks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      setPlaying(true);
                    }}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      i === index ? "ring-2 ring-teal-400" : ""
                    }`}
                  >
                    {t.cover ? (
                      <Image
                        src={t.cover}
                        alt={t.title ?? `track ${i + 1}`}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={tracks[index]?.src} />
      </div>
    </div>
  );
}
