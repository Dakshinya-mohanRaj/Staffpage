import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import StaffDashboard from "./pages/StaffDashboard";
import Timetable from "./pages/Timetable";
import Students from "./pages/students";
import Attendance from "./pages/Attendance";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/students" element={<Students />} />

        {/* ✅ FIXED HERE */}
        <Route path="/students" element={<Students />} />

        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
