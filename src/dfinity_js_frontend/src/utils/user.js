export async function createUser(user) {
  return window.canister.bus.addUser(user);
}

export async function updateUser(user) {
  return window.canister.bus.updateUser(user);
}

// function to pay bill for a user
export async function payBill(data) {
  return window.canister.bus.payBill(data);
}

// function to refill water for a user
export async function refillUser(data) {
  return window.canister.bus.refillTokens(data);
}

export async function getUsers() {
  try {
    return await window.canister.bus.getUsers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getCollectionsByUserId
export async function getUsersByUserId(userId) {
  return window.canister.bus.getUser(userId);
}
