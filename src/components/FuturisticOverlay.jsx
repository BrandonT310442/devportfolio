import React, { useState, useRef } from 'react';
import './FuturisticOverlay.css';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const FuturisticOverlay = ({ isVisible, onClose, type, content }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlePreviousProject = () => {
    if (type === 'projects' && currentProjectIndex > 0) {
      setCurrentProjectIndex(prev => prev - 1);
      scrollToProject(currentProjectIndex - 1);
    }
  };

  const handleNextProject = () => {
    if (type === 'projects' && currentProjectIndex < content.length - 1) {
      setCurrentProjectIndex(prev => prev + 1);
      scrollToProject(currentProjectIndex + 1);
    }
  };

  const scrollToProject = (index) => {
    if (carouselRef.current) {
      const projectCard = carouselRef.current.children[index];
      if (projectCard) {
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
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
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
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
            <div className="project-carousel" ref={carouselRef}>
              <button 
                className="carousel-nav prev" 
                onClick={handlePreviousProject}
                style={{ visibility: currentProjectIndex > 0 ? 'visible' : 'hidden' }}
              >
                ‹
              </button>
              {content.map((project, index) => (
                <div key={index} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                className="carousel-nav next" 
                onClick={handleNextProject}
                style={{ visibility: currentProjectIndex < content.length - 1 ? 'visible' : 'hidden' }}
              >
                ›
              </button>
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