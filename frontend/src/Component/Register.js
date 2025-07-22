
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Register(){
const[email, setEmail] = useState("");
const[password, setPassword] = useState("");
const navigate = useNavigate();

const handleRegister = async (e) =>{
e.preventDefault();
try {
const res = await fetch("http://127.0.0.1:5000/register",{
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({ email, password}),
});

const data = await res.json();

if (res.ok) {
alert("Registration Successfully! you can now log in.");
navigate("/login")
}
else {
alert(data.msg || "Registration failed.");
}
}
catch(err) {
console.error("Register error:",err);
alert("Failed to connect to server");
}
};

return(

<form onSubmit={handleRegister} className="container mt-5">
  <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
    <h2 className="text-center mb-4">Register</h2>

    <div className="form-group mb-3">
      <label htmlFor="username">Email</label>
      <input
        id="username"
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
export default Register;