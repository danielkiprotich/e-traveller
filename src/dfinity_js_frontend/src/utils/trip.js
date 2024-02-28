export async function createTrip(trip) {
  return window.canister.bus.createTrip(trip);
}

export async function updateTrip(trip) {
  return window.canister.bus.updateTrip(trip);
}

export async function getTrips() {
  try {
    return await window.canister.bus.getTrips();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
