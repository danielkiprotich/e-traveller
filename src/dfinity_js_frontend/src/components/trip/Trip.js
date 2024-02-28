import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack, Badge } from "react-bootstrap";
import UpdateTrip from "./UpdateTrip";
import { Link } from "react-router-dom";
import BookTicket from "./BookTicket";

const Trip = ({ trip, update, book }) => {
  const { id, busId, date, time, from, to, via, availableSeats, cost } = trip;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column">
          <Stack>
            <Card.Text className="flex-grow-1 ">
              From: {from} to: {to}
            </Card.Text>
            <Badge bg="secondary" className="ms-auto">
              {Number(availableSeats)} seats
            </Badge>
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">busId: {busId}</Card.Text>
          <Card.Text className="flex-grow-1 ">Date: {date}</Card.Text>
          <Card.Text className="flex-grow-1 ">Time: {time}</Card.Text>
          <Card.Text className="flex-grow-1 ">via: {via}</Card.Text>
          <Card.Text className="flex-grow-1 ">Cost: {Number(cost)}</Card.Text>

          <div className="d-flex flex-column gap-2">
            <UpdateTrip trip={trip} save={update} />
            <BookTicket
              trip={trip}
              book={book}
              available={Number(availableSeats) < 1}
            />
            <Link
              to={`/tickets?type=trip&id=${id}`}
              className="btn btn-outline-dark w-100 py-3 mb-3"
            >
              View Tickets
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

Trip.propTypes = {
  trip: PropTypes.instanceOf(Object).isRequired,
};

export default Trip;
