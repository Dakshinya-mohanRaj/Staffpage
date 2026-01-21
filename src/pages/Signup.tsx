import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Disable scroll ONLY for this page
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      alert("Account already exists");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created. Please login.");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",            // ✅ use height (not minHeight)
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "150px",
        overflow: "hidden",         // ✅ extra safety
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          color: "#fff",
          marginBottom: "4rem",
          letterSpacing: "2px",
          fontSize: "40px",
        }}
      >
        SIGN UP
      </h1>

      {/* SIGNUP BOX */}
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
        <label style={{ marginBottom: "1rem" }}>Email :</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "2rem",
          }}
        />

        <label style={{ marginBottom: "1rem" }}>Password :</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "3rem",
          }}
        />

        <button
          onClick={handleSignup}
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
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Signup;
