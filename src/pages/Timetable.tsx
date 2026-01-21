import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

const timetableData: Record<string, Record<string, Record<Day, string[]>>> = {
  "I st Year": {
    A: {
      Monday: ["Maths", "Physics", "CS", "Break", "Lab"],
      Tuesday: ["English", "Maths", "CS", "Break", "Library"],
      Wednesday: ["Physics", "CS", "Maths", "Break", "Lab"],
      Thursday: ["Chemistry", "Physics", "CS", "Break", "Maths"],
      Friday: ["Lab", "Maths", "CS", "Break", "Physics"],
    },
  },
};

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const Timetable = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const timetable =
    year && section ? timetableData[year]?.[section] : null;

  return (
    <>
      {/* =======================
          INLINE CSS
      ======================== */}
      <style>{`
      .page {
        display: flex;
        min-height: 100vh;
        background: #d7e2dd;
      }

      /* SIDEBAR */
      .sidebar {
        width: 260px;
        background: #9fdcc6;
        padding: 24px 18px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .profile {
        font-size: 24px;
        font-weight: 700;
        color: white;
        margin-bottom: 10px;
      }

      .nav-btn {
        background: #ddf8cc;
        border: none;
        border-radius: 14px;
        padding: 16px;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
      }

      .nav-btn:hover {
        background: #c8f2ad;
      }

      .signout {
        margin-top: auto;
        background: #b21f46;
        color: white;
        border: none;
        padding: 14px;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
      }

      /* MAIN */
      .main {
        flex: 1;
        padding: 30px;
      }

      .filters {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-bottom: 20px;
      }

      .filters select {
        padding: 10px 16px;
        border-radius: 6px;
        border: 1px solid #7a8a8a;
        background: #e5e5e5;
        font-size: 14px;
      }

      .card {
        background: rgba(255,255,255,0.5);
        padding: 24px;
        border-radius: 16px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: #f4fff8;
      }

      th, td {
        border: 1px solid #9aa7a3;
        padding: 12px;
        text-align: center;
      }

      th {
        background: #98d6c1;
      }

      td:first-child {
        font-weight: bold;
        background: #e6f2ee;
      }

      .break {
        background: #bfbcbc;
        font-weight: bold;
      }
      `}</style>

      {/* =======================
          PAGE
      ======================== */}
      <div className="page">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="profile">Profile</div>

          <button className="nav-btn" onClick={() => navigate("/dashboard")}>
            🏠 Home
          </button>

          <button className="nav-btn" onClick={() => navigate("/timetable")}>
            🕒 Time table
          </button>

          <button className="nav-btn">
            🎓 Student details
          </button>

          <button className="nav-btn">
            📋 Attendance
          </button>

          <button className="signout" onClick={() => navigate("/")}>
            Sign out
          </button>
        </aside>

        {/* MAIN */}
        <main className="main">

          {/* YEAR / SECTION */}
          <div className="filters">
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setSection("");
              }}
            >
              <option value="">Year</option>
              {Object.keys(timetableData).map((yr) => (
                <option key={yr}>{yr}</option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              disabled={!year}
            >
              <option value="">Section</option>
              {year &&
                Object.keys(timetableData[year as keyof typeof timetableData]).map((sec) => (
                  <option key={sec}>{sec}</option>
                ))}
            </select>
          </div>

          {/* TABLE */}
          {timetable && (
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>P1</th>
                    <th>P2</th>
                    <th>P3</th>
                    <th>Break</th>
                    <th>P4</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td>{day}</td>
                      {timetable[day]?.map((sub: string, i: number) => (
                        <td key={i} className={sub === "Break" ? "break" : ""}>
                          {sub}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default Timetable;
