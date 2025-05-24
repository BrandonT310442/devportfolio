import React, { useState, useRef, useEffect } from 'react';
import './FuturisticOverlay.css';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faJava, faReact, faNodeJs, faAws, faGit, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faServer, faDatabase, faCode } from '@fortawesome/free-solid-svg-icons';

// Map skill names to Font Awesome icons
const skillIconMap = {
  // Languages
  'JavaScript': faJs,
  'Python': faPython,
  'Java': faJava,
  'C++': faCode,
  
  // Frameworks & Libraries
  'React': faReact,
  'Node.js': faNodeJs,
  'Express': faServer,
  'Django': faCode,
  
  // Tools & Technologies
  'Git': faGit,
  'Docker': faDocker,
  'AWS': faAws,
  'MongoDB': faDatabase
};

const FuturisticOverlay = ({ isVisible, onClose, type, content }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const carouselRef = useRef(null);

  // Reset current project index when overlay is closed
  useEffect(() => {
    if (!isVisible) {
      setCurrentProjectIndex(0);
    }
  }, [isVisible]);

  const handlePreviousProject = () => {
    if (type === 'projects') {
      if (currentProjectIndex > 0) {
        setCurrentProjectIndex(prev => prev - 1);
      } else {
        // Loop to the end if at the beginning
        setCurrentProjectIndex(content.length - 1);
      }
    }
  };

  const handleNextProject = () => {
    if (type === 'projects') {
      if (currentProjectIndex < content.length - 1) {
        setCurrentProjectIndex(prev => prev + 1);
      } else {
        // Loop to the beginning if at the end
        setCurrentProjectIndex(0);
      }
    }
  };

  const goToProject = (index) => {
    setCurrentProjectIndex(index);
  };

  useKeyboardNavigation(isVisible, onClose, type, handlePreviousProject, handleNextProject);

  if (!isVisible) return null;

  const renderContent = () => {
    switch (type) {
      case 'item-detail':
        return (
          <div className="item-detail-content">
            <h2>{content.title}</h2>
            <p className="item-description">{content.description}</p>
            <div className="item-details">
              <ul>
                {content.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="about-content">
            <div className="profile-picture-placeholder" style={{ backgroundImage: 'url(/portfolio.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <h2>About Me</h2>
            <div className="bio-text">
              {content.bio}
            </div>
            <div className="interests">
              <h3>Interests</h3>
              <ul>
                {content.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="skills-content">
            <h2>Skills</h2>
            {Object.entries(content).map(([category, skills]) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-icon">
                        {skillIconMap[skill.name] ? (
                          <FontAwesomeIcon 
                            icon={skillIconMap[skill.name]} 
                            size="2x" 
                            title={skill.name} 
                          />
                        ) : (
                          <span className="fallback-icon">{skill.icon}</span>
                        )}
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="experience-content">
            <h2>Work Experience</h2>
            <div className="timeline">
              {content.map((job, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">{job.date}</div>
                  <div className="timeline-content">
                    <h3>{job.company}</h3>
                    <h4>{job.role}</h4>
                    <ul>
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="projects-content">
            <h2>Projects</h2>
            <div className="project-carousel-container">
              <button 
                className="carousel-nav prev" 
                onClick={handlePreviousProject}
              >
                ‹
              </button>
              <div className="project-carousel" ref={carouselRef}>
                {content.length > 0 && (
                  <div className="project-card" key={currentProjectIndex}>
                    <div className="project-image-placeholder">
                      <div className="placeholder-text">Project Image</div>
                    </div>
                    <h3>{content[currentProjectIndex].name}</h3>
                    <p>{content[currentProjectIndex].description}</p>
                    <div className="tech-stack">
                      {content[currentProjectIndex].techStack.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="carousel-nav next" 
                onClick={handleNextProject}
              >
                ›
              </button>
              
              <div className="carousel-indicators">
                {content.map((_, index) => (
                  <button 
                    key={index} 
                    className={`indicator-dot ${index === currentProjectIndex ? 'active' : ''}`}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        // Navigation instructions overlay
        if (type === 'navigation') {
          return (
            <div className="about-content">
              <h2>How to Navigate</h2>
              <div className="bio-text" style={{textAlign: 'left'}}>
                <ul style={{lineHeight: '2'}}>
                  <li><b>Welcome</b> to my room below are instructions for how to navigate it!</li>
                  <li><b>Recommendation </b> For the best experience view this website in full screen by clicking the button on the top right.</li>
                  <li><b>If you are on a mobile device view this website in landscape mode. </b></li>

                  <li><b>1. Click Login</b> to access the interactive terminal and more features.</li>
                  <li><b>2. Use the terminal</b> to type commands like <code>about</code>, <code>skills</code>, <code>experience</code>, <code>projects</code>.</li>
                  <li><b>3. Explore the room:</b> Click on the glowing particles on various items in the room ie. the Raptors Jersey, Xbox etc. to discover more about me.</li>
          
               
                </ul>
                <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
                </div>
              </div>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className={`futuristic-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="overlay-content">
        <button 
          className="close-button" 
          onClick={onClose} 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1'
          }}
        >
          ×
        </button>
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FuturisticOverlay;