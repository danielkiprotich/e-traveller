// Import necessary modules and libraries from the Azle framework and UUID for generating unique identifiers.
import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  nat64,
  Result,
  Canister,
} from "azle";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

// Define record structure for Bus
const Bus = Record({
  id: text,
  registration: text,
  model: text,
  capacity: nat64,
  driver: text,
});

// Define payload structure for creating bus
const BusPayload = Record({
  registration: text,
  model: text,
  capacity: nat64,
  driver: text,
});

// Define payload structure for updating bus
const UpdateBusPayload = Record({
  id: text,
  capacity: nat64,
  driver: text,
});

// Define record structure for User Details
const User = Record({
  id: text,
  name: text,
  email: text,
  phone: text,
  address: text,
});

// Define payload structure for adding User Details
const UserPayload = Record({
  name: text,
  email: text,
  phone: text,
  address: text,
});

// Define payload structure for updating User Details
const UpdateUserPayload = Record({
  id: text,
  name: text,
  email: text,
  phone: text,
  address: text,
});

// Define record structure for Trip
const Trip = Record({
  id: text,
  busId: text,
  availableSeats: nat64,
  date: text,
  time: text,
  cost: nat64,
  from: text,
  to: text,
  via: text,
});

// record structure for trip payload
const TripPayload = Record({
  busId: text,
  date: text,
  time: text,
  cost: nat64,
  from: text,
  to: text,
  via: text,
});

// record structure for trip update payload
const UpdateTripPayload = Record({
  id: text,
  busId: text,
  date: text,
  time: text,
  cost: nat64,
  from: text,
  to: text,
  via: text,
});

// Define record structure for Ticket
const Ticket = Record({
  id: text,
  userId: text,
  tripId: text,
  busId: text,
  date: text,
  time: text,
  cost: nat64,
  from: text,
  to: text,
});

// Define payload structure for Ticket
const TicketPayload = Record({
  userId: text,
  tripId: text,
});

// Define variant representing different error types
const ErrorType = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  InsufficientBus: text,
});

// Define record structure for user water usage

// Initialize StableBTreeMap instances to store buses, users, and ticket records.
const busesStorage = StableBTreeMap(0, text, Bus);
const usersStorage = StableBTreeMap(1, text, User);
const tripsStorage = StableBTreeMap(2, text, Trip);
const ticketsStorage = StableBTreeMap(3, text, Ticket);

