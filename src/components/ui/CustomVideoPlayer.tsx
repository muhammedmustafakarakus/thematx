"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Subtitles, Settings, X, Check } from "lucide-react";

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

type QualityOption = "hd1080" | "hd720" | "large" | "auto";

const QUALITY_OPTIONS: { value: QualityOption; label: string; badge: string }[] = [
  { value: "hd1080", label: "1080p HD", badge: "1080p" },
  { value: "hd720", label: "720p HD", badge: "720p" },
  { value: "large", label: "480p", badge: "480p" },
  { value: "auto", label: "Otomatik (HD)", badge: "HD" },
];

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>("hd1080");
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const pendingPlayRef = useRef<boolean>(false);
  const qualityRef = useRef<QualityOption>("hd1080");
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use maxresdefault.jpg so the custom YouTube cover photos are displayed
  // (in a 9:16 box with object-cover object-center, the 9:16 center cover fills the frame cleanly)
  const finalPoster = poster || `https://i.ytimg.com/vi/${resolvedVideoId}/maxresdefault.jpg`;

  const enforceQuality = useCallback((targetPlayer: any, q: QualityOption) => {
    if (!targetPlayer) return;
    try {
      const minQ = q === "auto" ? "hd1080" : q;
      const maxQ = q === "auto" ? "highres" : q === "hd1080" ? "highres" : q;
      if (typeof targetPlayer.setPlaybackQualityRange === "function") {
        targetPlayer.setPlaybackQualityRange(minQ, maxQ);
      }
      if (typeof targetPlayer.setPlaybackQuality === "function") {
        targetPlayer.setPlaybackQuality(minQ);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    let isCancelled = false;

    setIsPlaying(false);
    setIsEnded(false);
    setHasStarted(false);
    setIsReady(false);
    setProgress(0);
    setCurrentTime(0);
    setShowQualityMenu(false);
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
          // Passing playlist forces YouTube's internal isEmbedsShortsMode() to return false,
          // disabling ytp-shorts-mode, Shorts watermark, and Shorts pause UI.
          playlist: resolvedVideoId,
          vq: "hd1080",
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
            enforceQuality(event.target, qualityRef.current);
            try {
              event.target.unloadModule("captions");
              event.target.unloadModule("cc");
              event.target.setOption("captions", "track", { languageCode: "" });
            } catch (e) {}

            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              enforceQuality(event.target, qualityRef.current);
              event.target.playVideo();
              setIsPlaying(true);
              setHasStarted(true);
            }
          },
          onStateChange: (event: any) => {
            if (isCancelled) return;
            // Enforce HD quality on unstarted (-1), playing (1), buffering (3), and cued (5)
            if (event.data === -1 || event.data === 1 || event.data === 3 || event.data === 5) {
              enforceQuality(event.target, qualityRef.current);
            }
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
  }, [resolvedVideoId, startAt, enforceQuality]);

  // Sync progress & stop cleanly before playlist auto-loops
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const current = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || duration;
          if (dur > 0 && current >= dur - 0.25) {
            playerRef.current.pauseVideo();
            playerRef.current.seekTo(0, true);
            setIsPlaying(false);
            setIsEnded(true);
            setProgress(0);
            setCurrentTime(0);
            return;
          }
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

  // Sync fullscreen state with browser Fullscreen API & Escape key
  useEffect(() => {
    const handleFsChange = () => {
      const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
      setIsFullscreen(fsEl === containerRef.current);
      if (playerRef.current) {
        enforceQuality(playerRef.current, qualityRef.current);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
        if (!fsEl) {
          setIsFullscreen(false);
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, enforceQuality]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowQualityMenu(false);
    if (!isReady || !playerRef.current || typeof playerRef.current.playVideo !== 'function') {
      pendingPlayRef.current = true;
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      if (isEnded) {
        playerRef.current.seekTo(0, true);
        setIsEnded(false);
      }
      enforceQuality(playerRef.current, qualityRef.current);
      playerRef.current.playVideo();
      setIsPlaying(true);
      setHasStarted(true);
    }
  }, [isPlaying, isReady, isEnded, enforceQuality]);

  const handleSelectQuality = (q: QualityOption, e: React.MouseEvent) => {
    e.stopPropagation();
    qualityRef.current = q;
    setSelectedQuality(q);
    setShowQualityMenu(false);
    if (playerRef.current && isReady) {
      enforceQuality(playerRef.current, q);
      // Seeking to current time forces YouTube's buffer to immediately switch to the new quality
      try {
        const cur = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(cur, true);
      } catch (err) {}
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isReady || !playerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = playerRef.current.getDuration() || duration;
    const newTime = Math.min(dur - 0.3, pos * dur);
    
    enforceQuality(playerRef.current, qualityRef.current);
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(pos * 100);
    
    if (!isPlaying) {
      playerRef.current.playVideo();
      setIsPlaying(true);
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
    setShowQualityMenu(false);
    const container = containerRef.current;
    if (!container) return;

    const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (!fsEl && !isFullscreen) {
      const reqFs = container.requestFullscreen || (container as any).webkitRequestFullscreen;
      if (reqFs) {
        reqFs.call(container).then(() => {
          setIsFullscreen(true);
        }).catch(() => {
          // Fallback fixed overlay fullscreen for mobile browsers (e.g. iOS Safari)
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      const exitFs = document.exitFullscreen || (document as any).webkitExitFullscreen;
      if (fsEl && exitFs) {
        exitFs.call(document).catch(() => {});
      }
      setIsFullscreen(false);
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
      if (isPlaying && !showQualityMenu) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const handleMouseLeave = () => {
      if (isPlaying && !showQualityMenu) setShowControls(false);
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
  }, [isPlaying, showQualityMenu]);

  const targetAspectRatio = aspectRatio === "9:16" ? "9 / 16" : "16 / 9";
  const currentQualityBadge = QUALITY_OPTIONS.find(o => o.value === selectedQuality)?.badge || "1080p";

  return (
    <div 
      ref={containerRef}
      className={
        isFullscreen
          ? "fixed inset-0 z-[9999] w-screen h-screen bg-black/95 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 select-none"
          : `relative w-full rounded-2xl shadow-2xl group/vid select-none ${className}`
      }
      style={
        isFullscreen
          ? { width: "100vw", height: "100vh" }
          : { aspectRatio: targetAspectRatio }
      }
      onClick={isFullscreen ? toggleFullscreen : undefined}
    >
      {/* Rotating Neon Border Layer (Only in normal card view) */}
      {!isFullscreen && (
        <div className="absolute -inset-[3px] rounded-[19px] opacity-0 group-hover/vid:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,#10b981_100%)] animate-[spin_2.5s_linear_infinite] blur-[2px]" />
        </div>
      )}

      {/* Inner Video Container */}
      <div
        className={
          isFullscreen
            ? "relative bg-black sm:rounded-2xl overflow-hidden z-10 shadow-2xl ring-1 ring-white/20"
            : "absolute inset-0 w-full h-full bg-black rounded-2xl overflow-hidden z-10 ring-1 ring-white/10"
        }
        style={
          isFullscreen
            ? aspectRatio === "9:16"
              ? { height: "100%", maxHeight: "96vh", aspectRatio: "9 / 16", maxWidth: "100vw" }
              : { width: "100%", maxWidth: "94vw", aspectRatio: "16 / 9", maxHeight: "94vh" }
            : undefined
        }
        onClick={togglePlay}
      >
        {/* Top-Right Close Button in Fullscreen */}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-colors shadow-lg"
            title="Tam Ekrandan Çık"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Supersampled Full-HD Stage:
            YouTube's ABR caps resolution to the iframe's internal pixel width/height.
            By rendering the stage at 400% (4x) in card view and 200% (2x) in fullscreen
            and scaling it back down via CSS transform, YouTube sees a ~1080x1920 Full HD
            viewport at all times and streams native 1080p HD instead of 240p/360p. */}
        <div
          className="absolute top-0 left-0 pointer-events-none z-0 overflow-hidden"
          style={
            isFullscreen
              ? {
                  width: "200%",
                  height: "200%",
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                }
              : {
                  width: "400%",
                  height: "400%",
                  transform: "scale(0.25)",
                  transformOrigin: "top left",
                }
          }
        >
          <div
            ref={iframeHostRef}
            className="absolute left-0 right-0 w-full pointer-events-none [&>div]:w-full [&>div]:h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full"
            style={
              aspectRatio === "9:16"
                ? { top: "-300px", bottom: "-300px", height: "calc(100% + 600px)" }
                : { top: "-150px", bottom: "-150px", height: "calc(100% + 300px)" }
            }
          />
        </div>

        {/* Click Catcher Overlay (Reliably catches clicks to play/pause) */}
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

        {/* THUMBNAIL OVERLAY (Before First Play or Ended) */}
        {(!hasStarted || isEnded) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black cursor-pointer group/thumb">
            {finalPoster && (
              <img 
                src={finalPoster} 
                alt={title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes("maxresdefault.jpg")) {
                    target.src = `https://i.ytimg.com/vi/${resolvedVideoId}/hqdefault.jpg`;
                  } else if (target.src.includes("hqdefault.jpg")) {
                    target.src = `https://i.ytimg.com/vi/${resolvedVideoId}/oar2.jpg`;
                  } else {
                    target.src = `https://i.ytimg.com/vi/${resolvedVideoId}/default.jpg`;
                  }
                }}
              />
            )}

            {/* Top Right Small Red Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-600/95 group-hover/thumb:bg-red-600 group-hover/thumb:scale-105 transition-all duration-300 backdrop-blur-sm rounded-lg flex items-center gap-1 shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-30">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent"></div>
              <span className="text-[10px] font-bold text-white tracking-wider uppercase">İzle</span>
            </div>
          </div>
        )}

        {/* PLAYBACK CONTROLS (Only when started and not ended) */}
        {hasStarted && !isEnded && (
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 pt-12 pb-2.5 transition-opacity duration-300 z-30 ${showControls || !isPlaying || showQualityMenu ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quality Selector Popup Menu */}
            {showQualityMenu && (
              <div className="absolute bottom-12 right-2 bg-black/95 backdrop-blur-md border border-white/15 rounded-xl p-1.5 shadow-2xl z-50 min-w-[135px]">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 border-b border-white/10 mb-1">
                  Video Kalitesi
                </div>
                {QUALITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={(e) => handleSelectQuality(opt.value, e)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedQuality === opt.value
                        ? "bg-red-600 text-white font-bold"
                        : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedQuality === opt.value && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}

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
              <div className="flex items-center gap-1.5 min-w-0">
                {/* Play/Pause */}
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-white/80 transition-colors shrink-0"
                  title={isPlaying ? "Duraklat" : "Oynat"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>

                {/* Volume/Mute */}
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-white/80 transition-colors flex items-center shrink-0"
                  title={isMuted ? "Sesi Aç" : "Sessize Al"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 fill-white" />}
                </button>

                {/* Time Display */}
                <div className="text-white text-[10px] font-medium tracking-tight font-sans whitespace-nowrap truncate">
                  {formatTime(currentTime)}
                  {isFullscreen && (
                    <>
                      <span className="opacity-60 mx-0.5">/</span>
                      {formatTime(duration)}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Quality Selector Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQualityMenu((prev) => !prev);
                  }}
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/15 hover:bg-white/25 text-white text-[9px] font-bold tracking-tight transition-colors border border-white/15"
                  title="Video Kalitesi"
                >
                  <Settings className="w-2.5 h-2.5" />
                  <span>{currentQualityBadge}</span>
                </button>

                {/* CC / Subtitles Toggle (Shown in Fullscreen) */}
                {isFullscreen && (
                  <button 
                    onClick={toggleCC}
                    className={`text-white hover:text-white/80 transition-colors relative ${isCcOn ? "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3.5 after:h-0.5 after:bg-red-600 after:rounded-full" : "opacity-60 hover:opacity-100"}`}
                    title="Altyazılar"
                  >
                    <Subtitles className="w-4 h-4" />
                  </button>
                )}

                {/* Fullscreen */}
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-white/80 transition-colors"
                  title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
                >
                  {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Center Action Feedback (Shown when paused) */}
        {hasStarted && !isEnded && (
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-red-600/90 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center pointer-events-none shadow-xl transition-all duration-300 z-20 ${!isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
             {!isPlaying ? <Play className="w-6 h-6 text-white fill-white ml-0.5" /> : <Pause className="w-6 h-6 text-white fill-white" />}
          </div>
        )}
      </div>
    </div>
  );
}
