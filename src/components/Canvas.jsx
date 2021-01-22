import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { wooble } from './styles/keyframes';
import { sendBlobImage } from '../utils/api';
import { ROUTES } from '../constants';

function Canvas({ paths, travelId, points }) {
  const history = useHistory();
  const canvasRef = useRef(null);

  const draw  = (canvas, context, paths, frameCount) => {
    const img = new Image();

    img.setAttribute('crossorigin', 'anonymous');
    img.src = paths[frameCount];

    let scale = Math.max(canvas.width / img.width, canvas.height / img.height);

    context.drawImage(img, 0, 0, img.width * scale, img.height * scale);
  };

  const saveImage = ev => {
    ev.preventDefault();

    sendBlobImage(canvasRef, travelId, points);
    history.push(ROUTES.TRAVELS);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = 750;
    canvas.height = 750;

    let frameCount = 0;
    let animationFrameId;
    let interval, now, newtime, then, elapsed;

    const startAnimating = fps => {
      interval = 1000 / fps;
      then = window.performance.now();
      render(newtime);
    };

    const render = newtime => {
      now = newtime;
      elapsed = now - then;

      if (elapsed > interval) {
        then = now - (elapsed % interval);
        context.clearRect(0, 0, canvas.width, canvas.height);
        frameCount++;

        draw(canvas, context, paths, frameCount);

        if(frameCount === paths.length - 1) frameCount = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    startAnimating(20);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [paths]);

  return (
    <>
      <CanvasContainer>
        <canvas ref={canvasRef}></canvas>
      </CanvasContainer>
      <SaveButton type='button' wooble onClick={ev => saveImage(ev)}value={points}>Finish Travel!</SaveButton>
    </>
  );
}

const CanvasContainer = styled.div`
margin-top: 80px;
  border-radius: 20px;
  overflow: hidden;
`;

const SaveButton = styled.button`
  width: 200px;
  cursor: pointer;
  text-align: center;
  background-color: ${({theme}) => theme.orangeYellow};
  height: 50px;
  border-radius: 6px;
  color: ${({theme}) => theme.black};
  font-family: 'Limelight', cursive;
  border: none;
  font-size: 20px;
  margin-top: 20px;
  outline: none;

  &:hover {
    animation: ${wooble} 1s 1;
  }
`;

export default memo(Canvas);

Canvas.propTypes = {
  paths: PropTypes.array.isRequired,
  travelId: PropTypes.string.isRequired,
  points: PropTypes.array.isRequired,
};
