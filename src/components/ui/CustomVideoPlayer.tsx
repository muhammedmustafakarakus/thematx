"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Subtitles, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface CustomVideoPlayerProps {
  youtubeId?: string;
  poster?: string;
  title?: string;
  channelName?: string;
  className?: string;
  startAt?: number;
  aspectRatio?: "9:16" | "16:9";
}

function extractYoutubeId(input: string): string {
  if (!input) return "DB0OJEYFeo0";
  const trimmed = input.trim();
  const watchMatch = trimmed.match(/[?&]v=([^&#]+)/);
  if (watchMatch) return watchMatch[1];
  const shortsMatch = trimmed.match(/shorts\/([^?&#/]+)/);
  if (shortsMatch) return shortsMatch[1];
  const embedMatch = trimmed.match(/embed\/([^?&#/]+)/);
  if (embedMatch) return embedMatch[1];
  const shortUrlMatch = trimmed.match(/youtu\.be\/([^?&#/]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];
  return trimmed;
}

export default function CustomVideoPlayer({
  youtubeId = "https://www.youtube.com/watch?v=DB0OJEYFeo0",
  poster,
  title = "Tanıtım Videosu",
  channelName = "Thematx",
  className = "",
  startAt = 0,
  aspectRatio = "9:16"
}: CustomVideoPlayerProps) {
  const resolvedVideoId = extractYoutubeId(youtubeId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isCcOn, setIsCcOn] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const pendingPlayRef = useRef<boolean>(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // oar2.jpg is YouTube's native 9:16 vertical high-res thumbnail
  const finalPoster = poster || (aspectRatio === "9:16"
    ? `https://img.youtube.com/vi/${resolvedVideoId}/oar2.jpg`
    : `https://img.youtube.com/vi/${resolvedVideoId}/maxresdefault.jpg`);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    let isCancelled = false;

    setIsPlaying(false);
    setIsEnded(false);
    setHasStarted(false);
    setIsReady(false);
    setProgress(0);
    setCurrentTime(0);
    pendingPlayRef.current = false;

    const initPlayer = () => {
      if (isCancelled || playerRef.current || !iframeHostRef.current) return;

      iframeHostRef.current.innerHTML = "";
      const mountEl = document.createElement("div");
      mountEl.className = "w-full h-full border-none";
      iframeHostRef.current.appendChild(mountEl);

      playerRef.current = new window.YT.Player(mountEl, {
        videoId: resolvedVideoId,
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          ...(startAt > 0 ? { start: startAt } : {}),
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          hl: "tr",
          origin: typeof window !== "undefined" ? window.location.origin : undefined
        },
        events: {
          onReady: (event: any) => {
            if (isCancelled) return;
            setIsReady(true);
            setDuration(event.target.getDuration());
            try {
              event.target.unloadModule("captions");
              event.target.unloadModule("cc");
              event.target.setOption("captions", "track", { languageCode: "" });
            } catch (e) {}

            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.playVideo();
              setIsPlaying(true);
              setHasStarted(true);
            }
          },
          onStateChange: (event: any) => {
            if (isCancelled) return;
            if (event.data === 1) {
              setIsPlaying(true);
              setIsEnded(false);
              setHasStarted(true);
              setDuration(event.target.getDuration());
              
              try {
                if (!isCcOn) {
                  event.target.unloadModule("captions");
                  event.target.setOption("captions", "track", { languageCode: "" });
                } else {
                  event.target.loadModule("captions");
                  event.target.setOption("captions", "track", {});
                }
              } catch (e) {}
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              setIsEnded(true);
            }
          }
        }
      });
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById('youtube-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }
      
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          initPlayer();
        }
      }, 100);
    } else {
      initPlayer();
    }

    return () => {
      isCancelled = true;
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
      playerRef.current = null;
    };
  }, [resolvedVideoId, startAt]);

  // Sync progress
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const current = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || duration;
          setCurrentTime(current);
          if (dur > 0) {
            setProgress((current / dur) * 100);
          }
        }
      }, 100);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isReady || !playerRef.current || typeof playerRef.current.playVideo !== 'function') {
      pendingPlayRef.current = true;
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false); // Optimistic UI update
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true); // Optimistic UI update
      setHasStarted(true);
    }
  }, [isPlaying, isReady]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isReady || !playerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = playerRef.current.getDuration() || duration;
    const newTime = pos * dur;
    
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(pos * 100);
    
    if (!isPlaying) {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isReady || !playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleCC = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isReady || !playerRef.current) return;

    if (isCcOn) {
      try {
        playerRef.current.unloadModule("captions");
        playerRef.current.setOption("captions", "track", { languageCode: "" });
      } catch (err) {}
      setIsCcOn(false);
    } else {
      try {
        playerRef.current.loadModule("captions");
        playerRef.current.setOption("captions", "track", {});
      } catch (err) {}
      setIsCcOn(true);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Auto-hide controls when playing
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const handleMouseLeave = () => {
      if (isPlaying) setShowControls(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Padding-top ratio box: works in every browser (old iOS Safari included)
  // and never collapses to 0px height, independent of Tailwind arbitrary classes.
  const ratioPadding = aspectRatio === "9:16" ? "177.7778%" : "56.25%";

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-0 rounded-2xl shadow-2xl group/vid ${className}`}
      style={{ paddingTop: ratioPadding }}
    >
      {/* Rotating Neon Border Layer */}
      <div className="absolute -inset-[3px] rounded-[19px] opacity-0 group-hover/vid:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,#10b981_100%)] animate-[spin_2.5s_linear_infinite] blur-[2px]" />
      </div>

      {/* Inner Video Container */}
      <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden z-10 ring-1 ring-white/10" onClick={togglePlay}>

      {/* Hidden YouTube iframe container */}
      <div
        ref={iframeHostRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 [&>div]:w-full [&>div]:h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full"
      />

      {/* Click Catcher Overlay (Reliably catches clicks to play/pause) */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

      {/* THUMBNAIL OVERLAY (Before First Play or Ended) */}
      {(!hasStarted || isEnded) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black cursor-pointer group/thumb">
          {finalPoster && (
            <img 
              src={finalPoster} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes("oar2.jpg")) {
                  target.src = `https://img.youtube.com/vi/${resolvedVideoId}/maxresdefault.jpg`;
                } else if (target.src.includes("maxresdefault.jpg")) {
                  target.src = `https://img.youtube.com/vi/${resolvedVideoId}/hqdefault.jpg`;
                } else {
                  target.src = `https://img.youtube.com/vi/${resolvedVideoId}/default.jpg`;
                }
              }}
            />
          )}

          {/* Subtle vignette for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 opacity-80 group-hover/thumb:opacity-60 transition-opacity duration-300" />
          
          {/* Center Glass Play Button */}
          <div className="relative z-30 w-14 h-14 rounded-full bg-red-600/95 backdrop-blur-md flex items-center justify-center shadow-[0_8px_30px_rgba(220,38,38,0.6)] group-hover/thumb:scale-110 transition-all duration-300 border border-white/25">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>

          {/* Top Right Small Red Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded-lg flex items-center gap-1 shadow-[0_4px_10px_rgba(0,0,0,0.4)] z-30">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent"></div>
            <span className="text-[10px] font-bold text-white tracking-wider uppercase">İzle</span>
          </div>
        </div>
      )}

      {/* PLAYBACK CONTROLS (Only when started and not ended) */}
      {hasStarted && !isEnded && (
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-2.5 pt-10 pb-2 transition-opacity duration-300 z-30 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Progress Bar Container */}
          <div 
            className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative group/progress transition-all duration-200 hover:h-2"
            onClick={handleProgressClick}
          >
            {/* Filled Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
              style={{ width: `${progress}%` }}
            >
              {/* Scrubber Dot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between mt-2 px-0.5 gap-1">
            <div className="flex items-center gap-2 min-w-0">
              {/* Play/Pause */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-white/80 transition-colors shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Volume/Mute */}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-white/80 transition-colors flex items-center shrink-0"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 fill-white" />}
              </button>

              {/* Time Display */}
              <div className="text-white text-[11px] font-medium tracking-tight font-sans whitespace-nowrap">
                {formatTime(currentTime)} <span className="opacity-60 mx-0.5">/</span> {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* CC / Subtitles Toggle */}
              <button 
                onClick={toggleCC}
                className={`text-white hover:text-white/80 transition-colors relative ${isCcOn ? "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3.5 after:h-0.5 after:bg-red-600 after:rounded-full" : "opacity-60 hover:opacity-100"}`}
                title="Altyazılar"
              >
                <Subtitles className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-white/80 transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Center Action Feedback (Briefly shown when clicking video) */}
      {hasStarted && !isEnded && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ${!isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
           {!isPlaying ? <Play className="w-7 h-7 text-white fill-white ml-0.5" /> : <Pause className="w-7 h-7 text-white fill-white" />}
        </div>
      )}
      </div>
    </div>
  );
}
