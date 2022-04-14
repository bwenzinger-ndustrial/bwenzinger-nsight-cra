import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
  customStyles: PropTypes.object
};

const defaultStyles = {
  overlay: { zIndex: 1000, backgroundColor: 'hsl(0 0% 0% / 30%)' },
  content: {
    inset: '50px',
    padding: '15px 35px 40px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
};

ReactModal.setAppElement(document.getElementById('main'));

const Modal = ({
  className,
  title,
  isOpen,
  onRequestClose,
  children,
  customStyles
}) => {
  const styles = {
    ...defaultStyles,
    content: {
      ...defaultStyles.content,
      ...customStyles
    }
  };

  return (
    <ReactModal
      className={className}
      style={styles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <ModalHeader title={title} onCloseClick={() => onRequestClose()} />
      {children}
    </ReactModal>
  );
};

Modal.propTypes = propTypes;

export default Modal;
