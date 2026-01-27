import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const periods = [
  "9:00 - 9:50",
  "9:50 - 10:40",
  "10:55 - 11:45",
  "11:45 - 12:35",
  "12:35 - 1:30",
  "1:30 - 2:20",
  "2:20 - 3:10",
  "3:10 - 4:00",
];

const yearSubjects: Record<string, string[]> = {
  "I st Year": [
    "Maths",
    "Physics",
    "Chemistry",
    "English",
    "Basic Programming",
    "Physics Lab",
    "Chemistry Lab",
    "Library",
    "Mentor Hour",
  ],
  "II nd Year": [
    "DBMS",
    "DAA",
    "TOC",
    "NCT",
    "AJP",
    "SSD",
    "DBMS LAB",
    "DAA LAB",
    "AJP LAB",
    "DS – II LAB",
    "Club Activity",
    "Association Activity",
  ],
  "III rd Year": [
    "OS",
    "CN",
    "AI",
    "SE",
    "Web Technology",
    "OS LAB",
    "CN LAB",
    "Mini Project",
    "Library",
  ],
  "IV th Year": [
    "Data Science",
    "Cloud Computing",
    "Cyber Security",
    "Project Work",
    "Internship",
    "Seminar",
    "Placement Training",
  ],
};

const LUNCH_INDEX = 4;

const yearSections: Record<string, string[]> = {
  "I st Year": ["A", "B", "C"],
  "II nd Year": ["A", "B", "C", "D"],
  "III rd Year": ["A", "B"],
  "IV th Year": ["A", "B"],
};

type TimetableType = Record<Day, string[]>;

const createEmptyTimetable = (): TimetableType =>
  days.reduce((acc, day) => {
    acc[day] = Array(periods.length).fill("");
    return acc;
  }, {} as TimetableType);

const Timetable = () => {
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [timetable, setTimetable] = useState<TimetableType>(
    createEmptyTimetable()
  );
  const [showProfile, setShowProfile] = useState(false);

  const editable = year && section;
  const subjects = year ? yearSubjects[year] || [] : [];

  const handleChange = (day: Day, index: number, value: string) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].map((p, i) => (i === index ? value : p)),
    }));
  };

  const handleSubmit = () => {
    if (!year || !section) {
      alert("Please select Year and Section");
      return;
    }
    alert("Timetable submitted successfully!");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        body {
          margin: 0;
          background: #eaf1fb;
        }

        .page {
          display: flex;
          height: 100vh;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 240px;
          background: linear-gradient(180deg, #4f83a6, #2f5f7f);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 0 20px 20px 0;
          color: white;
          position: relative;
          z-index: 1000;
        }

        /* PROFILE */
        .profile {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
        }

        .profile-icon {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 6px;
          cursor: pointer;
        }

        .profile-name {
          font-size: 14px;
        }

        .profile-dropdown {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 190px;
          background: #ffffff;
          color: #2c4a63;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          text-align: left;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .profile-dropdown p {
          margin: 6px 0;
        }

        /* NAV */
        .nav-wrapper {
          margin-top: 20px;
          transition: margin-top 0.12s ease-out;
        }

       
        .nav-item {
          background: rgba(255,255,255,0.18);
          padding: 16px 16px;
          margin-bottom: 14px;
          border-radius: 14px;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.25s ease;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.35);
          transform: translateX(6px);
        }

        .nav-item.active {
          background: rgba(255,255,255,0.35);
          font-weight: 600;
        }

        .logout {
          background: #e23b44;
          border: none;
          padding: 12px;
          border-radius: 14px;
          color: white;
          cursor: pointer;
        }

        /* ===== MAIN ===== */
        .main {
          flex: 1;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 30px 0 16px;
        }

        .top h2 {
          font-size: 32px;
          font-weight: 700;
          flex: 1;
          text-align: center;
        }

        .filters {
          display: flex;
          gap: 12px;
        }

        .filters select {
          padding: 8px 14px;
          border-radius: 8px;
        }

        .timetable-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .timetable-card {
          background: rgba(189, 205, 213, 0.31);
          padding: 40px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          background: white;
        }

        th, td {
          border: 1px solid #9aa7a3;
          padding: 14px 10px;
          text-align: center;
          font-size: 16px;
        }

        th {
          background: rgb(170, 226, 234);
          font-size: 15px;
        }

        td.day {
          font-weight: bold;
          background: rgba(156, 178, 171, 0.45);
          min-width: 130px;
        }

        select.period {
          width: 100%;
          height: 42px;
          font-size: 15px;
          padding: 6px;
        }
          .logout {
  background: linear-gradient(135deg, #e23b44, #c62828);
  border: none;
  padding: 12px 16px;
  border-radius: 14px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 10px rgba(226, 59, 68, 0.35);
}

.logout:hover {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(226, 59, 68, 0.5);
}

.logout:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(226, 59, 68, 0.4);
}

      `}</style>

      <div className="page">
        <aside className="sidebar">
          <div>
            <div className="profile">
              <div
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              >
                👤
              </div>
              <div className="profile-name">Staff</div>

              {showProfile && (
                <div className="profile-dropdown">
                  <p><strong>Name:</strong> Staff Name</p>
                  <p><strong>Email:</strong> staff@ksrce.ac.in</p>
                  <p><strong>Phone:</strong> 9876543210</p>
                  <p><strong>Course:</strong> CSE</p>
                </div>
              )}
            </div>

            <div className={`nav-wrapper ${showProfile ? "nav-shift" : ""}`}>
              <div className="nav-item" onClick={() => navigate("/dashboard")}>
                🏠 Home
              </div>

              <div className="nav-item active">📅 Time table</div>

              <div
                className="nav-item"
                onClick={() => navigate("/students")}
              >
                👨‍🎓 Student details
              </div>

              <div
                className="nav-item"
                onClick={() => navigate("/Attendance")}
              >
                ✅ Attendance
              </div>
            </div>
          </div>

          <button className="logout" onClick={() => navigate("/")}>
            ⏻ Sign out
          </button>
        </aside>

        <main className="main">
          <div className="top">
            <h2>Time Table</h2>

            <div className="filters">
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setSection("");
                }}
              >
                <option value="">Year</option>
                {Object.keys(yearSections).map((yr) => (
                  <option key={yr}>{yr}</option>
                ))}
              </select>

              <select
                value={section}
                disabled={!year}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">Section</option>
                {yearSections[year]?.map((sec) => (
                  <option key={sec}>{sec}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="timetable-wrapper">
            <div className="timetable-card">
              <table>
                <thead>
                  <tr>
                    <th>Day / Time</th>
                    {periods.map((p) => (
                      <th key={p}>{p}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {days.map((day, dayIndex) => (
                    <tr key={day}>
                      <td className="day">{day}</td>

                      {periods.map((_, periodIndex) => {
                        if (periodIndex === LUNCH_INDEX) {
                          if (dayIndex === 0) {
                            return (
                              <td key="lunch" rowSpan={days.length}>
                                LUNCH
                              </td>
                            );
                          }
                          return null;
                        }

                        return (
                          <td key={periodIndex}>
                            <select
                              className="period"
                              disabled={!editable}
                              value={timetable[day][periodIndex]}
                              onChange={(e) =>
                                handleChange(
                                  day,
                                  periodIndex,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select</option>
                              {subjects.map((sub) => (
                                <option key={sub}>{sub}</option>
                              ))}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  onClick={handleSubmit}
                  disabled={!year || !section}
                  style={{
                    padding: "12px 36px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    border: "none",
                    background:
                      !year || !section ? "#bdbdbd" : "#2f7df6",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Submit Timetable
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Timetable;
