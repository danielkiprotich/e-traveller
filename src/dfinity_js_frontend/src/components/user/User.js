import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";

const User = ({ user, update }) => {
  const { id, name, email, phone, address } = user;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex flex-column">
          <Stack>
            <Card.Title className="flex-grow-1 ">Name: {name}</Card.Title>
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">Phone: {phone}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text className="flex-grow-1 ">Address: {address}</Card.Text>
          
          <div className="d-flex flex-column gap-2">
            <UpdateUser user={user} save={update} />
            <Link
              to={`/tickets?type=user&id=${id}`}
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

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default User;
