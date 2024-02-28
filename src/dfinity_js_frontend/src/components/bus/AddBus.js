import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddBus = ({ save }) => {
  const [registration, setRegistration] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [driver, setDriver] = useState("");

  const isFormFilled = () => driver && capacity && model && registration;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="rounded-pill btn btn-outline-success"
      >
        New <i className="bi ml-2 bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Bus</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputModel"
              label="Model"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Model"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </FloatingLabel>
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
              controlId="inputRegistration"
              label="Registration"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="registration"
                onChange={(e) => {
                  setRegistration(e.target.value);
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
                driver,
                capacity,
                registration,
                model,
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

AddBus.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddBus;
