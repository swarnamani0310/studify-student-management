import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";

function Sidebar({
  activePage,
  setActivePage,
  onLogout
}) {

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Students",
      icon: Users
    },
    {
      name: "Courses",
      icon: BookOpen
    },
    {
      name: "Analytics",
      icon: BarChart3
    }
  ];

  const systemItems = [
    {
      name: "Settings",
      icon: Settings
    },
    {
      name: "Help & Support",
      icon: HelpCircle
    }
  ];

  return (
    <aside className="sidebar">

      <div className="brand">

        <div className="brand-mark">
          S
        </div>

        <div>
          <h1>STUDIFY</h1>
          <span>Student Management</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-label">
          MAIN MENU
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item.name)
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </button>
          );

        })}

        <p className="nav-label secondary-label">
          SYSTEM
        </p>

        {systemItems.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item.name)
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </button>
          );

        })}

      </nav>

      <div className="sidebar-user">

        <div className="user-avatar">
          SM
        </div>

        <div className="user-info">

          <strong>Swarna M

          </strong>

          <span>
            Administrator
          </span>

        </div>

        <button
          className="sidebar-logout"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={17} />
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
