import React from "react";
import { Container } from "react-bootstrap";
import { login } from "../utils/auth";
import Trips from "../components/trip/Trips";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/sandwich.jpg";
import { Notification } from "../components/utils/Notifications";

const TripsPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Trips />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default TripsPage;
