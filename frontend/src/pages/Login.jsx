import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  const API = "http://16.112.122.5:8080/api";

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, user);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login Success");
        nav("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert("Login Failed (Check backend / server)");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

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

      <button onClick={login} style={{ padding: "8px 20px" }}>
        Login
      </button>

      <br />

      <button
        onClick={() => nav("/")}
        style={{
          marginTop: "10px",
          background: "transparent",
          border: "none",
          color: "blue",
          cursor: "pointer"
        }}
      >
        New user? Signup
      </button>
    </div>
  );
}

export default Login;