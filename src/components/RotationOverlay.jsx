import React, { useState, useEffect } from 'react';
import './RotationOverlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMobile } from '@fortawesome/free-solid-svg-icons';

const RotationOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkDeviceAndOrientation = () => {
      // Check if device is mobile or tablet
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent) && window.innerWidth <= 1024;
      
      // Check if screen is in portrait mode
      const isPortrait = window.innerHeight > window.innerWidth;
      
      // Show overlay if it's a mobile/tablet device and in portrait mode
      if ((isMobile || isTablet) && isPortrait) {
        setShowOverlay(true);
      } else {
        setShowOverlay(false);
      }
    };

    // Check on initial load
    checkDeviceAndOrientation();

    // Add event listener for orientation change
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(checkDeviceAndOrientation, 100);
    });
    
    // Add event listener for resize (for tablets that might not trigger orientationchange)
    window.addEventListener('resize', checkDeviceAndOrientation);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('orientationchange', checkDeviceAndOrientation);
      window.removeEventListener('resize', checkDeviceAndOrientation);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div className="rotation-overlay">
      <div className="rotation-content">
        <div className="rotation-icon-container">
          <FontAwesomeIcon icon={faMobile} className="mobile-icon" />
        </div>
        <h2 className="rotation-title">Rotate Your Device</h2>
        <p className="rotation-message">
          Please rotate your device to landscape mode for the best experience
        </p>
        <div className="rotation-animation">
          <div className="phone-outline">
            <div className="phone-screen"></div>
          </div>
          <div className="arrow-indicator">→</div>
          <div className="phone-outline rotated">
            <div className="phone-screen"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotationOverlay;
