import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddUser from "./AddUser";
import User from "./User";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getUsers as getUserList,
  createUser,
  updateUser,
} from "../../utils/user";
import NavBar from "../utils/NavBar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of users
  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      setUsers(await getUserList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const save = async (data) => {
    try {
      setLoading(true);
      createUser(data).then((resp) => {
        getUsers();
      });
      toast(<NotificationSuccess text="User added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a user." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      updateUser(data).then((resp) => {
        getUsers();
      });
      toast(<NotificationSuccess text="User added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a user." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="row">
            <NavBar title={"User Listings"} />
            <div className=" ms-sm-auto  px-md-4">
              <div className="d-flex mr-0 ml-auto justify-content-end align-items-end mb-4">
                <AddUser save={save} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                {users.map((_user, index) => (
                  <User
                    key={index}
                    user={{
                      ..._user,
                    }}
                    update={update}
                  />
                ))}
              </Row>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Users;
