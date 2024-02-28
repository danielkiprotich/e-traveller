export async function createTicket(ticket) {
  return window.canister.bus.createTicket(ticket);
}

export async function deleteTicket(ticketId) {
  return window.canister.bus.deleteTicket(ticketId);
}

export async function getTickets() {
  try {
    return await window.canister.bus.getTickets();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
