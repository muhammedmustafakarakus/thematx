"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
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
}

export default function CustomVideoPlayer({
  youtubeId = "nTgXuRx2cuk",
  poster,
  title = "Tanıtım Videosu",
  channelName = "Thematx",
  className = "",
  startAt = 30
}: CustomVideoPlayerProps) {
  const playerId = useId().replace(/:/g, ''); // Ensure safe ID for DOM
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const finalPoster = poster || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const initPlayer = () => {
      if (playerRef.current) return; // Already initialized

      playerRef.current = new window.YT.Player(`yt-player-${playerId}`, {
        videoId: youtubeId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          start: startAt,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          hl: 'tr'
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(event.target.getDuration());
            try {
              event.target.unloadModule("captions");
              event.target.unloadModule("cc");
            } catch (e) {
              console.warn("Could not unload captions module");
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1
            // YT.PlayerState.PAUSED = 2
            // YT.PlayerState.ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
              setIsEnded(false);
              setHasStarted(true);
              setDuration(event.target.getDuration());
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

    if (!window.YT) {
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
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [youtubeId, startAt, playerId]);

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
    if (!isReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
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

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-video rounded-2xl shadow-2xl group/vid ${className}`}
    >
      {/* Rotating Neon Border Layer */}
      <div className="absolute -inset-[3px] rounded-[19px] opacity-0 group-hover/vid:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_75%,#ef4444_100%)] animate-[spin_2s_linear_infinite] blur-[2px]" />
      </div>

      {/* Inner Video Container */}
      <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden z-10" onClick={togglePlay}>

      {/* Hidden YouTube iframe container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div id={`yt-player-${playerId}`} className="w-full h-full border-none"></div>
      </div>

      {/* THUMBNAIL OVERLAY (Before First Play or Ended) */}
      {(!hasStarted || isEnded) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black cursor-pointer group/thumb">
          {finalPoster && (
            <img 
              src={finalPoster} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                // Fallback if hqdefault somehow fails
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
              }}
            />
          )}
          
          {/* Top Right Small Red Play Button */}
          <div className="absolute top-4 right-4 w-12 h-[34px] bg-red-600 rounded-lg flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover/thumb:scale-110 transition-transform duration-300 z-30">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      )}

      {/* PLAYBACK CONTROLS (Only when started and not ended) */}
      {hasStarted && !isEnded && (
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 pt-12 pb-1.5 transition-opacity duration-300 z-30 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => e.stopPropagation()} // Prevent playing/pausing when clicking controls
        >
          {/* Progress Bar Container */}
          <div 
            className="w-full h-1.5 bg-white/30 cursor-pointer relative group/progress transition-all duration-200 hover:h-2"
            onClick={handleProgressClick}
          >
            {/* Filled Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-red-600"
              style={{ width: `${progress}%` }}
            >
              {/* Scrubber Dot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isPlaying ? <Pause className="w-[18px] h-[18px] fill-white" /> : <Play className="w-[18px] h-[18px] fill-white" />}
              </button>

              {/* Volume/Mute */}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group/vol"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 fill-white" />}
              </button>

              {/* Time Display */}
              <div className="text-white text-[13px] font-medium tracking-wide font-sans">
                {formatTime(currentTime)} <span className="opacity-60 mx-0.5">/</span> {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">

              {/* Fullscreen */}
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-white/80 transition-colors"
              >
                <Maximize className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Center Action Feedback (Briefly shown when clicking video) */}
      {hasStarted && !isEnded && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 rounded-full flex items-center justify-center pointer-events-none transition-all duration-300 ${!isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
           <Pause className="w-8 h-8 text-white fill-white" />
        </div>
      )}
      </div>
    </div>
  );
}
