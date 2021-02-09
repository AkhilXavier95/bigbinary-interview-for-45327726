import React from "react";

import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ header, modalBody, className, ...props }) => {
  return (
    <Modal
      {...props}
      className={className}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {header && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{modalBody}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
