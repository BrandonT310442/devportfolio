import { useEffect } from 'react';

export const useKeyboardNavigation = (isVisible, onClose, type, onPrevious, onNext) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isVisible) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (type === 'projects' && onPrevious) {
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (type === 'projects' && onNext) {
            onNext();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, onClose, type, onPrevious, onNext]);
};