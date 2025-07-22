import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        // save the JWT so you can use it later
        localStorage.setItem("token", data.access_token);
        alert("Login successful!");
        navigate("/");

        // tell App.js you’re logged in (if you pass onLogin)
        if (onLogin) onLogin();
      } else {
        alert(data.msg || "Invalid login");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Failed to connect to server");
    }
  };

  return (
//    <form onSubmit={handleSubmit} className="login-form">
//      <h2>Login</h2>
//      <input
//        value={username}
//        onChange={(e) => setUsername(e.target.value)}
//        placeholder="Username"
//        required
//      />
//      <input
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//        placeholder="Password"
//        required
//      />
//      <button type="submit">Login</button>
//    </form>
//    <div className="container mt-5">
//      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
//        <h2 className="text-center mb-4">Login</h2>
//        <form>
//          <div className="form-group mb-3">
//            <label>Username</label>
//            <input type="text" className="form-control" placeholder="Enter username" />
//          </div>
//          <div className="form-group mb-3">
//            <label>Password</label>
//            <input type="password" className="form-control" placeholder="Enter password" />
//          </div>
//          <button type="submit" className="btn btn-primary w-100">Login</button>
//        </form>
//      </div>
//    </div>

<form onSubmit={handleSubmit} className="container mt-5">
  <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
    <h2 className="text-center mb-4">Login</h2>

    <div className="form-group mb-3">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">
      Login
    </button>
  </div>
</form>


  );
}

export default Login;
