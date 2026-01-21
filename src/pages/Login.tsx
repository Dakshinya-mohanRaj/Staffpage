import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Disable scroll only for Login page
  useEffect(() => {
    document.body.style.margin = "0";      // ✅ removes white edges
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = () => {
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",                 // ✅ full height
        width: "100vw",                  // ✅ full width
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "150px",
        overflow: "hidden",
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
        LOGIN
      </h1>

      {/* LOGIN BOX */}
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
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            marginBottom: "2rem",
          }}
        />

        <span
          style={{
            cursor: "pointer",
            marginBottom: "2rem",
            textAlign: "right",
            fontSize: "14px",
          }}
          onClick={() => navigate("/forgot")}
        >
          Forgot Password?
        </span>

        <button
          onClick={handleLogin}
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
          Login
        </button>

        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
