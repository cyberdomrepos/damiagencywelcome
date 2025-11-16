"use client";

import { useState, useRef, useEffect } from "react";

interface MusicTrack {
  src: string;
  title: string;
  cover: string;
}

interface MusicCarouselProps {
  tracks: MusicTrack[];
}

export default function MusicCarousel({ tracks }: MusicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const currentTrack = tracks[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-linear-to-br from-purple-900/20 to-fuchsia-900/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
        {/* Album Cover */}
        <div className="relative aspect-square w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {currentTrack.title}
          </h3>
          <p className="text-purple-300 text-sm">
            Track {currentIndex + 1} of {tracks.length}
          </p>
        </div>

        {/* Audio Player */}
        <audio ref={audioRef} src={currentTrack.src} />

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Previous track"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={togglePlayPause}
            className="p-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Next track"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


interface MusicTrack {
  src: string;
  title: string;
  cover: string;
}

interface MusicCarouselProps {
  tracks: MusicTrack[];
}

export default function MusicCarousel({ tracks }: MusicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const currentTrack = tracks[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-linear-to-br from-purple-900/20 to-fuchsia-900/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
        {/* Album Cover */}
        <div className="relative aspect-square w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {currentTrack.title}
          </h3>
          <p className="text-purple-300 text-sm">
            Track {currentIndex + 1} of {tracks.length}
          </p>
        </div>

        {/* Audio Player */}
        <audio ref={audioRef} src={currentTrack.src} />

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Previous track"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={togglePlayPause}
            className="p-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            aria-label="Next track"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
