import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Canvas = ({ paths }) => {
  const canvasRef = useRef(null);

  // draw travel로 이동시켜주기
  const draw  = (ctx, paths, frameCount) => {
    const img = new Image();
    img.src = paths[frameCount];
    ctx.drawImage(img, 0, 0, 300, 300);
    // ctx.clearRect(0, 0, 640, 640);
    // ctx.fillStyle = '#000';
    // ctx.beginPath();
    // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    // ctx.fill();
  };

  useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let frameCount = 0;
      let animationFrameId;

      const render = () => {
        frameCount++;
        
        draw(context, paths, frameCount, animationFrameId);

        animationFrameId = window.requestAnimationFrame(render);
      };

      render();
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }, [paths]);

  return (
    <canvas ref={canvasRef}></canvas>
  );
};

export default Canvas;

Canvas.propTypes = {
  paths: PropTypes.array.isRequired,
  // draw: PropTypes.func.isRequired,
};

// original
// useEffect(() => {
//   const canvas = canvasRef.current;
//   const context = canvas.getContext('2d');
//   let frameCount = 0;
//   let animationFrameId;

//   const render = () => {
//     frameCount++;

//     draw(context, paths, frameCount, animationFrameId);

//     animationFrameId = window.requestAnimationFrame(render);
//   };

//   render();
//   return () => {
//     window.cancelAnimationFrame(animationFrameId);
//   };
// }, [paths]);
