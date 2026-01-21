import { useNavigate } from "react-router-dom";

const getSectionPercent = (present: number, total: number) =>
  Math.round((present / total) * 100);

const getYearPercent = (
  sections: Record<string, { present: number; total: number }>
) => {
  const totalPresent = Object.values(sections).reduce(
    (s, v) => s + v.present,
    0
  );
  const total = Object.values(sections).reduce(
    (s, v) => s + v.total,
    0
  );
  return Math.round((totalPresent / total) * 100);
};
const yearData = [
  {
    year: "I st Year",
    sections: ["Sec A", "Sec B", "Sec C"],
  },
  {
    year: "II nd Year",
    sections: ["Sec A", "Sec B", "Sec C", "Sec D"],
  },
  {
    year: "III rd Year",
    sections: ["Sec A", "Sec B"],
  },
  {
    year: "IV th Year",
    sections: ["Sec A", "Sec B"],
  },
];
const attendanceData = {
  "I st Year": {
    "Sec A": { present: 42, total: 50 },
    "Sec B": { present: 38, total: 50 },
    "Sec C": { present: 45, total: 50 },
  },
  "II nd Year": {
    "Sec A": { present: 40, total: 50 },
    "Sec B": { present: 44, total: 50 },
    "Sec C": { present: 39, total: 50 },
    "Sec D": { present: 41, total: 50 },
  },
  "III rd Year": {
    "Sec A": { present: 35, total: 50 },
    "Sec B": { present: 37, total: 50 },
  },
  "IV th Year": {
    "Sec A": { present: 43, total: 50 },
    "Sec B": { present: 40, total: 50 },
  },
};

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
  <div className="sidebar-profile">Profile</div>

  <button
    className="nav-btn active"
    onClick={() => navigate("/dashboard")}
  >
    🏠 Home
  </button>

  <button
    className="nav-btn"
    onClick={() => navigate("/timetable")}
  >
    🕒 Time table
  </button>

  <button
    className="nav-btn"
    onClick={() => navigate("/students")}
  >
    🎓 Student details
  </button>

  <button
    className="nav-btn"
    onClick={() => navigate("/attendance")}
  >
    📋 Attendance
  </button>

  <button
    className="logout"
    onClick={() => navigate("/")}
  >
    Sign out
  </button>
</aside>


      {/* MAIN */}
      <main className="dashboard-main">

        {/* PIE CARD */}
        <div className="card pie-card">
          <h3>Today's Attendance</h3>
          <div className="pie-circle">
            <div className="pie-center">
              <p>Present : 45</p>
              <p>Absent : 5</p>
              <p>OD : 3</p>
            </div>
          </div>
        </div>
        {/* YEAR OVERALL PROGRESS */}
<div className="year-progress">
  {Object.entries(attendanceData).map(([year, sections]) => {
    const percent = getYearPercent(sections);

    return (
      <div key={year} className="year-progress-row">
        <span>{year}</span>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <span className="percent-text">{percent}%</span>
      </div>
    );
  })}
</div>


        {/* BAR CHART SECTION */}
        {/* BAR CHART SECTION */}
<div className="card bar-section">

  <div className="years-row"> {/* ✅ ADD THIS */}

    {Object.entries(attendanceData).map(([year, sections]) => (
      <div key={year} className="year-block">
        <h4>{year}</h4>

        <div className="sections-row">
          {Object.entries(sections).map(([sec, data]) => {
            const percent = Math.round(
              (data.present / data.total) * 100
            );

            return (
              <div key={sec} className="bar-wrapper">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ height: `${percent}%` }}
                  />
                </div>
                <span className="percent">{percent}%</span>
                <span className="label">{sec}</span>
              </div>
            );
          })}
        </div>
      </div>
    ))}
 </div>  

        </div>

      </main>
    </div>
  );
};

export default StaffDashboard;
