import React, { useState, useEffect, useRef } from 'react';
import brandAudio from '../assets/YouTube_Sparkle-Of-Heaven-Exquisite-Diamond-Jewe_Media_kYOP52BUZTI_009_128k.mp3';
import './MusicPlayer.css';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [showRestoreBtn, setShowRestoreBtn] = useState(false);
  const audioRef = useRef(new Audio(brandAudio));
  
  useEffect(() => {
    // Check if player was removed in this session
    const wasRemoved = sessionStorage.getItem('player_removed') === 'true';
    if (wasRemoved) {
      setIsRemoved(true);
      setShowRestoreBtn(true);
    }
  }, []);

  useEffect(() => {
    if (isRemoved) {
      audioRef.current.pause();
      setIsVisible(false);
      sessionStorage.setItem('player_removed', 'true');
      return;
    }
    
    const audio = audioRef.current;
    
    const handleLoop = () => {
      if (audio.currentTime >= 52) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener('timeupdate', handleLoop);

    // Initial play logic based on session storage
    const isManuallyPaused = sessionStorage.getItem('music_paused') === 'true';
    
    if (!isManuallyPaused) {
      const playAttempt = () => {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log("Autoplay blocked");
          });
      };
      playAttempt();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleLoop);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isRemoved]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      sessionStorage.setItem('music_paused', 'true');
    } else {
      audio.play();
      sessionStorage.setItem('music_paused', 'false');
    }
    setIsPlaying(!isPlaying);
  };

  const removePlayer = () => {
    if (window.confirm("Remove player? (It will reappear when you reload the page)")) {
      setIsRemoved(true);
    }
  };

  const restorePlayer = () => {
    setIsRemoved(false);
    setShowRestoreBtn(false);
    setCollapsed(false);
    sessionStorage.removeItem('player_removed');
    setIsVisible(true);
    setIsPlaying(false);
  };

  if (!isVisible && !showRestoreBtn) return null;

  // Show restore button when player is removed
  if (isRemoved && showRestoreBtn) {
    return (
      <button 
        className="restore-player-btn"
        onClick={restorePlayer}
        title="Restore Music Player"
      >
        🎵 Restore Player
      </button>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={`music-player-popup ${isPlaying ? 'playing' : 'paused'} ${collapsed ? 'collapsed' : ''}`}>
      {collapsed ? (
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
          <div className="music-info">
            <div className="music-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <span>Ambient Mood</span>
          </div>
          
          <div className="music-controls">
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
