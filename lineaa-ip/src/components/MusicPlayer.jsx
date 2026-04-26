import React, { useState, useEffect, useRef } from 'react';
import brandAudio from '../assets/YouTube_Sparkle-Of-Heaven-Exquisite-Diamond-Jewe_Media_kYOP52BUZTI_009_128k.mp3';
import './MusicPlayer.css';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef(new Audio(brandAudio));
  
  useEffect(() => {
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
  }, []);

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

  const closePlayer = () => {
    audioRef.current.pause();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`music-player-popup ${isPlaying ? 'playing' : 'paused'}`}>
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
        <button className="play-toggle" onClick={togglePlay}>
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
        <button className="close-player" onClick={closePlayer} title="Remove Player">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
