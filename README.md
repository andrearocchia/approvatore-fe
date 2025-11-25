# Sistema di Gestione Fatture

Applicazione React + Vite per la gestione, approvazione e rifiuto di fatture.

## Descrizione

Questo progetto è un sistema completo per la gestione di fatture che consente ai dipendenti di:
- Autenticarsi tramite login
- Visualizzare un elenco di fatture
- Approvare fatture con conferma
- Rifiutare fatture con motivazione

## Caratteristiche

- ✅ Autenticazione utente
- ✅ Visualizzazione tabella fatture
- ✅ Approvazione fatture con modal di conferma
- ✅ Rifiuto fatture con motivazione obbligatoria
- ✅ Interfaccia moderna e responsive
- ✅ Gestione dello stato con React Hooks

## Stack Tecnologico

| Tecnologia | Descrizione |
|-----------|-----------|
| **React** | Framework UI moderna |
| **Vite** | Build tool veloce |
| **FontAwesome** | Icone per le azioni |
| **CSS3** | Styling personalizzato |

## Requisiti

- Node.js 14+ 
- npm o yarn

## Installazione

```bash
# Clonare il repository
git clone <repository-url>
cd invoice-management

# Installare le dipendenze
npm install

# Avviare il server di sviluppo
npm run dev
```

Il server sarà disponibile su `http://localhost:5173`

## Build per Produzione

```bash
# Compilare per produzione
npm run build

# Preview della build
npm run preview
```

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

- [ ] Integrazione API backend per autenticazione
- [ ] Persistenza su database
- [ ] Sistema di ruoli e permessi
- [ ] Filtri e ricerca avanzata
- [ ] Paginazione tabella
- [ ] Export PDF fatture
- [ ] Storico approvazioni
- [ ] Notifiche email

## Debugging

I log console mostrano:
- ID fattura approvata/rifiutata
- Motivazione del rifiuto
- Stato utente loggato

## Note di Sviluppo

- Dati attualmente mock (vedere `App.jsx`)
- Autenticazione non validata (prototipo)
- Pronto per integrazione backend

## Configurazione Vite

Il progetto utilizza due plugin Vite disponibili:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Con Babel per Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Con SWC per Fast Refresh