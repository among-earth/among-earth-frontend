import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Canvas = ({ paths }) => {
  const canvasRef = useRef(null);

  // draw travel로 이동시켜주기
  const draw  = (canvas, ctx, paths, frameCount) => {
    const img = new Image();
    img.src = paths[frameCount];
    let scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 640;
    let frameCount = 0;
    let animationFrameId;
    let stop = false;
    let interval, now, newtime, then, elapsed;

    function startAnimating(fps) {
      interval = 1000 / fps;
      then = window.performance.now();
      render(newtime);
    }

    const render = (newtime) => {
      if(stop) return;
      now = newtime;
      elapsed = now - then;

      if (elapsed > interval) {
        then = now - (elapsed % interval);
        context.clearRect(0, 0, 640, 640);
        frameCount++;

        draw(canvas, context, paths, frameCount);

        if(frameCount === paths.length - 1) frameCount = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    startAnimating(8);
    // render();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [paths]);

  return (
    <CanvasWrapper ref={canvasRef}></CanvasWrapper>
  );
};

const CanvasWrapper = styled.canvas`
  width: 640px;
  height: 640px;
`;

export default Canvas;

Canvas.propTypes = {
  paths: PropTypes.array.isRequired,
  // draw: PropTypes.func.isRequired,
};
