# Sistema di Gestione Fatture

Applicazione React + Vite per la gestione, approvazione e rifiuto di fatture.

## Descrizione

Questo progetto è un sistema completo per la gestione di fatture che consente ai dipendenti di:
- Autenticarsi tramite login
- Visualizzare un elenco di fatture
- Approvare fatture con conferma
- Rifiutare fatture con motivazione

## Requisiti

- Node.js 14+ 
- npm o yarn

## Struttura del Progetto

```
src/
├── components/          # Componenti React
│   ├── Login/          # Componente autenticazione
│   ├── InvoicesTable/  # Tabella fatture
│   ├── ConfirmModal/   # Modal conferma approvazione
│   └── RejectModal/    # Modal rifiuto con motivazione
├── modules/            # Logica di business
│   └── invoiceActions.js
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

## Utilizzo

### 1. Login
Accedi con le tue credenziali (attualmente mock data):
```
Username: qualsiasi valore
Password: qualsiasi valore
```

### 2. Gestione Fatture
Una volta loggato, visualizzerai la tabella delle fatture:
- **✔ (Verde)**: Approva la fattura
- **✖ (Rosso)**: Rifiuta la fattura

### 3. Approvazione
Clicca il pulsante ✔ → Conferma nel modal → Fattura rimossa

### 4. Rifiuto
Clicca il pulsante ✖ → Inserisci motivazione → Conferma → Fattura rimossa

## Documentazione Completa

Per la documentazione dettagliata su componenti, flussi di lavoro e prossimi sviluppi, consulta:
**[DOCUMENTATION.md](./DOCUMENTATION.md)**

## Prossimi Step

- [ ] Integrazione con API backend per l'autenticazione
- [ ] Integrazione API per approvazione/rifiuto fatture
- [ ] Aggiunta filtri e ricerca nella tabella
- [ ] Storico approvazioni/rifiuti
- [ ] Logica di ruoli e permessi

## Note di Sviluppo

- Dati attualmente mock (vedere `App.jsx`)
- Autenticazione non validata (prototipo)
- Pronto per integrazione backend

## Configurazione Vite

Il progetto utilizza due plugin Vite disponibili:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Con Babel per Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Con SWC per Fast Refresh