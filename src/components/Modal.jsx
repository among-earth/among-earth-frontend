import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalPortal from './ModalPortal';
import { GrFormClose } from 'react-icons/gr';

function Modal({
  children,
  onClose,
  maskClosable,
  closable,
  isModalOpen,
  className,
}) {
  useEffect(() => {
    console.log(isModalOpen)
  }, [])


  const onMaskClick = e => {
    console.log(e)
    if (e.target === e.crrentTarget) {
      onClose(e);
    }
  };

  const close = e => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <ModalPortal elementId='modal'>
      <ModalOverlay visible={isModalOpen} />
      <ModalWrapper
        className={className}
        tabIndex={-1}
        isModalOpen={isModalOpen}
      >
        <ModalInner tabIndex={0} className='modal-inner'>
          {closable &&
            <>
            <button className='modal-close' onClick={onClose}>다시 할래요</button>
            </>
          }
          {children}
        </ModalInner>
      </ModalWrapper>
    </ModalPortal>
  );
}

const ModalOverlay = styled.div`
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
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
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 500px;
  max-width: 600px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  className: PropTypes.node,
};
