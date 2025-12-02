let unauthorizedCallback = null;

/**
 * Permette ad App.jsx di registrare una funzione da chiamare quando il token è invalido
 */
export function registerUnauthorizedCallback(fn) {
  unauthorizedCallback = fn;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Funzione generica per chiamate API
 */
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

// ============================
// AUTH
// ============================
export function loginRequest(username, password) {
  return apiRequest("/auth/login", "POST", { username, password });
}

// ============================
// INVOICES
// ============================
export function getStandByInvoices() {
  return apiRequest("/invoices/standby");
}

export function getAllInvoices() {
  return apiRequest("/invoices/all");
}

export function getInvoiceById(codiceUnico) {
  return apiRequest(`/invoices/${codiceUnico}`);
}

export function getInvoicePdf(codiceUnico) {
  return apiRequest(`/invoices/${codiceUnico}/pdf`);
}

export function updateInvoiceStatus(codiceUnico, stato, note) {
  return apiRequest(`/invoices/${codiceUnico}/status`, "PATCH", { stato, note });
}

// ============================
// USERS
// ============================
export function getUsers() {
  return apiRequest("/users");
}