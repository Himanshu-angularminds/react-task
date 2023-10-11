'use client';

import React from "react";

const DeleteConfirmationModal = ({
  show,
  handleClose,
  handleConfirmDelete,
  userId,
}) => {
  return (
    <div
      className={`modal ${show ? "show" : ""} mt-5`}
      tabIndex="-1"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Confirmation</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this user?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleConfirmDelete(userId);
                handleClose();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
