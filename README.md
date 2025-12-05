# Documentazione Sistema Gestione Fatture - Frontend

## Indice
1. [Panoramica](#panoramica)
2. [Architettura](#architettura)
3. [Componenti](#componenti)
4. [API Client](#api-client)
5. [Flussi Operativi](#flussi-operativi)
6. [Configurazione](#configurazione)

---

## Panoramica

Sistema frontend React + Vite per la gestione delle fatture elettroniche con autenticazione JWT. Permette di visualizzare, approvare, rifiutare fatture e consultare lo storico completo.

### Funzionalità Principali
- Autenticazione con JWT
- Visualizzazione fatture in attesa
- Approvazione/rifiuto fatture con conferma
- Download PDF dei dettagli fattura
- Storico completo delle fatture processate
- Gestione automatica sessione e token scaduti

---

## Architettura

- **React 18** con hooks
- **Vite** per build e dev server
- **SCSS** per gli stili
- **FontAwesome** per le icone
- **jwt-decode** per decodifica token JWT

---

## Componenti

### App.jsx
**Componente root** che coordina l'intera applicazione.

**Stati principali:**
- `user`: informazioni utente autenticato (username, role, token)
- `invoices`: lista fatture in attesa
- `historyInvoices`: lista completa fatture processate
- `showHistory`: toggle tra vista fatture/storico
- `rejectModal`: gestione apertura modal rifiuto
- `confirmModal`: gestione apertura modal conferma

**Funzionalità:**
- Caricamento automatico token JWT da localStorage al mount
- Registrazione callback per logout automatico su 401/403
- Caricamento fatture dopo login
- Gestione azioni: approva, rifiuta, visualizza PDF
- Switch tra vista fatture in attesa e storico

**Endpoint utilizzati:**
- `GET /invoices/standby` - fatture in attesa
- `GET /invoices/all` - storico completo
- `PATCH /invoices/:id/status` - cambio stato fattura
- `GET /invoices/:id/pdf` - download PDF

---

### Login.jsx
Form di autenticazione utente.

**Props:**
- `onLogin`: callback chiamata dopo login riuscito

**Comportamento:**
1. Raccoglie username e password
2. Invia richiesta POST a `/auth/login`
3. Salva `access_token` in localStorage
4. Notifica il parent via `onLogin()`

**Gestione errori:**
- Alert per credenziali non valide
- Log errori in console

---

### InvoicesTable.jsx
Tabella responsiva per visualizzare le fatture in attesa di approvazione.

**Props:**
- `invoices`: array di oggetti fattura
- `actions`: oggetto con callback
  - `onApprove(id, numero, cedente)`
  - `onReject(id)`
  - `onViewInfo(id)`

**Colonne visualizzate:**
1. Numero fattura
2. Data documento
3. Nome fornitore
4. Totale (€)
5. Aliquota IVA (%)
6. Azioni (info/approva/rifiuta)

**Funzionalità:**
- Formattazione valuta con 2 decimali
- Formattazione data in formato italiano
- Icone interattive per ogni azione
- Gestione stato vuoto con messaggio

---

### HistoryTable.jsx
Tabella per visualizzare lo storico completo delle fatture.

**Props:**
- `invoices`: array completo fatture

**Colonne visualizzate:**
1. Numero fattura
2. Data documento
3. Nome fornitore
4. Totale (€)
5. Stato (approvato/rifiutato/standby)
6. Note (icona blu se presente)

**Caratteristiche:**
- Evidenziazione riga in base allo stato (classi CSS dinamiche)
- Icona circolare per indicare presenza note
- Formattazione identica a InvoicesTable

---

### ConfirmModal.jsx
Modal di conferma per approvazione fattura.

**Props:**
- `isOpen`: boolean visibilità
- `onClose`: callback chiusura
- `onConfirm`: callback conferma
- `invoiceNumber`: numero fattura
- `cedente`: nome fornitore

**Comportamento:**
- Mostra numero fattura e nome fornitore
- Richiede conferma esplicita
- Pulsanti: Annulla / Conferma

---

### RejectModal.jsx
Modal per rifiuto fattura con motivazione obbligatoria.

**Props:**
- `isOpen`: boolean visibilità
- `onClose`: callback chiusura
- `onConfirm(reason)`: callback con motivazione

**Comportamento:**
- Textarea per inserimento motivazione
- Validazione campo non vuoto
- Pulsante conferma disabilitato se textarea vuota
- Reset automatico textarea dopo conferma

---

## API Client

### apiClient.js
Modulo centralizzato per tutte le chiamate HTTP.

**Configurazione:**
- Header `Authorization: Bearer <token>` automatico
- Header `Content-Type: application/json`

**Funzione principale:**
```javascript
apiRequest(endpoint, method = "GET", body = null)
```
- Aggiunge automaticamente token JWT
- Gestisce errori 401/403 con callback logout
- Parse automatico JSON response

**Funzioni esportate:**

**AUTH:**
- `loginRequest(username, password)` → POST `/auth/login`

**INVOICES:**
- `getStandByInvoices()` → GET `/invoices/standby`
- `getAllInvoices()` → GET `/invoices/all`
- `getInvoiceById(codiceUnico)` → GET `/invoices/:codiceUnico`
- `getInvoicePdf(codiceUnico)` → GET `/invoices/:codiceUnico/pdf`
- `updateInvoiceStatus(codiceUnico, stato, note)` → PATCH `/invoices/:codiceUnico/status`

**USERS:**
- `getUsers()` → GET `/users`

**Gestione errori:**
- Token scaduto/invalido: chiama `unauthorizedCallback` registrata
- Altri errori: lancia eccezione con dettagli

---

## Flussi Operativi

### 1. Login
1. Utente inserisce credenziali in `Login.jsx`
2. Submit chiama `loginRequest(username, password)`
3. Backend ritorna `{access_token: "..."}`
4. Token salvato in localStorage
5. `onLogin()` notifica `App.jsx`
6. `App.jsx` decodifica token e imposta stato `user`
7. `useEffect` carica automaticamente le fatture

### 2. Visualizzazione Fatture
1. `App.jsx` chiama `getStandByInvoices()`
2. Backend ritorna array fatture in attesa
3. Stato `invoices` aggiornato
4. `InvoicesTable` renderizza la tabella
5. Ogni riga mostra 3 azioni disponibili

### 3. Approvazione Fattura
1. Click su icona verde in `InvoicesTable`
2. `handleApprove(id, numero, cedente)` apre modal
3. `ConfirmModal` mostra dettagli e chiede conferma
4. Conferma → `updateInvoiceStatus(id, 'approvato')`
5. Backend aggiorna stato nel database
6. Fattura rimossa da lista locale
7. Modal si chiude

### 4. Rifiuto Fattura
1. Click su icona rossa in `InvoicesTable`
2. `handleReject(id)` apre modal
3. `RejectModal` richiede motivazione
4. Conferma → `updateInvoiceStatus(id, 'rifiutato', reason)`
5. Backend salva stato e motivazione
6. Fattura rimossa da lista locale
7. Modal si chiude e textarea resettata

### 5. Visualizzazione PDF
1. Click su icona info blu
2. `handleViewInfo(id)` chiama `getInvoicePdf(id)`
3. Backend ritorna `{pdf: "base64string"}`
4. `openPDFFromBase64()` apre PDF in nuova finestra
5. Utente può scaricare tramite browser

### 6. Storico Fatture
1. Click su pulsante "Storico" nell'header
2. `loadHistoryInvoices()` chiama `getAllInvoices()`
3. Backend ritorna tutte le fatture (approvate/rifiutate/standby)
4. Vista cambia da `InvoicesTable` a `HistoryTable`
5. Pulsante diventa "Fatture" per tornare indietro

### 7. Logout Automatico
1. Token scaduto durante una richiesta API
2. Backend risponde 401/403
3. `apiRequest()` rileva errore
4. Chiama `unauthorizedCallback` registrata
5. `handleLogout()` eseguito: rimuove token, resetta user
6. Redirect automatico a schermata login

---

## Configurazione

### Vite Config (vite.config.js)
```javascript
server: {
  port: 5173,
  proxy: {
    '/auth': 'http://localhost',
    '/users': 'http://localhost',
    '/invoices': 'http://localhost',
  }
}
```
**Proxy per sviluppo:** inoltra richieste API al backend su localhost porta 80.

### Formato JWT Token
Il token deve contenere:
```json
{
  "username": "approvatore",
  "role": "approvatore",
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Endpoint Backend Richiesti

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | `/auth/login` | No | Login, ritorna access_token |
| GET | `/invoices/standby` | Sì | Fatture in attesa |
| GET | `/invoices/all` | Sì | Tutte le fatture |
| GET | `/invoices/:id` | Sì | Dettaglio singola fattura |
| GET | `/invoices/:id/pdf` | Sì | PDF fattura (base64) |
| PATCH | `/invoices/:id/status` | Sì | Aggiorna stato fattura |
| GET | `/users` | Sì | Lista utenti |