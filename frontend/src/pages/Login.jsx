import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    const res = await axios.post("http://localhost:8080/api/login", user);

    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login Success");
      nav("/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })} />

      <input placeholder="Password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })} />

      <button onClick={login}>Login</button>

      <button onClick={() => nav("/")}>
  New user? Signup
</button>
    </div>
  );
}

export default Login;