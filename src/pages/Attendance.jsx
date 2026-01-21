const Attendance = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="profile">Profile</div>
        <button>🏠 Home</button>
        <button>🕒 Time table</button>
        <button>👨‍🎓 Student details</button>
        <button>📋 Attendence</button>
        <button className="logout">Sign out</button>
      </div>

      <div className="main-content">
        <div className="top-filters">
          <select>
            <option>Year</option>
          </select>
          <select>
            <option>Section</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
