import './App.css'
import React, { useState, useEffect } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'
import FuturisticOverlay from './components/FuturisticOverlay'
import { portfolioData } from './data/portfolioData'
import RoomOverlay from './components/RoomOverlay';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAppFullscreen, setIsAppFullscreen] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('/roombg3-ed.png')
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayType, setOverlayType] = useState(null)
  
  // Reference to the app container for fullscreen functionality
  const appContainerRef = React.useRef(null)
  
  // Function to toggle fullscreen mode for the entire app
  const toggleAppFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (appContainerRef.current.requestFullscreen) {
        appContainerRef.current.requestFullscreen();
      } else if (appContainerRef.current.webkitRequestFullscreen) {
        appContainerRef.current.webkitRequestFullscreen();
      } else if (appContainerRef.current.msRequestFullscreen) {
        appContainerRef.current.msRequestFullscreen();
      }
      setIsAppFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsAppFullscreen(false);
    }
  }
  
  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsAppFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const commands = {
    help: 'Available commands: help, clear, whoami, about, skills, experience, projects',
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
    <div className={`app-container ${isAppFullscreen ? 'app-fullscreen' : ''}`} ref={appContainerRef}>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
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
            onClick={toggleAppFullscreen}
            title={isAppFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isAppFullscreen ? '⤢' : '⤢'}
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
                  welcomeMessage="Welcome to my portfolio! Type 'help' to get a full list of commands.\n"
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
        </>
      )}
    </div>
  )
}

export default App
