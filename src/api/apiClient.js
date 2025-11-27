let unauthorizedCallback = null;

/**
 * Permette ad App.jsx di registrare una funzione da chiamare quando il token è invalido
 */
export function registerUnauthorizedCallback(fn) {
  unauthorizedCallback = fn;
}

const API_BASE_URL = "http://localhost:3000";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // Token scaduto / non valido
  if (response.status === 401 || response.status === 403) {
    if (unauthorizedCallback) {
      unauthorizedCallback();
    }
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Errore API: ${response.status} - ${err}`);
  }

  return await response.json();
}

export function loginRequest(username, password) {
  return apiRequest("/auth/login", "POST", { username, password });
}

// Esempio API
export function getUsers() {
  return apiRequest("/users");
}
