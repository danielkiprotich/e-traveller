import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Trip from "./Trip";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  createTrip,
  getTrips as getTripList,
  updateTrip,
} from "../../utils/trip";
import AddTrip from "./AddTrip";
import { createTicket } from "../../utils/ticket";
import NavBar from "../utils/NavBar";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of Trips
  const getTrips = useCallback(async () => {
    try {
      setLoading(true);
      setTrips(await getTripList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const save = async (data) => {
    try {
      setLoading(true);
      data.cost = parseInt(data.cost, 10);
      createTrip(data).then((resp) => {
        getTrips();
      });
      toast(<NotificationSuccess text="Trip added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a Trip." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      data.cost = parseInt(data.cost, 10);
      data.availableSeats = parseInt(data.availableSeats, 10);
      updateTrip(data).then((resp) => {
        getTrips();
      });
      toast(<NotificationSuccess text="Trip updated successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a Trip." />);
    } finally {
      setLoading(false);
    }
  };

  const book = async (data) => {
    try {
      setLoading(true);
      createTicket(data).then((resp) => {
        getTrips();
      });
      toast(<NotificationSuccess text="Trip booked successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to book a Trip." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="row">
            <NavBar title={"Trips listing"} />
            <div className=" ms-sm-auto px-md-4">
              <div className="d-flex mr-0 ml-auto justify-content-end align-items-end mb-4">
                <AddTrip save={save} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                {trips.map((_trip, index) => (
                  <Trip
                    key={index}
                    trip={{
                      ..._trip,
                    }}
                    update={update}
                    book={book}
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

export default Trips;
