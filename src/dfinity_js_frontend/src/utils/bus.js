export async function createBus(bus) {
  return window.canister.bus.addBus(bus);
}

export async function updateBus(bus) {
  return window.canister.bus.updateBus(bus);
}

// get bus
export async function getBus() {
  return window.canister.bus.getBus();
}

export async function getBuses() {
  try {
    return await window.canister.bus.getBuses();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
