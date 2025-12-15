let unauthorizedCallback = null;

// Permette ad App.jsx di registrare una funzione da chiamare quando il token è invalido
export function registerUnauthorizedCallback(fn) {
  unauthorizedCallback = fn;
}

export async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

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

// Chiamata per tutte le fatture 'in attesa'
export function getStandByInvoices(username) {
  return apiRequest(`/invoices/standby/${username}`);
}

// Chiamata per tutte le fatture
export function getAllInvoices() {
  return apiRequest("/invoices/all");
}

// Chiamata con paginazione e filtri
export function getProcessedInvoices(page = 1, pageSize = 15, filters = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  // Aggiungi filtri solo se presenti
  if (filters.dataDa) params.append('dataDa', filters.dataDa);
  if (filters.dataA) params.append('dataA', filters.dataA);
  if (filters.numeroFattura) params.append('numeroFattura', filters.numeroFattura);
  if (filters.fornitore) params.append('fornitore', filters.fornitore);
  if (filters.stato && filters.stato !== 'tutti') params.append('stato', filters.stato);

  return apiRequest(`/invoices/processed?${params.toString()}`);
}

// Chiamata per ottenere la fattura by id
export function getInvoiceById(codiceUnico) {
  return apiRequest(`/invoices/${codiceUnico}`);
}

// Chiamata per ottenere il pdf
export function getInvoicePdfUrl(codiceUnico) {
  return `/invoices/${codiceUnico}/pdf`;
}

// Chiamata per ottenere lo stato di una fattura
export function updateInvoiceStatus(codiceUnico, stato, note) {
  return apiRequest(`/invoices/${codiceUnico}/status`, "PATCH", { stato, note });
}

// ============================
// USERS
// ============================
export function getUsers() {
  return apiRequest("/users");
}