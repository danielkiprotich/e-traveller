import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";

const Ticket = ({ ticket, remove }) => {
  const { id, busId, date, time, from, to, userId, cost } = ticket;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column">
          <Stack>
            <Card.Text className="flex-grow-1 ">
              From: {from} to: {to}
            </Card.Text>
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">busId: {busId}</Card.Text>
          <Card.Text className="flex-grow-1 ">Date: {date}</Card.Text>
          <Card.Text className="flex-grow-1 ">Time: {time}</Card.Text>
          <Card.Text className="flex-grow-1 ">userId: {userId}</Card.Text>
          <Card.Text className="flex-grow-1 ">Cost: {Number(cost)}</Card.Text>

          <button
            onClick={() => remove(id)}
            className="btn btn-outline-danger w-100 py-3 mb-3"
          >
            Delete Ticket
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Ticket.propTypes = {
  ticket: PropTypes.instanceOf(Object).isRequired,
};

export default Ticket;
