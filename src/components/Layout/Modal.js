import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ children, onClose, open }) => {
  const result = (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
  return result;
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Modal.defaultProps = {
  open: false,
};
