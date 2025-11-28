# Sistema di Gestione Fatture - Frontend

Applicazione React + Vite per la gestione, approvazione, rifiuto e consultazione di fatture in formato XML con autenticazione JWT.

## Descrizione

Questo progetto è un sistema completo di frontend per la gestione delle fatture che consente ai dipendenti di:

- Autenticarsi tramite login con JWT
- Visualizzare un elenco completo di fatture
- Approvare fatture con conferma
- Rifiutare fatture con motivazione obbligatoria
- Scaricare i dettagli fatture in formato PDF
- Gestione automatica della sessione e token scaduti

## Requisiti

- **Node.js**: 14.0.0 o superiore
- **npm**: 6.0.0 o superiore (oppure yarn)
- **Backend API**: Server in esecuzione su http://localhost:3000 (configurabile via `.env`)

## Installazione

1. **Clonare il repository**
   ```bash
   git clone <repository-url>
   cd sistema-fatture-frontend
   ```

2. **Installare le dipendenze**
   ```bash
   npm install
   ```

3. **Configurare le variabili d'ambiente**
   
   Creare un file `.env` nella root del progetto:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Avviare il server di sviluppo**
   ```bash
   npm run dev
   ```
   
   L'applicazione sarà disponibile su `http://localhost:5173`

## Utilizzo

### 1️ Login
- Accedi con le tue credenziali (username e password)
- Il token JWT viene salvato automaticamente
- Se il token è già salvato, verrai connesso automaticamente al riavvio

### 2️ Visualizzazione Fatture
Una volta loggato, visualizzerai la tabella delle fatture con le seguenti informazioni:
- Numero fattura
- Data documento
- Tipo documento
- Fornitore e P.IVA
- Totale, Imponibile e IVA

### 3️ Approvazione
- Clicca il pulsante **✔ (Verde)** sulla riga della fattura
- Conferma l'approvazione nel modal
- La fattura verrà rimossa dalla lista e registrata nel backend

### 4️ Rifiuto
- Clicca il pulsante **✖ (Rosso)** sulla riga della fattura
- Inserisci la motivazione del rifiuto nella textarea
- Conferma il rifiuto
- La fattura verrà rimossa e la motivazione registrata nel backend

### 5️ Visualizzazione Dettagli
- Clicca il pulsante **📋 (Blu)** sulla riga della fattura
- I dettagli verranno generati in formato PDF e aperti in una nuova finestra
- Potrai scaricare il PDF dal browser

### 6️ Logout
- Clicca il pulsante **Logout** in alto a destra
- Il token verrà rimosso e verrai reindirizzato al login

## Struttura del Progetto

```
src/
├── components/              # Componenti React
│   ├── Login/              # Form di autenticazione
│   │   ├── Login.jsx
│   │   └── Login.scss
│   ├── InvoicesTable/      # Tabella fatture con azioni
│   │   ├── InvoicesTable.jsx
│   │   └── InvoicesTable.scss
│   ├── ConfirmModal/       # Modal conferma approvazione
│   │   ├── ConfirmModal.jsx
│   │   └── ConfirmModal.scss
│   └── RejectModal/        # Modal rifiuto con motivazione
│       ├── RejectModal.jsx
│       └── RejectModal.scss
├── api/                     # Client API
│   └── apiClient.js        # Configurazione richieste HTTP e interceptor JWT
├── modules/                 # Logica di business
│   └── invoiceActions.js   # Gestione azioni sulle fatture
├── App.jsx                 # Componente root
├── App.scss                # Stili globali
├── main.jsx                # Entry point
├── index.css               # CSS reset
└── .env                    # Configurazione ambiente
```

## Configurazione

### API Endpoints Richiesti

Il backend deve esporre i seguenti endpoint:

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| POST | `/api/login` | Autenticazione, ritorna JWT token |
| GET | `/api/invoices` | Recupera lista fatture (richiede header Authorization) |
| POST | `/api/invoices/:id/approve` | Approva una fattura |
| POST | `/api/invoices/:id/reject` | Rifiuta una fattura (con motivazione nel body) |
| GET | `/api/invoices/:id/pdf` | Genera PDF della fattura |

### Formato Token JWT

Il token JWT deve contenere i seguenti claims:
```json
{
  "username": "nome_utente",
  "role": "user_role",
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Variabili d'Ambiente

- `VITE_API_BASE_URL`: URL base del server backend (default: http://localhost:3000)

## Componenti Principali

### App.jsx
Componente root che gestisce:
- Stato globale utente e fatture
- Ciclo di vita autenticazione e caricamento dati
- Apertura/chiusura modali
- Logout automatico se token scade

### Login.jsx
Form di login che:
- Raccoglie credenziali utente
- Invia richiesta autenticazione al backend
- Salva token JWT in localStorage
- Notifica il componente padre dopo login riuscito

### InvoicesTable.jsx
Tabella responsiva che:
- Visualizza lista fatture con scroll orizzontale
- Mostra 9 colonne di informazioni
- Fornisce 3 azioni: visualizza PDF, approva, rifiuta
- È responsiva su dispositivi mobili

### ConfirmModal.jsx
Modal di conferma che:
- Mostra il numero della fattura
- Chiede conferma prima dell'approvazione
- Invoca callback al confermadell'azione

### RejectModal.jsx
Modal di rifiuto che:
- Raccoglie la motivazione in textarea
- Valida che il campo sia compilato
- Invoca callback con la motivazione

## Documentazione Completa

Per la documentazione dettagliata su componenti, flussi di lavoro, API e prossimi sviluppi, consulta:
**[DOCUMENTATION.md](./DOCUMENTATION.md)**

## Script Disponibili

```bash
# Avviare server di sviluppo
npm run dev

# Build per produzione
npm run build

# Anteprima build di produzione
npm run preview

# Lint del codice (se configurato)
npm run lint
```

## Sicurezza

- Token JWT per autenticazione stateless
- Validazione token al mount dell'applicazione
- Logout automatico se token scade
- Token aggiunto automaticamente all'header Authorization