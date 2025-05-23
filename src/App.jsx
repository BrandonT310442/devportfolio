import './App.css'
import { useState } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const commands = {
    help: 'Available commands: help, clear, whoami',
    whoami: 'visitor@portfolio',
    clear: 'Terminal cleared'
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
      <div 
        className="background-image" 
        style={{
          backgroundImage: "url('/roombg3-ed.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%'
        }}
      />
      <div className="ambient-light" />
      {createParticles()}
      {!isLoggedIn ? (
        <div className="monitor-login-container">
          <button className="login-button" onClick={() => setIsLoggedIn(true)}><span>LOGIN</span></button>
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
              welcomeMessage="Welcome to my portfolio! Type 'help' to get a full list of commands.
              

              "
            />
          </TerminalContextProvider>
        </div>
      )}
    </div>
  )
}

export default App
