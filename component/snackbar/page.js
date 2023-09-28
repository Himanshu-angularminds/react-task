import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const Snackbar = ({ result, onClose }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  useEffect(() => {
    if (result.success) {
      setMessage(result.message);
      setVariant('success');
    } else {
      setMessage(result.error);
      setVariant('danger');
    }
    setShowSnackbar(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 4000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [result]);

  const handleClose = () => {
    setShowSnackbar(false);
    onClose();
  };

  return (
    <Toast show={showSnackbar} onClose={handleClose} bg={variant} text="white">
      <Toast.Header>
        <strong className="mr-auto">{variant === 'success' ? 'Success' : 'Error'}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Snackbar;
