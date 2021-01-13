import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalPortal from './ModalPortal';
import { wooble } from './styles/keyframes';

import { MdReplay } from 'react-icons/md';

function Modal({
  children,
  isModalOpen,
  className,
  onClose,
}) {
  return (
    <ModalPortal elementId='modal'>
      <ModalOverlay visible={isModalOpen} />
      <ModalWrapper
        className={className}
        tabIndex={-1}
        isModalOpen={isModalOpen}
      >
        <ModalInner tabIndex={0} className='modal-inner'>
          <button className='modal-again' onClick={onClose}><MdReplay /></button>
           {children}
        </ModalInner>
      </ModalWrapper>
    </ModalPortal>
  );
}

const ModalOverlay = styled.div`
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => props.isModalOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  outline: none;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({theme}) => theme.orangeYellow};
  border-radius: 10px;
  width: 800px;
  max-width: 800px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .modal-again {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: none;
    font-size: 30px;
    color: ${({theme}) => theme.ivory};
    background-color: ${({theme}) => theme.coralRed};
    outline: none;
    cursor: pointer;
  }

  .modal-ok {
    width: 100px;
    cursor: pointer;
    text-align: center;
    background-color: ${({theme}) => theme.green};
    height: 50px;
    border-radius: 6px;
    color: ${({theme}) => theme.ivory};
    font-family: 'Limelight', cursive;
    font-size: 20px;
    margin-top: 30px;
    outline: none;
    cursor: pointer;

    &:hover {
      animation: ${wooble} 1s 1;
    }
  }
`;

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool,
  className: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
