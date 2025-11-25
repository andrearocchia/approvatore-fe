# Documentazione - Sistema di Gestione Fatture

## Descrizione Progetto

Sistema web per la gestione e approvazione di fatture. L'applicazione consente agli utenti di autenticarsi, visualizzare un elenco di fatture e approvarle o rifiutarle con motivazione.

## Stack Tecnologico

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Gestione Stato**: React Hooks (useState)
- **Icone**: FontAwesome
- **Styling**: CSS personalizzato

## Struttura del Progetto

```
src/
├── components/
│   ├── Login/
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── InvoicesTable/
│   │   ├── InvoicesTable.jsx
│   │   └── InvoicesTable.css
│   ├── RejectModal/
│   │   ├── RejectModal.jsx
│   │   └── RejectModal.css
│   └── ConfirmModal/
│       ├── ConfirmModal.jsx
│       └── ConfirmModal.css
├── modules/
│   └── invoiceActions.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Componenti

### App.jsx (Root Component)

Componente principale che gestisce lo stato globale dell'applicazione.

**State:**
- `user`: Dati utente loggato (null se non autenticato)
- `invoices`: Array di fatture
- `modalInvoiceId`: ID fattura per il modal di rifiuto
- `confirmModal`: Stato del modal di approvazione

**Funzioni principali:**
- `handleLogin()`: Autentica l'utente
- `handleLogout()`: Effettua il logout
- `removeInvoice()`: Rimuove una fattura dalla lista
- `openRejectModal() / closeRejectModal()`: Gestisce il modal di rifiuto
- `openConfirmModal() / closeConfirmModal()`: Gestisce il modal di approvazione
- `handleConfirmApprove()`: Conferma l'approvazione di una fattura

### Login.jsx

Componente per l'autenticazione utente.

**Props:**
- `onLogin`: Callback quando l'utente si autentica

**Funzionalità:**
- Form con campi username e password
- Validazione input
- Invio credenziali al componente padre

### InvoicesTable.jsx

Tabella che visualizza l'elenco delle fatture con azioni.

**Props:**
- `invoices`: Array di fatture da visualizzare
- `removeInvoice`: Callback per rimuovere una fattura
- `openRejectModal`: Callback per aprire il modal di rifiuto
- `openConfirmModal`: Callback per aprire il modal di approvazione

**Colonne tabella:**
- Numero fattura
- Data
- Cliente
- Importo
- Azioni (Approva/Rifiuta)

**Icone:**
- ✔ (Verde): Approva fattura
- ✖ (Rosso): Rifiuta fattura

### ConfirmModal.jsx

Modal di conferma per l'approvazione di una fattura.

**Props:**
- `isOpen`: Controlla la visibilità del modal
- `onClose`: Callback per chiudere il modal
- `onConfirm`: Callback per confermare l'approvazione
- `invoiceNumber`: Numero della fattura da approvare

### RejectModal.jsx

Modal per il rifiuto di una fattura con motivazione.

**Props:**
- `isOpen`: Controlla la visibilità del modal
- `onClose`: Callback per chiudere il modal
- `onConfirm`: Callback con la motivazione del rifiuto

**Funzionalità:**
- Textarea per inserire la motivazione
- Validazione: il pulsante Conferma è disabilitato se il campo è vuoto
- Cancellazione automatica del testo dopo la conferma

## Module

### invoiceActions.js

Modulo utility che racchiude la logica delle azioni sulle fatture.

**Funzioni:**
- `handleApprove()`: Apre il modal di conferma approvazione
- `handleRejectClick()`: Apre il modal di rifiuto

## Flusso di Lavoro

1. **Login**: Utente inserisce credenziali e accede
2. **Visualizzazione Fatture**: Viene mostrata la tabella con le fatture
3. **Approvazione**: 
   - Utente clicca l'icona ✔
   - Si apre il ConfirmModal
   - Conferma l'approvazione
   - Fattura viene rimossa dalla lista
4. **Rifiuto**:
   - Utente clicca l'icona ✖
   - Si apre il RejectModal
   - Inserisce la motivazione
   - Conferma il rifiuto
   - Fattura viene rimossa dalla lista

## Dati Fatture

Attualmente il sistema utilizza dati fittizie (mock data):

```javascript
[
  { id: 1, numero: 'FAT-001', data: '2025-01-01', cliente: 'Mario Rossi', importo: 120.50 },
  // ... altri record
]
```

## Prossimi Sviluppi

- Integrazione con API backend per l'autenticazione
- Persistenza dati su database
- Integrazione API per approvazione/rifiuto fatture
- Aggiunta filtri e ricerca nella tabella
- Paginazione
- Download/Stampa fatture
- Storico approvazioni/rifiuti
- Validazione credenziali lato server
- Sistema di ruoli e permessi

## Installazione e Avvio

```bash
# Installare dipendenze
npm install

# Avviare server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview
```

## Configurazione

Il progetto utilizza Vite con React. Assicurati di avere Node.js 14+ installato.

## Note di Sviluppo

- I dati delle fatture sono attualmente in stato locale (App.jsx)
- I modal sono controllati da stato globale nel componente App
- Le azioni di approvazione/rifiuto attualmente solo rimuovono la fattura
- I log console mostrano gli ID e i motivi delle azioni per debug

## Contribuenti

Progetto sviluppato per la gestione interna di fatture.