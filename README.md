# Bus Management System - Azle Canister

This project implements a bus management system using the Azle smart contract framework. This system offers a solution for managing buses, users, trips, and tickets, providing functionalities for CRUD operations, search functionality, and error handling. It provides functionalities for managing users, buses, trips, and tickets, enabling users to book tickets for bus travel.

**Structure:**

1. **Imports:** Necessary Azle modules (`query`, `update`, `text`, etc.) and the `uuidv4` function are imported.
2. **Record Definitions:** Record structures are defined for `Bus`, `User`, `Trip`, `Ticket`, and `ErrorType`. These structures represent the data stored in the canister.
3. **Payload Definitions:** Payload record structures are defined for creating, updating, and searching various entities (e.g., `BusPayload`, `UpdateBusPayload`).
4. **Storage Initialization:** Instances of `StableBTreeMap` are initialized to store buses, users, trips, and tickets efficiently.
5. **Canister Functions:** The `Canister` object defines various functions accessible by external actors:
    - **User Management:**
        - `addUser`: Adds a new user to the system.
        - `getUsers`: Retrieves all users.
        - `getUser`: Retrieves a specific user by ID.
        - `updateUser`: Updates an existing user.
        - `searchUser`: Searches users by name or address (case-insensitive).
    - **Bus Management:**
        - `addBus`: Adds a new bus to the system.
        - `getBuses`: Retrieves all buses.
        - `getBus`: Retrieves a specific bus by ID.
        - `searchBus`: Searches buses by registration or model (case-insensitive).
        - `updateBus`: Updates an existing bus.
    - **Trip Management:**
        - `createTrip`: Creates a new trip with available seats set to the bus capacity.
        - `getTrips`: Retrieves all trips.
        - `getTrip`: Retrieves a specific trip by ID.
        - `searchTrip`: Searches trips by origin, destination, or via point (case-insensitive).
        - `updateTrip`: Updates an existing trip.
    - **Ticket Management:**
        - `createTicket`: Creates a new ticket, decrementing the trip's available seats.
        - `getTickets`: Retrieves all tickets.
        - `getTicket`: Retrieves a specific ticket by ID.
        - `getTicketsByUser`: Retrieves all tickets for a specific user.
        - `getTicketsByTrip`: Retrieves all tickets for a specific trip.
        - `getTicketsByBus`: Retrieves all tickets for a specific bus.
        - `deleteTicket`: Deletes a ticket by ID.

**Note:**

- This code utilizes a workaround for UUID generation, which might not be the most secure. Exploring Azle's built-in security features or implementing robust random number generation is recommended.
- Consider adding API documentation and unit tests for enhanced clarity, usability, and reliability.

## How to deploy canisters implemented in the course

### Ledger canister

`./deploy-local-ledger.sh` - deploys a local Ledger canister. IC works differently when run locally so there is no default network token available and you have to deploy it yourself. Remember that it's not a token like ERC-20 in Ethereum, it's a native token for ICP, just deployed separately.
This canister is described in the `dfx.json`:

`remote.id.ic` - that is the principal of the Ledger canister and it will be available by this principal when you work with the ledger.

Also, in the scope of this script, a minter identity is created which can be used for minting tokens
for the testing purposes.
Additionally, the default identity is pre-populated with 1000_000_000_000 e8s which is equal to 10_000 * 10**8 ICP.
The decimals value for ICP is 10**8.

List identities:
`dfx identity list`

Switch to the minter identity:
`dfx identity use minter`

Transfer ICP:
`dfx ledger transfer <ADDRESS>  --memo 0 --icp 100 --fee 0`
where:

- `--memo` is some correlation id that can be set to identify some particular transactions (we use that in the canister).
- `--icp` is the transfer amount
- `--fee` is the transaction fee. In this case it's 0 because we make this transfer as the minter idenity thus this transaction is of type MINT, not TRANSFER.
- `<ADDRESS>` is the address of the recipient. To get the address from the principal, you can use the helper function from the canister - `getAddressFromPrincipal(principal: Principal)`, it can be called via the Candid UI.

### Internet identity canister

`dfx deploy internet_identity` - that is the canister that handles the authentication flow. Once it's deployed, the `js-agent` library will be talking to it to register identities. There is UI that acts as a wallet where you can select existing identities
or create a new one.

### canister

`dfx deploy dfinity_js_backend` - deploys the canister where the business logic is implemented.
Basically, it implements functions like add, view, update, delete, and buy products + a set of helper functions.

Do not forget to run `dfx generate dfinity_js_backend` anytime you add/remove functions in the canister or when you change the signatures.
Otherwise, these changes won't be reflected in IDL's and won't work when called using the JS agent.

### frontend canister

`dfx deploy dfinity_js_frontend` - deployes the frontend app for the `dfinity_js_backend` canister on IC.