// Export default Canister module
export default Canister({
  // add user details
  addUser: update([UserPayload], Result(User, ErrorType), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payload" });
    }

    const id = uuidv4();
    const user = {
      id,
      ...payload,
    };
    usersStorage.insert(id, user);
    return Ok(user);
  }),

  // Function to retrieve all users
  getUsers: query([], Vec(User), () => {
    return usersStorage.values();
  }),

  // Function to retrieve a specific user by id
  getUser: query([text], Result(User, ErrorType), (id) => {
    const userOpt = usersStorage.get(id);
    if ("None" in userOpt) {
      return Err({ NotFound: `user with id=${id} not found` });
    }
    return Ok(userOpt.Some);
  }),

  // Function to update an user
  updateUser: update(
    [UpdateUserPayload],
    Result(User, ErrorType),
    (payload) => {
      const userOpt = usersStorage.get(payload.id);
      if ("None" in userOpt) {
        return Err({ NotFound: `user with id=${payload.id} not found` });
      }
      const user = userOpt.Some;
      const updatedUser = {
        ...user,
        ...payload,
      };
      usersStorage.insert(user.id, updatedUser);
      return Ok(updatedUser);
    }
  ),

  // search user by name, address in lowercase
  searchUser: query([text], Vec(User), (search) => {
    const users = usersStorage.values();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.address.toLowerCase().includes(search.toLowerCase())
    );
  }),

  // Function to add a bus
  addBus: update([BusPayload], Result(Bus, ErrorType), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payload" });
    }

    const id = uuidv4();
    const bus = {
      id,
      ...payload,
    };
    busesStorage.insert(id, bus);
    return Ok(bus);
  }),

  // Function to retrieve all buses
  getBuses: query([], Vec(Bus), () => {
    return busesStorage.values();
  }),

  // Function to retrieve a specific bus by id
  getBus: query([text], Result(Bus, ErrorType), (id) => {
    const busOpt = busesStorage.get(id);
    if ("None" in busOpt) {
      return Err({ NotFound: `bus with id=${id} not found` });
    }
    return Ok(busOpt.Some);
  }),

  // search bus by registration, model in lowercase
  searchBus: query([text], Vec(Bus), (search) => {
    const buses = busesStorage.values();
    return buses.filter(
      (bus) =>
        bus.registration.toLowerCase().includes(search.toLowerCase()) ||
        bus.model.toLowerCase().includes(search.toLowerCase())
    );
  }),

  // Function to update a bus
  updateBus: update([UpdateBusPayload], Result(Bus, ErrorType), (payload) => {
    const buses = busesStorage.values();

    const bus = buses[0];
    const updatedBus = {
      ...bus,
      ...payload,
    };
    busesStorage.insert(bus.id, updatedBus);
    return Ok(updatedBus);
  }),

  // Function to create a trip with available seats same as bus capacity
  createTrip: update([TripPayload], Result(Trip, ErrorType), (payload) => {
    const busOpt = busesStorage.get(payload.busId);
    if ("None" in busOpt) {
      return Err({ NotFound: `bus with id=${payload.busId} not found` });
    }
    const bus = busOpt.Some;
    const tripId = uuidv4();
    const trip = {
      id: tripId,
      availableSeats: bus.capacity,
      ...payload,
    };
    tripsStorage.insert(tripId, trip);
    return Ok(trip);
  }),

  // Function to retrieve all trips
  getTrips: query([], Vec(Trip), () => {
    return tripsStorage.values();
  }),

  // Function to retrieve a specific trip by id
  getTrip: query([text], Result(Trip, ErrorType), (id) => {
    const tripOpt = tripsStorage.get(id);
    if ("None" in tripOpt) {
      return Err({ NotFound: `trip with id=${id} not found` });
    }
    return Ok(tripOpt.Some);
  }),

  // search trip by from, to or via in lowercase
  searchTrip: query([text], Vec(Trip), (search) => {
    const trips = tripsStorage.values();
    return trips.filter(
      (trip) =>
        trip.from.toLowerCase().includes(search.toLowerCase()) ||
        trip.to.toLowerCase().includes(search.toLowerCase()) ||
        trip.via.toLowerCase().includes(search.toLowerCase())
    );
  }),

  // Function to update a trip
  updateTrip: update(
    [UpdateTripPayload],
    Result(Trip, ErrorType),
    (payload) => {
      const tripOpt = tripsStorage.get(payload.id);
      if ("None" in tripOpt) {
        return Err({ NotFound: `trip with id=${payload.id} not found` });
      }
      const trip = tripOpt.Some;
      const updatedTrip = {
        ...trip,
        ...payload,
      };
      tripsStorage.insert(trip.id, updatedTrip);
      return Ok(updatedTrip);
    }
  ),

  //  function to create a ticket and reduce the available seats of the trip
  createTicket: update(
    [TicketPayload],
    Result(Ticket, ErrorType),
    (payload) => {
      const tripOpt = tripsStorage.get(payload.tripId);
      if ("None" in tripOpt) {
        return Err({ NotFound: `trip with id=${payload.tripId} not found` });
      }
      const trip = tripOpt.Some;
      if (trip.availableSeats === 0) {
        return Err({ InsufficientBus: "No available seats for this trip" });
      }
      const ticketId = uuidv4();
      const ticket = {
        id: ticketId,
        userId: payload.userId,
        tripId: payload.tripId,
        busId: trip.busId,
        date: trip.date,
        time: trip.time,
        cost: trip.cost,
        from: trip.from,
        to: trip.to,
      };
      ticketsStorage.insert(ticketId, ticket);
      const updatedTrip = {
        ...trip,
        availableSeats: BigInt(parseInt(trip.availableSeats) - 1),
      };
      tripsStorage.insert(trip.id, updatedTrip);
      return Ok(ticket);
    }
  ),

  // Function to retrieve all tickets
  getTickets: query([], Vec(Ticket), () => {
    return ticketsStorage.values();
  }),

  // Function to retrieve a specific ticket by id
  getTicket: query([text], Result(Ticket, ErrorType), (id) => {
    const ticketOpt = ticketsStorage.get(id);
    if ("None" in ticketOpt) {
      return Err({ NotFound: `ticket with id=${id} not found` });
    }
    return Ok(ticketOpt.Some);
  }),

  // Function to retrieve all tickets for a user
  getTicketsByUser: query([text], Vec(Ticket), (userId) => {
    const tickets = ticketsStorage.values();
    return tickets.filter((ticket) => ticket.userId === userId);
  }),

  // Function to retrieve all tickets for a trip
  getTicketsByTrip: query([text], Vec(Ticket), (tripId) => {
    const tickets = ticketsStorage.values();
    return tickets.filter((ticket) => ticket.busId === tripId);
  }),

  // Function to retrieve all tickets for a trip
  getTicketsByBus: query([text], Vec(Ticket), (busId) => {
    const tickets = ticketsStorage.values();
    return tickets.filter((ticket) => ticket.busId === busId);
  }),

  // Function to delete ticket by id
  deleteTicket: update([text], Result(Ticket, ErrorType), (id) => {
    const ticketOpt = ticketsStorage.get(id);
    if ("None" in ticketOpt) {
      return Err({ NotFound: `ticket with id=${id} not found` });
    }
    const ticket = ticketOpt.Some;
    ticketsStorage.remove(id);
    return Ok(ticket);
  }),
});

// A workaround to make the UUID package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};
