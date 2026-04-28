import React, { useState, useEffect, useRef } from 'react';
import brandAudio from '../assets/YouTube_Sparkle-Of-Heaven-Exquisite-Diamond-Jewe_Media_kYOP52BUZTI_009_128k.mp3';
import './MusicPlayer.css';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const audioRef = useRef(new Audio(brandAudio));

  // 🔊 Handle autoplay + loop
  useEffect(() => {
    const audio = audioRef.current;

    const handleLoop = () => {
      if (audio.currentTime >= 52) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener('timeupdate', handleLoop);

    // Try autoplay (will fail silently if blocked)
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => console.log("Autoplay blocked"));

    return () => {
      audio.removeEventListener('timeupdate', handleLoop);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // ▶️ Play / Pause
  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // ❌ Remove player (only for current session)
  const removePlayer = () => {
    setIsVisible(false);
  };

  // 🛑 If removed → don't render
  if (!isVisible) return null;

  return (
    <div
      className={`music-player-popup ${isPlaying ? 'playing' : 'paused'} ${collapsed ? 'collapsed' : ''}`}
    >
      {collapsed ? (
        // 🔵 Mini Circle Mode
        <button
          className="mini-btn"
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(false);
          }}
          title="Expand Player"
        >
          ▶
        </button>
      ) : (
        <>
          {/* 🎵 Info */}
          <div className="music-info">
            <div className="music-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <span>Ambient Mood</span>
          </div>

          {/* 🎛 Controls */}
          <div className="music-controls">
            {/* ▶️ Play/Pause */}
            <button
              className="play-toggle"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* 🔽 Collapse */}
            <button
              className="collapse-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed(true);
              }}
              title="Collapse Player"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ❌ Remove */}
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removePlayer();
              }}
              title="Remove Player (reappears on reload)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MusicPlayer;