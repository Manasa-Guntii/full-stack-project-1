import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate();

  const API = "https://api.revnix.co.in/api";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    try {
      await axios.post(`${API}/signup`, user);
      alert("Signup Success");
      nav("/login");
    } catch (error) {
      console.log("Signup Error:", error);
      alert("Signup Failed or Server Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <button onClick={signup} style={{ padding: "8px 20px" }}>
        Signup
      </button>

      <br />

      <button
        onClick={() => nav("/login")}
        style={{ marginTop: "10px", background: "transparent", border: "none", color: "blue" }}
      >
        Already user? Login
      </button>
    </div>
  );
}

export default Signup;