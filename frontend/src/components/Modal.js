import React from 'react'
import { Modal } from "react-bootstrap";

const ModalComponent = (props) => {
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.component}
      </Modal.Body>
    </Modal>
  )
}

export default ModalComponent;