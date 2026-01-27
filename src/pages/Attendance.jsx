import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ===== DAYS & PERIODS ===== */
const periods = [
  "9:00 - 9:50",
  "9:50 - 10:40",
  "10:55 - 11:45",
  "11:45 - 12:35",
  "1:30 - 2:20",
  "2:20 - 3:10",
  "3:10 - 4:00",
];

/* ===== YEAR → SECTIONS ===== */
const yearSections: Record<string, string[]> = {
  "I st Year": ["A", "B", "C"],
  "II nd Year": ["A", "B", "C", "D"],
  "III rd Year": ["A", "B"],
  "IV th Year": ["A", "B"],
};

/* ===== MOCK DATA ===== */
const initialData = [
  {
    name: "Arun",
    regNo: "21CS001",
    year: "II nd Year",
    section: "A",
    attendance: ["P", "P", "A", "P", "P", "P", "A"],
  },
  {
    name: "Bala",
    regNo: "21CS002",
    year: "II nd Year",
    section: "A",
    attendance: ["P", "A", "P", "P", "P", "P", "P"],
  },
  {
    name: "Chandru",
    regNo: "22CS011",
    year: "I st Year",
    section: "A",
    attendance: ["P", "P", "P", "P", "A", "P", "P"],
  },
];

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [records, setRecords] = useState(initialData);

  /* 🔽 PROFILE DROPDOWN STATE */
  const [showProfile, setShowProfile] = useState(false);

  const filteredRecords = records.filter(
    (s) => s.year === year && s.section === section
  );

  const handleEdit = (
    studentIndex: number,
    periodIndex: number,
    value: string
  ) => {
    const updated = [...records];
    updated[studentIndex].attendance[periodIndex] = value;
    setRecords(updated);
  };

  const handleSubmit = () => {
    alert("Attendance saved successfully!");
  };

  const activeClass = (path: string) =>
    location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <>
      {/* ===== GLOBAL FIX ===== */}
      <style>{`
        html, body {
          height: 100%;
          margin: 0;
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
          scrollbar-gutter: stable;
          font-family: "Segoe UI", sans-serif;
        }

        .page {
          display: flex;
          height: 100vh;
          overflow: hidden;
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
        }

        .profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 25px;
          position: relative;
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
          color: white;
        }

        /* 🔽 PROFILE DROPDOWN */
        .profile-dropdown {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          background: #ffffff;
          color: #2c4a63;
          padding: 14px;
          border-radius: 12px;
          font-size: 13px;
          text-align: left;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          z-index: 999;
        }

        .profile-dropdown p {
          margin: 6px 0;
        }

        .nav-item {
          background: rgba(255,255,255,0.15);
          padding: 15px 16px;
          margin-bottom: 14px;
          border-radius: 12px;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.35);
          transform: translateX(4px);
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
          padding: 30px 40px;
          overflow-y: auto;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filters select {
          padding: 8px 14px;
          border-radius: 8px;
          margin-left: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #9aa7a3;
          padding: 8px;
          text-align: center;
          font-size: 14px;
        }

        th {
          background: #c7e6ea;
        }

        select.att {
          width: 100%;
          padding: 4px;
          border-radius: 6px;
        }

        .empty {
          text-align: center;
          color: #777;
          margin-top: 40px;
        }

        .submit-box {
          text-align: center;
          margin-top: 20px;
        }

        .submit-btn {
          padding: 12px 36px;
          font-size: 16px;
          border-radius: 10px;
          border: none;
          background: #2f7df6;
          color: white;
          font-weight: 600;
          cursor: pointer;
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
        {/* ===== SIDEBAR ===== */}
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

            <div className={activeClass("/dashboard")} onClick={() => navigate("/dashboard")}>
              🏠 Home
            </div>

            <div className={activeClass("/timetable")} onClick={() => navigate("/timetable")}>
              📅 Time table
            </div>

            <div className={activeClass("/students")} onClick={() => navigate("/students")}>
              👨‍🎓 Student details
            </div>

            <div className="nav-item active"> ✅  Attendance</div>
          </div>

          <button className="logout" onClick={() => navigate("/")}>
            ⏻ Sign out
          </button>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="main">
          <div className="top">
            <h2>Attendance</h2>

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

          {!year || !section ? (
            <div className="empty">
              Please select Year and Section to view attendance
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Register No</th>
                    {periods.map((p) => (
                      <th key={p}>{p}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredRecords.map((student, sIdx) => (
                    <tr key={student.regNo}>
                      <td>{sIdx + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.regNo}</td>

                      {student.attendance.map((val, pIdx) => (
                        <td key={pIdx}>
                          <select
                            className="att"
                            value={val}
                            onChange={(e) =>
                              handleEdit(
                                records.findIndex(
                                  (r) => r.regNo === student.regNo
                                ),
                                pIdx,
                                e.target.value
                              )
                            }
                          >
                            <option value="P">P</option>
                            <option value="A">A</option>
                            <option value="OD">OD</option>
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="submit-box">
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Attendance
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Attendance;
