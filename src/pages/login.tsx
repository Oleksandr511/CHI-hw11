import React from "react";
import LoginForm from "../components/LoginForm";
// import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div
      style={{  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#a39f9f" }}>Login Page</h1>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <LoginForm />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>
          {/* Don't have account? <Link to="/register">Register</Link> */}
        </h3>
      </div>
    </div>
  );
}
