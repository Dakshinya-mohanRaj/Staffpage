import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const generatedOtp = "123456"; // demo OTP

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ✅ EMAIL VALIDATION */
  const handleEmailSubmit = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!email.endsWith("@ksrce.ac.in")) {
      alert("Invalid email. Use your official ksrce.ac.in email");
      return;
    }

    alert("OTP sent to your email (demo)");
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }
    alert("OTP verified");
  };

  const verifyOtpAndReset = () => {
    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      alert("User not found");
      return;
    }

    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Password reset successful");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          color: "#fff",
          fontSize: "40px",
          letterSpacing: "2px",
          marginTop: "180px",
          marginBottom: "4rem",
        }}
      >
        RESET PASSWORD
      </h1>

      {/* FORM BOX */}
      <div
        style={{
          width: "400px",
          padding: "2.5rem",
          borderRadius: "16px",
          background: "rgba(187, 189, 192, 0.29)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* EMAIL */}
        <label style={{ marginBottom: "0.5rem" }}>Email :</label>

        <input
          type="email"
          placeholder="example@ksrce.ac.in"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "4px",
          }}
        />

        {/* EMAIL HINT */}
        <span
          style={{
            fontSize: "12px",
            color: "#e0e0e0",
            marginBottom: "1rem",
          }}
        >
          Use your official email (example: staff@ksrce.ac.in)
        </span>

        {/* SUBMIT */}
        <button
          onClick={handleEmailSubmit}
          style={{
            width: "120px",
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#94d845",
            color: "black",
            fontWeight: "600",
            marginBottom: "1.5rem",
            alignSelf: "center",
          }}
        >
          Submit
        </button>

        {/* OTP */}
        <label style={{ marginBottom: "1rem" }}>OTP :</label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "0.8rem",
          }}
        />

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerifyOtp}
          style={{
            width: "120px",
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#94d845",
            color: "black",
            fontWeight: "600",
            marginBottom: "1.5rem",
            alignSelf: "center",
          }}
        >
          Verify
        </button>

        {/* NEW PASSWORD */}
        <label style={{ marginBottom: "1rem" }}>New Password :</label>
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "2rem",
          }}
        />

        {/* RESET */}
        <button
          onClick={verifyOtpAndReset}
          style={{
            padding: "13px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#94d845",
            color: "black",
            fontWeight: "600",
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
