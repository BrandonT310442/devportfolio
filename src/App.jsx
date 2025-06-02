import './App.css'
import React, { useState } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'
import FuturisticOverlay from './components/FuturisticOverlay'
import { portfolioData } from './data/portfolioData'
import RoomOverlay from './components/RoomOverlay';
import LoadingScreen from './components/LoadingScreen';
import RotationOverlay from './components/RotationOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('/roombg3-ed.png')
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayType, setOverlayType] = useState(null)
  const [showNavOverlay, setShowNavOverlay] = useState(false)
  
  // Function to show the navigation overlay
  const showInfoOverlay = () => {
    setOverlayType('navigation')
    setOverlayVisible(true)
  }

  const commands = {
    help: 'Available commands: help, clear, whoami, about, skills, experience, projects, contact',
    whoami: 'visitor@portfolio',
    clear: 'Terminal cleared',
    about: () => {
      setOverlayType('about')
      setOverlayVisible(true)
      return 'Loading about me...'
    },
    skills: () => {
      setOverlayType('skills')
      setOverlayVisible(true)
      return 'Loading skills...'
    },
    experience: () => {
      setOverlayType('experience')
      setOverlayVisible(true)
      return 'Loading work experience...'
    },
    projects: () => {
      setOverlayType('projects')
      setOverlayVisible(true)
      return 'Loading projects...'
    },
    contact: () => {
      setOverlayType('contact')
      setOverlayVisible(true)
      return 'Loading contact...'
    }
  }
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i <15; i++) {
      // Create more varied movement patterns
      const endX = (Math.random() * 2 - 1) * window.innerWidth;
      const endY = (Math.random() * 2 - 1) * window.innerHeight;
      
      // Ensure each particle has different starting positions and animation properties
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            '--end-x': `${endX}px`,
            '--end-y': `${endY}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="app-container">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => {
          setIsLoading(false);
          setShowNavOverlay(true);
        }} />
      ) : (
        <>
          {showNavOverlay && (
            <FuturisticOverlay
              isVisible={showNavOverlay}
              onClose={() => setShowNavOverlay(false)}
              type="navigation"
            />
          )}
          <RoomOverlay onButtonClick={(name) => alert(`Clicked: ${name}`)} />
          <div 
            className="background-image" 
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '100%',
              width: '100%'
            }}
          />
          <div className="ambient-light" />
          {createParticles()}
          
          <button 
            className="app-fullscreen-toggle" 
            onClick={showInfoOverlay}
            title="How to Navigate"
          >
            <FontAwesomeIcon icon={faInfo} />
          </button>
          {!isLoggedIn ? (
            <div className="monitor-login-container">
              <button className="login-button" onClick={() => {
                setIsLoggedIn(true);
                setBackgroundImage('/roombg3.png');
              }}><span>LOGIN</span></button>
            </div>
          ) : (
            <div className={`terminal-container ${isFullscreen ? 'fullscreen' : ''}`}>
              <button className="toggle-fullscreen" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? '⤢' : '⤢'}
              </button>
              <TerminalContextProvider>
                <ReactTerminal
                  commands={commands}
                  theme="dracula"
                  showControlBar={false}
                  prompt="visitor@portfolio $"
                  welcomeMessage="Welcome to my portfolio! Type 'help' for commands.
                  
                  
                  "
                />
              </TerminalContextProvider>
            </div>
          )}
          <FuturisticOverlay
            isVisible={overlayVisible}
            onClose={() => setOverlayVisible(false)}
            type={overlayType}
            content={overlayType ? portfolioData[overlayType] : null}
          />
          <RotationOverlay />
        </>
      )}
    </div>
  )
}

export default App
