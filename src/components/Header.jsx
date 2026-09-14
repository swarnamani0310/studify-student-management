import {
  Search,
  Bell,
  LogOut,
  X
} from "lucide-react";

function Header({
  searchTerm,
  setSearchTerm,
  showNotifications,
  setShowNotifications,
  onLogout
}) {

  return (
    <header className="top-header">

      <div className="page-heading">

        <p>
          Dashboard
        </p>

        <h2>
          Good evening, Deepak
        </h2>

      </div>

      <div className="header-actions">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (

            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              <X size={14} />
            </button>

          )}

        </div>

        <div className="notification-wrapper">

          <button
            className="notification-button"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >

            <Bell size={19} />

            <span className="notification-dot"></span>

          </button>

          {showNotifications && (

            <div className="notification-panel">

              <div className="notification-header">

                <strong>
                  Notifications
                </strong>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  <X size={15} />
                </button>

              </div>

              <div className="notification-item">

                <div className="notification-icon">
                  <Bell size={15} />
                </div>

                <div>
                  <strong>
                    Student records updated
                  </strong>

                  <span>
                    Your dashboard is up to date.
                  </span>
                </div>

              </div>

            </div>

          )}

        </div>

        <div className="header-profile">

          <div className="header-avatar">
            SM
          </div>

          <div>

            <strong>
              Swarna M
            </strong>

            <span>
              Admin
            </span>

          </div>

        </div>

        <button
          className="header-logout"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={18} />
        </button>

      </div>

    </header>
  );
}

export default Header;
