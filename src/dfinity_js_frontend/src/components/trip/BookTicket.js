import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";

const BookTicket = ({ trip, book, available }) => {
  const [userId, setUserId] = useState("");

  const isFormFilled = () => userId;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        disabled={available}
        onClick={handleShow}
        className="btn btn-outline-info"
      >
        Book Ticket <i className="bi bi-pen-fill"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Stack>
            <Modal.Title>Book Ticket</Modal.Title>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUserId"
              label="UserId"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="userId"
                onChange={(e) => {
                  setUserId(e.target.value);
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
              book({
                userId: userId.trim(),
                tripId: trip.id,
              });
              handleClose();
            }}
          >
            Book Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

BookTicket.propTypes = {
  book: PropTypes.func.isRequired,
};

export default BookTicket;
