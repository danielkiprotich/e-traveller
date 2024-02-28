import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import UpdateBus from "./UpdateBus";
import { Link } from "react-router-dom";

const Bus = ({ bus, update }) => {
  const { id, driver, capacity, model, registration } = bus;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Card.Text className="flex-grow-1 "> Reg: {registration} </Card.Text>
        </Card.Header>
        <Card.Body className="d-flex  flex-column ">
          <Card.Text className="flex-grow-1 ">Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">Model: {model}</Card.Text>
          <Card.Text className="flex-grow-1">driver name: {driver}</Card.Text>
          <Card.Text className="flex-grow-1 ">
            capacity: {Number(capacity)} seats
          </Card.Text>
          <div className="d-flex flex-column gap-2">
            <UpdateBus bus={bus} save={update} />
            <Link
              to={`/tickets?type=bus&id=${id}`}
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

Bus.propTypes = {
  bus: PropTypes.instanceOf(Object).isRequired,
};

export default Bus;
