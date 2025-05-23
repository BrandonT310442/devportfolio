import React, { useState, useRef, useEffect } from 'react';
import './FuturisticOverlay.css';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

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
      case 'about':
        return (
          <div className="about-content">
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
                      <img src={skill.logo} alt={skill.name} className="skill-logo" />
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
        return null;
    }
  };

  return (
    <div className={`futuristic-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FuturisticOverlay;