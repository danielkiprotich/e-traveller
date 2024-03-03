import { Canister, int32, query, text, update, StableBTreeMap, Result, Err, Ok, random_u64 } from 'azle';
import bcrypt from 'bcryptjs';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface Bus {
    id: string;
    registration: string;
    model: string;
    capacity: number;
    driver: string;
}

interface Trip {
    id: string;
    busId: string;
    availableSeats: number;
    date: string;
    time: string;
    cost: number;
    from: string;
    to: string;
    via: string;
}

interface Ticket {
    id: string;
    userId: string;
    tripId: string;
    busId: string;
    date: string;
    time: string;
    cost: number;
    from: string;
    to: string;
}

const userStorage = StableBTreeMap(text, User);
const busStorage = StableBTreeMap(text, Bus);
const tripStorage = StableBTreeMap(text, Trip);
const ticketStorage = StableBTreeMap(text, Ticket);

export default Canister({
    addUser: update([UserPayload], Result(User, ErrorType), async (payload) => {
        try {
            const existingUser = userStorage.get(payload.email);
            if ('Some' in existingUser) {
                throw new Error('Email is already registered. Please use a different email.');
            }

            if (!payload.email.endsWith('@gmail.com')) {
                throw new Error('Invalid email format. Please use an email ending with "@gmail.com".');
            }

            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const user = { id: random_u64(), ...payload, password: hashedPassword };
            userStorage.insert(user.id, user);
            return Ok(user);
        } catch (error: any) {
            return Err(`Error: ${error.message}`);
        }
    }),

    getUsers: query([], Vec(User), () => {
        return userStorage.values();
    }),

    getUser: query([text], Result(User, ErrorType), (id) => {
        const userOpt = userStorage.get(id);
        if ("None" in userOpt) {
            return Err({ NotFound: `user with id=${id} not found` });
        }
        return Ok(userOpt.Some);
    }),

    updateUser: update([UpdateUserPayload], Result(User, ErrorType), (payload) => {
        const userOpt = userStorage.get(payload.id);
        if ("None" in userOpt) {
            return Err({ NotFound: `user with id=${payload.id} not found` });
        }
        const user = userOpt.Some;
        const updatedUser = {
            ...user,
            ...payload,
        };
        userStorage.insert(user.id, updatedUser);
        return Ok(updatedUser);
    }),

    searchUser: query([text], Vec(User), (search) => {
        const users = userStorage.values();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.address.toLowerCase().includes(search.toLowerCase())
        );
    }),

    addBus: update([BusPayload], Result(Bus, ErrorType), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ NotFound: "invalid payload" });
        }

        const id = random_u64();
        const bus = {
            id,
            ...payload,
        };
        busStorage.insert(id, bus);
        return Ok(bus);
    }),

    getBuses: query([], Vec(Bus), () => {
        return busStorage.values();
    }),

    getBus: query([text], Result(Bus, ErrorType), (id) => {
        const busOpt = busStorage.get(id);
        if ("None" in busOpt) {
            return Err({ NotFound: `bus with id=${id} not found` });
        }
        return Ok(busOpt.Some);
    }),

    searchBus: query([text], Vec(Bus), (search) => {
        const buses = busStorage.values();
        return buses.filter(
            (bus) =>
                bus.registration.toLowerCase().includes(search.toLowerCase()) ||
                bus.model.toLowerCase().includes(search.toLowerCase())
        );
    }),

    updateBus: update([UpdateBusPayload], Result(Bus, ErrorType), (payload) => {
        const busOpt = busStorage.get(payload.id);
        if ("None" in busOpt) {
            return Err({ NotFound: `bus with id=${payload.id} not found` });
        }
        const bus = busOpt.Some;
        const updatedBus = {
            ...bus,
            ...payload,
        };
        busStorage.insert(bus.id, updatedBus);
        return Ok(updatedBus);
    }),

    createTrip: update([TripPayload], Result(Trip, ErrorType), (payload) => {
        const busOpt = busStorage.get(payload.busId);
        if ("None" in busOpt) {
            return Err({ NotFound: `bus with id=${payload.busId} not found` });
        }
        const bus = busOpt.Some;
        const tripId = random_u64();
        const trip = {
            id: tripId,
            availableSeats: bus.capacity,
            ...payload,
        };
        tripStorage.insert(tripId, trip);
        return Ok(trip);
    }),

    getTrips: query([], Vec(Trip), () => {
        return tripStorage.values();
    }),

    getTrip: query([text], Result(Trip, ErrorType), (id) => {
        const tripOpt = tripStorage.get(id);
        if ("None" in tripOpt) {
            return Err({ NotFound: `trip with id=${id} not found` });
        }
        return Ok(tripOpt.Some);
    }),

    searchTrip: query([text], Vec(Trip), (search) => {
        const trips = tripStorage.values();
        return trips.filter(
            (trip) =>
                trip.from.toLowerCase().includes(search.toLowerCase()) ||
                trip.to.toLowerCase().includes(search.toLowerCase()) ||
                trip.via.toLowerCase().includes(search.toLowerCase())
        );
    }),

    updateTrip: update([UpdateTripPayload], Result(Trip, ErrorType), (payload) => {
        const tripOpt = tripStorage.get(payload.id);
        if ("None" in tripOpt) {
            return Err({ NotFound: `trip with id=${payload.id} not found` });
        }
        const trip = tripOpt.Some;
        const updatedTrip = {
            ...trip,
            ...payload,
        };
        tripStorage.insert(trip.id, updatedTrip);
        return Ok(updatedTrip);
    }),

    createTicket: update([TicketPayload], Result(Ticket, ErrorType), (payload) => {
        const tripOpt = tripStorage.get(payload.tripId);
        if ("None" in tripOpt) {
            return Err({ NotFound: `trip with id=${payload.tripId} not found` });
        }
        const trip = tripOpt.Some;
        if (trip.availableSeats === 0) {
            return Err({ InsufficientBus: "No available seats for this trip" });
        }
        const ticketId = random_u64();
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
        ticketStorage.insert(ticketId, ticket);
        const updatedTrip = {
            ...trip,
            availableSeats: trip.availableSeats - 1,
        };
        tripStorage.insert(trip.id, updatedTrip);
        return Ok(ticket);
    }),

    getTickets: query([], Vec(Ticket), () => {
        return ticketStorage.values();
    }),

    getTicket: query([text], Result(Ticket, ErrorType), (id) => {
        const ticketOpt = ticketStorage.get(id);
        if ("None" in ticketOpt) {
            return Err({ NotFound: `ticket with id=${id} not found` });
        }
        return Ok(ticketOpt.Some);
    }),

    getTicketsByUser: query([text], Vec(Ticket), (userId) => {
        const tickets = ticketStorage.values();
        return tickets.filter((ticket) => ticket.userId === userId);
    }),

    getTicketsByTrip: query([text], Vec(Ticket), (tripId) => {
        const tickets = ticketStorage.values();
        return tickets.filter((ticket) => ticket.tripId === tripId);
    }),

    getTicketsByBus: query([text], Vec(Ticket), (busId) => {
        const tickets = ticketStorage.values();
        return tickets.filter((ticket) => ticket.busId === busId);
    }),

    deleteTicket: update([text], Result(Ticket, ErrorType), (id) => {
        const ticketOpt = ticketStorage.get(id);
        if ("None" in ticketOpt) {
            return Err({ NotFound: `ticket with id=${id} not found` });
        }
        const ticket = ticketOpt.Some;
        ticketStorage.remove(id);
        return Ok(ticket);
    }),
});
