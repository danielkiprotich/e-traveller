import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateTrip = ({ trip, save }) => {
  const [busId, setBusId] = useState(trip.busId);
  const [date, setDate] = useState(trip.date);
  const [time, setTime] = useState(trip.time);
  const [cost, setCost] = useState(Number(trip.cost));
  const [from, setFrom] = useState(trip.from);
  const [to, setTo] = useState(trip.to);
  const [via, setVia] = useState(trip.via);

  const [show, setShow] = useState(false);

  const isFormFilled = () => busId && date && time && cost && from && to && via;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="rounded-pill  btn btn-outline-secondary">
        Update Trip<i className="bi bi-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Trip</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputBusId"
              label="BusId"
              className="mb-3"
            >
              <Form.Control
                type="test"
                placeholder="busId"
                onChange={(e) => {
                  setBusId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputFrom" label="From" className="mb-3">
              <Form.Control
                type="text"
                placeholder="From"
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputTo" label="To" className="mb-3">
              <Form.Control
                type="text"
                placeholder="To"
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputVia"
              label="Hypens per Via town"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Via hyphen separated"
                onChange={(e) => {
                  setVia(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputCost" label="Cost" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Cost"
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputDate" label="Date" className="mb-3">
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputTime" label="Time" className="mb-3">
              <Form.Control
                type="time"
                placeholder="Time"
                onChange={(e) => {
                  setTime(e.target.value);
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
                id: trip.id,
                busId: busId.trim(),
                date,
                time,
                cost,
                from,
                to,
                via,
              });
              handleClose();
            }}
          >
            Save Trip
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateTrip.propTypes = {
  save: PropTypes.func.isRequired,
};

export default UpdateTrip;
