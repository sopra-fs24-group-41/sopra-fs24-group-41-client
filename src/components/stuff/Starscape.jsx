import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import gsap from "gsap";

<<<<<<< HEAD

const Starscape = ({ densityRatio = 0.5, sizeLimit = 5, defaultAlpha = 0.2, scaleLimit = 2, proximityRatio = 0.1 })  => {
=======
const Starscape = ({ densityRatio = 0.5, sizeLimit = 5, defaultAlpha = 0.2, scaleLimit = 2, proximityRatio = 0.1 }) => {
>>>>>>> 41db1a8191ea18e2075615ae73f96e545910303c
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const starsRef = useRef(null);
  const vminRef = useRef(null);
  const scaleMapperRef = useRef(null);
  const alphaMapperRef = useRef(null);

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");

<<<<<<< HEAD
  const LOAD = () => {
    // Update vminRef
    vminRef.current = Math.min(window.innerHeight, window.innerWidth);
    const STAR_COUNT = Math.floor(vminRef.current * densityRatio);
    // Update scaleMapperRef and alphaMapperRef
    scaleMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, scaleLimit, 1);
    alphaMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, 1, defaultAlpha);
    // Update canvas dimensions
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    starsRef.current = new Array(STAR_COUNT).fill().map(() => ({
      x: gsap.utils.random(0, window.innerWidth, 1),
      y: gsap.utils.random(0, window.innerHeight, 1),
      size: gsap.utils.random(1, sizeLimit, 1),
      scale: 1,
      alpha: gsap.utils.random(0.1, defaultAlpha, 0.1),
    }));
  };
=======
    const LOAD = () => {
      vminRef.current = Math.min(window.innerHeight, window.innerWidth);
      const STAR_COUNT = Math.floor(vminRef.current * densityRatio);
      scaleMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, scaleLimit, 1);
      alphaMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, 1, defaultAlpha);
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      starsRef.current = new Array(STAR_COUNT).fill().map(() => ({
        x: gsap.utils.random(0, window.innerWidth, 1),
        y: gsap.utils.random(0, window.innerHeight, 1),
        size: gsap.utils.random(1, sizeLimit, 1),
        scale: 1,
        alpha: gsap.utils.random(0.1, defaultAlpha, 0.1),
      }));
    };
>>>>>>> 41db1a8191ea18e2075615ae73f96e545910303c

    const RENDER = () => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      starsRef.current.forEach(star => {
        contextRef.current.fillStyle = `hsla(0, 100%, 100%, ${star.alpha})`;
        contextRef.current.beginPath();
        contextRef.current.arc(star.x, star.y, (star.size / 2) * star.scale, 0, Math.PI * 2);
        contextRef.current.fill();
      });
    };

    const UPDATE = ({ x, y }) => {
      starsRef.current.forEach(STAR => {
        const DISTANCE = Math.sqrt(Math.pow(STAR.x - x, 2) + Math.pow(STAR.y - y, 2));
        gsap.to(STAR, {
          scale: scaleMapperRef.current(Math.min(DISTANCE, vminRef.current * proximityRatio)),
          alpha: alphaMapperRef.current(Math.min(DISTANCE, vminRef.current * proximityRatio)),
        });
      });
    };

    LOAD();
    gsap.ticker.fps(24);
    gsap.ticker.add(RENDER);

    // Set up event handling
    window.addEventListener("resize", LOAD);
    document.addEventListener("pointermove", UPDATE);

    return () => {
      window.removeEventListener("resize", LOAD);
      document.removeEventListener("pointermove", UPDATE);
      gsap.ticker.remove(RENDER);
    };
  }, []);

<<<<<<< HEAD
  return <canvas ref={canvasRef} id="stars" />
=======
  return <canvas ref={canvasRef} id="stars" />;
>>>>>>> 41db1a8191ea18e2075615ae73f96e545910303c
};

// Define prop types for the Starscape component
Starscape.propTypes = {
  densityRatio: PropTypes.number,
  sizeLimit: PropTypes.number,
  defaultAlpha: PropTypes.number,
  scaleLimit: PropTypes.number,
  proximityRatio: PropTypes.number,
};

export default Starscape;