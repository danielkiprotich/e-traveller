import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import Ticket from "./Ticket";
import { Container, Row } from "react-bootstrap";
import { getTickets as getTicketList } from "../../utils/ticket";
import { deleteTicket } from "../../utils/ticket";
import NavBar from "../utils/NavBar";

const Tickets = () => {
  const [fetches, setFetches] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  const id = urlParams.get("id");

  // function to get the list of tickets
  const getTickets = useCallback(async () => {
    try {
      setLoading(true);
      const ticketsList = await getTicketList();
      setFetches(ticketsList);
      setTicketsByType(ticketsList);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  // set tickets depending on type, if user, get userId tickets, if bus, get busId tickets, if bus, get busId tickets
  const setTicketsByType = async (allTickets) => {
    try {
      if (type === "user") {
        setTickets(allTickets.filter((ticket) => ticket.userId === id));
      } else if (type === "bus") {
        setTickets(allTickets.filter((ticket) => ticket.busId === id));
      } else if (type === "trip") {
        setTickets(allTickets.filter((ticket) => ticket.tripId === id));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  // search tickets array for a ticket by date, from, to lowercase
  const searchTickets = async () => {
    const search = prompt.toLowerCase();
    console.log(search);
    try {
      setLoading(true);
      let filteredTickets = fetches.filter(
        (ticket) =>
          (ticket.date && ticket.date.toLowerCase().includes(search)) ||
          (ticket.from && ticket.from.toLowerCase().includes(search)) ||
          (ticket.to && ticket.to.toLowerCase().includes(search)) ||
          (ticket.via && ticket.via.toLowerCase().includes(search))
      );
      setTicketsByType(filteredTickets);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  // delete ticket
  const remove = async (id) => {
    try {
      setLoading(true);
      deleteTicket(id).then((resp) => {
        getTickets();
      });
      toast(<NotificationSuccess text="Ticket Deleted successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to delete ticket." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <Container fluid="md">
        {!loading ? (
          <>
            <div className="row">
              <NavBar title={"Tickets Listings"} />
              <div className=" ms-sm-auto px-md-4">
                <div className="d-flex mr-0 ml-auto justify-content-end align-items-end mb-4">
                  <div className="form-inline d-flex gap-4">
                    <input
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={(e) => {
                        setPrompt(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-outline-success my-2 my-sm-0"
                      onClick={() => {
                        searchTickets();
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                  {tickets.map((_ticket, index) => (
                    <Ticket
                      key={index}
                      ticket={{
                        ..._ticket,
                      }}
                      remove={remove}
                    />
                  ))}
                </Row>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
};

export default Tickets;
