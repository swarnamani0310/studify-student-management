function StatCard({
  title,
  value,
  description,
  icon: Icon
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          <Icon size={20} />
        </div>

        <span className="stat-menu">
          ...
        </span>

      </div>

      <div className="stat-content">

        <p>{title}</p>

        <h3>{value}</h3>

        <span className="stat-description">
          {description}
        </span>

      </div>

    </div>
  );
}

export default StatCard;