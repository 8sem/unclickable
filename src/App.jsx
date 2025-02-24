import React, { useState, useRef, useEffect } from 'react';

const MovableButton = ({ children, maxX, maxY }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 }); // Store initial position

  useEffect(() => {
    // Calculate and set initial position after the button renders
    if (buttonRef.current && maxX && maxY) {  //check if ref and max values are available
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;
      const centerX = (maxX - buttonWidth) / 2;
      const centerY = (maxY - buttonHeight) / 2;
      setInitialPosition({ x: centerX, y: centerY });
      setPosition({ x: centerX, y: centerY }); // Set initial position
    }
  }, [maxX, maxY]); // Run when maxX or maxY changes (window resize)


  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    const buttonWidth = buttonRef.current.offsetWidth;
    const buttonHeight = buttonRef.current.offsetHeight;

    const availableWidth = maxX - buttonWidth;
    const availableHeight = maxY - buttonHeight;

    const randomX = Math.max(0, Math.min(availableWidth, Math.random() * availableWidth));
    const randomY = Math.max(0, Math.min(availableHeight, Math.random() * availableHeight));

    setPosition({ x: randomX, y: randomY });
  };

  return (
    <button
      ref={buttonRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transition: 'none',
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </button>
  );
};

const App = () => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden', // Prevent scrolling
        border: '1px solid black',
      }}
    >
      <MovableButton maxX={containerSize.width} maxY={containerSize.height}>
        Try Clicking Me!
      </MovableButton>
    </div>
  );
};

export default App;