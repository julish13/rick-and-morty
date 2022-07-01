import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ children, onClose, open = false }) => {
  const result = (
    <Dialog open={open} onClose={onClose} scroll="paper">
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 2,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: 0 }} dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
  return result;
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
