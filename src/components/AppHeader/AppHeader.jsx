import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faList, faFilter } from '@fortawesome/free-solid-svg-icons';
import './AppHeader.scss';

function AppHeader({ 
  username, 
  showHistory, 
  onToggleHistory, 
  onOpenFilter, 
  onLogout 
}) {
  return (
    <header className="app-header">
      <div className="app-user">
        <span className="app-username">Buongiorno, {username}</span>

        <div className="button-room">
          {showHistory ? (
            <button
              title='Visualizza fatture da elaborare'
              className="back-button"
              onClick={() => onToggleHistory(false)}
            >
              <FontAwesomeIcon icon={faList} />
              <span className="invoice-list">Fatture</span>
            </button>
          ) : (
            <button
              title='Visualizza storico fatture'
              className="invoice-history"
              onClick={() => onToggleHistory(true)}
            >
              <FontAwesomeIcon icon={faClock} />
              <span className="invoice-history-text">Storico</span>
            </button>
          )}
          
          <button
            title='Filtra fatture'
            className="filter-button"
            onClick={onOpenFilter}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span className="filter-text">Filtra</span>
          </button>

          <button className="app-logout" onClick={onLogout}>
            <FontAwesomeIcon icon={faUser} />
            <span className="app-logout-text">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;