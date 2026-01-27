import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  /* 🕒 Date & Time state */
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="nav">
            {/* Profile Section */}
            <div className="profile-box">
              <div
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              >
                👤
              </div>
              <p className="profile-name">Staff</p>

              {showProfile && (
                <div className="profile-popup">
                  <p><strong>Name:</strong> Staff Name</p>
                  <p><strong>Email:</strong> staff@ksrce.ac.in</p>
                  <p><strong>Phone:</strong> 9876543210</p>
                  <p><strong>Course:</strong> CSE</p>
                </div>
              )}
            </div>

            <div className="nav-item" onClick={() => navigate("/dashboard")}>
              🏠 Home
            </div>

            <div className="nav-item" onClick={() => navigate("/timetable")}>
              📅 Time table
            </div>

            <div className="nav-item" onClick={() => navigate("/students")}>
              👨‍🎓 Student details
            </div>

            <div className="nav-item" onClick={() => navigate("/attendance")}>
              ✅ Attendance
            </div>
          </div>

          <button className="logout" onClick={() => navigate("/")}>
            ⏻ Sign out
          </button>
        </aside>

        {/* Main Content */}
        <main className="main">
          {/* 🕒 Date & Time (Top Right) */}
          <div className="datetime-box">
            <div className="day">
              {dateTime.toLocaleDateString("en-IN", { weekday: "long" })}
            </div>
            <div className="date">
              {dateTime.toLocaleDateString("en-IN")}
            </div>
            <div className="time">
              {dateTime.toLocaleTimeString("en-IN")}
            </div>
          </div>

          <h2 className="title">Today's Attendance</h2>

          {/* Donut Chart */}
          <div className="top-section">
            <div className="donut">
              <div className="donut-center">
                <p>Present : 45</p>
                <p>Absent : 5</p>
                <p>OD : 3</p>
              </div>
            </div>
          </div>

          {/* Year Progress */}
          <div className="progress-section">
            {[
              { year: "I st Year", value: 83 },
              { year: "II nd Year", value: 82 },
              { year: "III rd Year", value: 72 },
              { year: "IV th Year", value: 83 },
            ].map((item, index) => (
              <div className="progress-row" key={index}>
                <span>{item.year}</span>
                <div className="bar">
                  <div
                    className="fill"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>

          {/* Section Cards */}
          <div className="section-card">
            <h3>Attendance by Sections</h3>

            <div className="cards">
              {[
                {
                  year: "I st Year",
                  data: [
                    { sec: "Sec A", val: 84 },
                    { sec: "Sec B", val: 78 },
                    { sec: "Sec C", val: 81 },
                  ],
                },
                {
                  year: "II nd Year",
                  data: [
                    { sec: "Sec A", val: 80 },
                    { sec: "Sec B", val: 85 },
                    { sec: "Sec C", val: 82 },
                    { sec: "Sec D", val: 79 },
                  ],
                },
                {
                  year: "III rd Year",
                  data: [
                    { sec: "Sec A", val: 79 },
                    { sec: "Sec D", val: 76 },
                  ],
                },
                {
                  year: "IV th Year",
                  data: [
                    { sec: "Sec A", val: 86 },
                    { sec: "Sec B", val: 87 },
                  ],
                },
              ].map((group, i) => (
                <div className="card" key={i}>
                  <h4>{group.year}</h4>
                  <div className="circle-row">
                    {group.data.map((d, j) => (
                      <div className="circle-box" key={j}>
                        <div className="circle">{d.val}%</div>
                        <p>{d.sec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        body {
          margin: 0;
          background: #eaf1fb;
        }

        .dashboard {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 240px;
          background: linear-gradient(180deg, #4f83a6, #2f5f7f);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 0 20px 20px 0;
        }

  position: relative;
  z-index: 100;   /* 🔥 ADD THIS */
}

.main {
  flex: 1;
  padding: 30px 50px;
  overflow-y: auto;

  position: relative;
  z-index: 1;     /* 🔥 ADD THIS */
}

.nav-item {
  pointer-events: auto; /* 🔥 ADD THIS */
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
         
        }
        .logout {
          background: #e23b44;
          border: none;
          padding: 12px;
          border-radius: 14px;
          color: white;
          cursor: pointer;
        }
        .main {
          flex: 1;
          padding: 30px 50px;
          overflow-y: auto;
          position: relative;
        }

        /* 🕒 Date & Time */
        .datetime-box {
          position: absolute;
          top: 20px;
          right: 30px;
          text-align: right;
          color: #2c4a63;
        }

        .datetime-box .day {
          font-weight: 600;
          font-size: 14px;
        }

        .datetime-box .date {
          font-size: 13px;
        }

        .datetime-box .time {
          font-size: 13px;
          font-weight: 500;
        }

        .top-section {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }

        .donut {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: conic-gradient(
            #6fa8dc 0% 60%,
            #f6b26b 60% 70%,
            #93c47d 70% 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-center {
          width: 110px;
          height: 110px;
          background: #eaf1fb;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 11.5px;
          padding-left: 5px;
        }

        .progress-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
        }

        .bar {
          flex: 1;
          height: 8px;
          background: #d9e5f5;
          border-radius: 10px;
        }

        .fill {
          height: 100%;
          background: #5b9bd5;
        }

        .section-card {
          margin-top: 40px;
          background: rgba(255,255,255,0.6);
          padding: 25px;
          border-radius: 20px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .card {
          background: #f4f8ff;
          padding: 16px;
          border-radius: 14px;
          text-align: center;
        }

        .circle-row {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 12px;
        }

        .circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 7px solid #5b9bd5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        /* Profile styles */
        .profile-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 18px;
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
  margin-bottom: 4px; /* 🔥 reduced gap */
  cursor: pointer;
}


        .profile-name {
  color: #fff;
  font-size: 14px;
  margin: 0;          /* 🔥 THIS FIXES GAP */
  line-height: 1.2;
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

export default Attendance;
