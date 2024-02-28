import React from "react";
import { Container } from "react-bootstrap";
import { login } from "../utils/auth";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/sandwich.jpg";
import { Notification } from "../components/utils/Notifications";
import Users from "../components/user/Users";

const UsersPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Users />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default UsersPage;
