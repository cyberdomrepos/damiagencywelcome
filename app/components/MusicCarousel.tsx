"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Track {
  src: string; // audio file url
  title?: string;
  cover?: string; // background image for the carousel slide
}

interface MusicCarouselProps {
  tracks: Track[];
  autoplay?: boolean;
  interval?: number;
  variant?: "large" | "default";
}

export default function MusicCarousel({
  tracks,
  autoplay = false,
  interval = 4500,
  variant = "large",
}: MusicCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const decodedMap = useRef<Map<string, AudioBuffer>>(new Map());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRefs = useRef<Array<AnalyserNode | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const rafRefs = useRef<Array<number | null>>([]);
  const [, forceUpdate] = useState(0); // trigger re-render for timestamp updates

  // drawWaveform is used by loader and by the RAF progress loop
  const drawWaveform = useCallback(
    (buffer: AudioBuffer, canvas: HTMLCanvasElement, progress = 0) => {
      const width = (canvas.width = Math.max(
        1,
        canvas.clientWidth * window.devicePixelRatio
      ));
      const height = (canvas.height = Math.max(
        50,
        canvas.clientHeight * window.devicePixelRatio
      ));
      const data = buffer.getChannelData(0);
      const step = Math.ceil(data.length / width);
      const amp = height / 2;
      const ctx2 = canvas.getContext("2d");
      if (!ctx2) return;
      // precompute min/max per x
      const mins: number[] = new Array(width);
      const maxs: number[] = new Array(width);
      for (let i = 0; i < width; i++) {
        let min = 1.0;
        let max = -1.0;
        const start = i * step;
        for (let j = 0; j < step && start + j < data.length; j++) {
          const datum = data[start + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        mins[i] = min;
        maxs[i] = max;
      }

      // clear and draw background
      ctx2.clearRect(0, 0, width, height);
      ctx2.fillStyle = "rgba(255,255,255,0.06)";
      ctx2.fillRect(0, 0, width, height);

      ctx2.lineWidth = 1 * window.devicePixelRatio;

      // base waveform (faint)
      ctx2.strokeStyle = "rgba(255,255,255,0.28)";
      ctx2.beginPath();
      for (let i = 0; i < width; i++) {
        const x = i;
        const y1 = (1 + mins[i]) * amp;
        const y2 = (1 + maxs[i]) * amp;
        ctx2.moveTo(x, y1);
        ctx2.lineTo(x, y2);
      }
      ctx2.stroke();

      // progress overlay
      const progressX = Math.round(width * Math.min(1, Math.max(0, progress)));
      if (progressX > 0) {
        ctx2.save();
        ctx2.beginPath();
        ctx2.rect(0, 0, progressX, height);
        ctx2.clip();
        ctx2.strokeStyle = "#a78bfa"; // purple accent
        ctx2.beginPath();
        for (let i = 0; i < width; i++) {
          const x = i;
          const y1 = (1 + mins[i]) * amp;
          const y2 = (1 + maxs[i]) * amp;
          ctx2.moveTo(x, y1);
          ctx2.lineTo(x, y2);
        }
        ctx2.stroke();
        ctx2.restore();
      }
    },
    []
  );

  const stopProgressLoop = useCallback((i: number) => {
    const id = rafRefs.current[i];
    if (id != null) {
      cancelAnimationFrame(id);
      rafRefs.current[i] = null;
    }
  }, []);

  const startProgressLoop = useCallback(
    (i: number, buffer: AudioBuffer, canvas: HTMLCanvasElement) => {
      // cancel any existing
      stopProgressLoop(i);
      const loop = () => {
        const audio = audioRefs.current[i];
        const progress =
          audio && audio.duration ? audio.currentTime / audio.duration : 0;
        drawWaveform(buffer, canvas, progress);
        forceUpdate(Math.random()); // trigger re-render for timestamp
        rafRefs.current[i] = window.requestAnimationFrame(loop);
      };
      rafRefs.current[i] = window.requestAnimationFrame(loop);
    },
    [stopProgressLoop, drawWaveform]
  );

  // Create (or return) an AnalyserNode for a given track index on-demand
  function ensureAnalyserFor(i: number) {
    const audio = audioRefs.current[i];
    if (!audio) return null;
    if (!audioCtxRef.current) {
      // use the standard AudioContext constructor
      // webkit prefix is only for very old Safari
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    if (analyserRefs.current[i]) return analyserRefs.current[i];
    try {
      const ctx = audioCtxRef.current!;
      const srcNode = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      srcNode.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRefs.current[i] = analyser;
      return analyser;
    } catch {
      return null;
    }
  }

  // analyser-based draw loop (on-demand) — used when we don't have a predecoded buffer
  const startAnalyserLoop = useCallback(
    (i: number) => {
      stopProgressLoop(i);
      const canvas = canvasRefs.current[i];
      if (!canvas) return;
      // ensure analyser exists (ensureAnalyserFor is a function declaration below)
      const analyser = analyserRefs.current[i] || ensureAnalyserFor(i);
      if (!analyser) return;

      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      const loop = () => {
        try {
          analyser.getByteTimeDomainData(dataArray);
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const width = (canvas.width = Math.max(
            1,
            canvas.clientWidth * window.devicePixelRatio
          ));
          const height = (canvas.height = Math.max(
            50,
            canvas.clientHeight * window.devicePixelRatio
          ));

          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          ctx.fillRect(0, 0, width, height);
          ctx.lineWidth = 2 * window.devicePixelRatio;

          // draw waveform (continuous line)
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.beginPath();
          for (let x = 0; x < width; x++) {
            const datum = dataArray[Math.floor((x * dataArray.length) / width)];
            const v = datum / 128 - 1; // -1..1
            const y = (1 + v) * (height / 2);
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // progress overlay
          const audio = audioRefs.current[i];
          const progress =
            audio && audio.duration ? audio.currentTime / audio.duration : 0;
          const progressX = Math.round(
            width * Math.min(1, Math.max(0, progress))
          );
          if (progressX > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, progressX, height);
            ctx.clip();
            ctx.strokeStyle = "#a78bfa";
            ctx.lineWidth = 2 * window.devicePixelRatio;
            ctx.beginPath();
            for (let x = 0; x < progressX; x++) {
              const datum =
                dataArray[Math.floor((x * dataArray.length) / width)];
              const v = datum / 128 - 1;
              const y = (1 + v) * (height / 2);
              if (x === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
            ctx.restore();
          }
          forceUpdate(Math.random()); // trigger re-render for timestamp
        } catch {
          // ignore drawing errors
        }
        rafRefs.current[i] = window.requestAnimationFrame(loop);
      };

      rafRefs.current[i] = window.requestAnimationFrame(loop);
    },
    [stopProgressLoop]
  );

  const length = tracks.length;

  useEffect(() => {
    if (!autoplay || length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoplay, interval, length]);

  useEffect(() => {
    // when index changes: only auto-play if autoplay is enabled
    audioRefs.current.forEach((a, i) => {
      try {
        if (!a) return;
        if (autoplay && i === index) {
          a.currentTime = 0;
          a.play().catch(() => {});
          setPlayingIndex(i);
          // if we previously had an analyser for this track, start its loop
          if (analyserRefs.current[i]) startAnalyserLoop(i);
        } else {
          a.pause();
          stopProgressLoop(i);
        }
      } catch {
        // ignore
      }
    });
  }, [index, autoplay, startAnalyserLoop, stopProgressLoop]);

  // (no local playing state required; we rely on the audio elements themselves)

  // We won't decode audio buffers on mount (that triggers fetches).
  // Instead, create an AudioContext + MediaElementSource + Analyser
  // on-demand when the user presses play to avoid background fetch/download prompts.

  useEffect(() => {
    // pause autoplay when hovering
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const onLeave = () => {
      if (autoplay && length > 1 && !timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setIndex((i) => (i + 1) % length);
        }, interval);
      }
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [autoplay, interval, length]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Attach ended and timeupdate listeners to audios
  useEffect(() => {
    const handlers: Array<() => void> = [];
    audioRefs.current.forEach((a, i) => {
      if (!a) {
        handlers.push(() => {});
        return;
      }
      const onEnded = () => {
        stopProgressLoop(i);
        setPlayingIndex((cur) => (cur === i ? null : cur));
      };
      const onTimeUpdate = () => {
        // force re-render to update progress bar and timestamp
        forceUpdate(Math.random());
      };
      a.addEventListener("ended", onEnded);
      a.addEventListener("timeupdate", onTimeUpdate);
      handlers.push(() => {
        a.removeEventListener("ended", onEnded);
        a.removeEventListener("timeupdate", onTimeUpdate);
      });
    });
    const rafSnapshot = rafRefs.current.slice();
    return () => {
      handlers.forEach((h) => h());
      // cancel any remaining RAFs
      rafSnapshot.forEach((id) => id != null && cancelAnimationFrame(id));
    };
  }, [stopProgressLoop]);

  const go = (n: number) =>
    setIndex((i) => {
      const next = (i + n + length) % length;
      return next;
    });

  const togglePlay = (i: number) => {
    const audio = audioRefs.current[i];
    if (!audio) return;
    if (audio.paused) {
      // pause other audios
      audioRefs.current.forEach((a, idx) => {
        if (a && idx !== i) a.pause();
      });
      // stop the autoplay timer when user manually starts playback
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      audio
        .play()
        .then(() => {
          setPlayingIndex(i);
          // start RAF loop to update waveform progress
          const buffer = decodedMap.current.get(tracks[i].src);
          if (buffer && canvasRefs.current[i]) {
            startProgressLoop(i, buffer, canvasRefs.current[i]!);
          } else {
            // fallback: ensure analyser and start analyser-based draw loop
            const analyser = ensureAnalyserFor(i);
            if (analyser && canvasRefs.current[i]) startAnalyserLoop(i);
          }
        })
        .catch(() => {
          // play failed (likely autoplay/user-gesture restriction) — don't set playing state
        });
    } else {
      audio.pause();
      setPlayingIndex((cur) => (cur === i ? null : cur));
      stopProgressLoop(i);
    }
  };

  // Match sizing with design/web carousels
  const mobileAspect = "aspect-[16/9]";
  const heightMdClasses =
    variant === "large"
      ? "md:h-[760px] lg:h-[820px]"
      : "md:h-[760px] lg:h-[820px]";
  const wrapperWidth =
    variant === "large"
      ? "w-full max-w-[640px] sm:max-w-[840px] md:max-w-none mx-auto"
      : "w-full max-w-[640px] sm:max-w-[840px] md:max-w-none mx-auto";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={wrapperWidth}>
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {tracks.map((t, i) => (
              <div
                key={i}
                className={`shrink-0 w-full ${heightMdClasses} relative`}
              >
                <div
                  className={`relative w-full h-full overflow-hidden rounded-lg ${mobileAspect} md:aspect-auto bg-black`}
                >
                  {/* Carousel background image */}
                  {t.cover ? (
                    <Image
                      src={t.cover}
                      alt={t.title ?? `Track ${i + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white">
                      {t.title}
                    </div>
                  )}

                  {/* Dark overlay for better text/controls visibility */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Play button (centered) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={() => togglePlay(i)}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300"
                      aria-label={
                        playingIndex === i
                          ? `Pause ${t.title || "track"}`
                          : `Play ${t.title || "track"}`
                      }
                      aria-pressed={playingIndex === i}
                    >
                      {playingIndex === i ? (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <rect
                            x="6"
                            y="5"
                            width="4"
                            height="14"
                            fill="currentColor"
                          />
                          <rect
                            x="14"
                            y="5"
                            width="4"
                            height="14"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Waveform visualization */}
                  <div className="absolute inset-x-6 md:inset-x-12 bottom-24 md:bottom-28 z-10 bg-black/40 rounded-lg p-2">
                    <canvas
                      ref={(el) => {
                        canvasRefs.current[i] = el;
                        // Initialize canvas when mounted
                        if (el && playingIndex === i) {
                          const analyser =
                            analyserRefs.current[i] || ensureAnalyserFor(i);
                          if (analyser) startAnalyserLoop(i);
                        }
                      }}
                      className="w-full h-16 md:h-20"
                    />
                  </div>

                  {/* Bottom control bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-12 pb-4 px-6 md:px-8">
                    {/* Track info and timestamp */}
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                          {t.title || `Track ${i + 1}`}
                        </h3>
                        <p className="text-sm text-purple-300 mt-1">
                          {playingIndex === i ? "Now Playing" : "Click to play"}
                        </p>
                      </div>
                      <div className="text-base md:text-lg font-mono text-white drop-shadow-lg bg-black/50 px-4 py-2 rounded-lg">
                        {(() => {
                          const audio = audioRefs.current[i];
                          if (!audio || !audio.duration) return "0:00 / 0:00";
                          const current = Math.floor(audio.currentTime || 0);
                          const total = Math.floor(audio.duration || 0);
                          const formatTime = (sec: number) => {
                            const m = Math.floor(sec / 60);
                            const s = sec % 60;
                            return `${m}:${s.toString().padStart(2, "0")}`;
                          };
                          return `${formatTime(current)} / ${formatTime(
                            total
                          )}`;
                        })()}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="relative w-full h-1.5 bg-white/20 rounded-full overflow-visible cursor-pointer hover:h-2 transition-all group"
                      onClick={(e) => {
                        e.stopPropagation();
                        const audio = audioRefs.current[i];
                        if (!audio) return;

                        // Load metadata if not loaded
                        if (!audio.duration || isNaN(audio.duration)) {
                          audio.load();
                          return;
                        }

                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = Math.max(
                          0,
                          Math.min(1, clickX / rect.width)
                        );
                        const newTime = percentage * audio.duration;

                        // Set the new time
                        audio.currentTime = newTime;

                        // Force immediate update
                        forceUpdate(Math.random());

                        // Start playing if paused and this is the current slide
                        if (audio.paused && i === index) {
                          togglePlay(i);
                        }
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full bg-purple-500 rounded-full transition-none"
                        style={{
                          width: (() => {
                            const audio = audioRefs.current[i];
                            if (
                              !audio ||
                              !audio.duration ||
                              isNaN(audio.duration)
                            )
                              return "0%";
                            const pct =
                              (audio.currentTime / audio.duration) * 100;
                            return `${Math.max(0, Math.min(100, pct))}%`;
                          })(),
                        }}
                      >
                        {/* Progress indicator dot */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Hidden audio element */}
                  <audio
                    ref={(el) => {
                      audioRefs.current[i] = el;
                    }}
                    src={t.src}
                    preload="none"
                    className="sr-only"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ›
      </button>

      <div className="mt-3 flex justify-center gap-3">
        {tracks.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
