import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StudentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= STATES ================= */
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [student, setStudent] = useState<any>(null);

  const [editMode, setEditMode] = useState(false);
  const [editedAttendance, setEditedAttendance] = useState<string[]>([]);

  /* ===== PROFILE DROPDOWN ===== */
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ================= MOCK DATA ================= */
  const mockStudent = {
    name: "Arun Kumar",
    roll: "21CS001",
    year: "I st Year",
    section: "A",
    attendance: [
      "Present",
      "Present",
      "Absent",
      "Present",
      "Present",
      "OD",
      "Present",
    ],
  };

  /* ================= FUNCTIONS ================= */
  const handleSearch = () => {
    if (!query || !year || !section) {
      alert("Please enter all fields");
      return;
    }
    setStudent(mockStudent);
    setEditedAttendance([...mockStudent.attendance]);
    setEditMode(false);
  };

  const handleAttendanceChange = (index: number, value: string) => {
    setEditedAttendance((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const handleSave = () => {
    setStudent((prev: any) => ({
      ...prev,
      attendance: editedAttendance,
    }));
    setEditMode(false);
    alert("Attendance updated successfully!");
  };

  const navClass = (path: string) =>
    location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <>
      <div className="page">
        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <div>
            {/* PROFILE */}
            <div className="profile-box" ref={profileRef}>
              <div
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              >
                👤
              </div>
              <div className="profile-name">Staff</div>

              {showProfile && (
                <div className="profile-popup">
                  <p><strong>Name:</strong> Staff Name</p>
                  <p><strong>Email:</strong> staff@ksrce.ac.in</p>
                  <p><strong>Phone:</strong> 9876543210</p>
                  <p><strong>Course:</strong> CSE</p>
                </div>
              )}
            </div>

            <div className={navClass("/dashboard")} onClick={() => navigate("/dashboard")}>
              🏠 Home
            </div>

            <div className={navClass("/timetable")} onClick={() => navigate("/timetable")}>
             📅 Time table
            </div>

            <div className="nav-item active">🎓 Student Details</div>

            <div className={navClass("/attendance")} onClick={() => navigate("/attendance")}>
               ✅  Attendance
            </div>
          </div>

          <button className="logout" onClick={() => navigate("/")}>
            ⏻ Sign out
          </button>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="main">
          <h2>Student Details</h2>

          {/* SEARCH BAR */}
          <div className="search-bar">
            <input
              placeholder="Student Name / Roll No"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              <option>I st Year</option>
              <option>II nd Year</option>
              <option>III rd Year</option>
              <option>IV th Year</option>
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <button onClick={handleSearch}>Search</button>
          </div>

          {/* STUDENT CARD */}
          {student && (
            <div className="card">
              <h3>
                {student.name} ({student.roll})
              </h3>
              <p>
                {student.year} - Section {student.section}
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {student.attendance.map((status: string, i: number) => (
                    <tr key={i}>
                      <td>Period {i + 1}</td>
                      <td>
                        {editMode ? (
                          <select
                            value={editedAttendance[i]}
                            onChange={(e) =>
                              handleAttendanceChange(i, e.target.value)
                            }
                          >
                            <option>Present</option>
                            <option>Absent</option>
                            <option>OD</option>
                          </select>
                        ) : (
                          status
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="actions">
                {!editMode ? (
                  <button onClick={() => setEditMode(true)}>
                    ✏️ Edit Attendance
                  </button>
                ) : (
                  <>
                    <button className="save" onClick={handleSave}>
                      💾 Save
                    </button>
                    <button
                      className="cancel"
                      onClick={() => {
                        setEditedAttendance([...student.attendance]);
                        setEditMode(false);
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        html, body {
          margin: 0;
          height: 100%;
          overflow: hidden;
          font-family: "Segoe UI", sans-serif;
        }

        .page {
          display: flex;
          height: 100vh;
        }

      .sidebar {
  width: 200px; /* SAME AS STAFF DASHBOARD */
  background: linear-gradient(180deg, #4f83a6, #2f5f7f);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 20px 20px 0;
  color: white;
}



        .profile-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 25px;
          position: relative;
        }

        /* Profile styles */
        .profile-box {
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
          color: #fff;
          font-size: 14px;
        }

        .profile-popup {
          background: #ffffff;
          padding: 14px;
          border-radius: 12px;
          width: 200px;
          margin-top: 10px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          font-size: 13px;
          color: #2c4a63;
          text-align: left;
        }

        .profile-popup p {
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

        /* MAIN */
        .main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .search-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
        }

        input, select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .search-bar button {
          background: #2f7df6;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }

        th {
          background: #d9ecff;
        }

        .actions {
          text-align: right;
          margin-top: 20px;
        }

        .actions button {
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          margin-left: 10px;
        }

        .save {
          background: #2e9f4b;
          color: white;
        }

        .cancel {
          background: #999;
          color: white;
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
    </>
  );
};

export default StudentDetails;
