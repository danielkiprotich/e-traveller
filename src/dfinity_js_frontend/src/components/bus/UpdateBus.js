import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateBus = ({ bus, save }) => {
  const [capacity, setCapacity] = useState(0);
  const [driver, setDriver] = useState("");

  const isFormFilled = () => driver && capacity;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="rounded-pill btn btn-outline-secondary"
      >
        Update Bus <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Bus</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputCapacity"
              label="Capacity"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Capacity"
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDriver"
              label="Driver Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="driver name"
                onChange={(e) => {
                  setDriver(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                id: bus.id,
                driver,
                capacity,
              });
              handleClose();
            }}
          >
            Save bus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateBus.propTypes = {
  save: PropTypes.func.isRequired,
};

export default UpdateBus;
