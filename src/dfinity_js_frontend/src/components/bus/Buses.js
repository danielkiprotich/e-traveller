import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddBus from "./AddBus";
import Bus from "./Bus";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getBuses as getBusList, createBus, updateBus } from "../../utils/bus";
import NavBar from "../utils/NavBar";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of buses
  const getBuses = useCallback(async () => {
    try {
      setLoading(true);
      setBuses(await getBusList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addBus = async (data) => {
    try {
      setLoading(true);
      data.capacity = parseInt(data.capacity, 10);
      createBus(data).then((resp) => {
        getBuses();
        toast(<NotificationSuccess text="Bus added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a bus." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      data.capacity = parseInt(data.capacity, 10);
      updateBus(data).then((resp) => {
        getBuses();
        toast(<NotificationSuccess text="Bus added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a bus." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="row">
            <NavBar title={"Bus Listings"} />
            <div className="ms-sm-auto px-md-4">
              <div className="d-flex mr-0 ml-auto justify-content-end align-items-end mb-4">
                <AddBus save={addBus} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                {buses.map((_bus, index) => (
                  <Bus
                    key={index}
                    bus={{
                      ..._bus,
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

export default Buses;
