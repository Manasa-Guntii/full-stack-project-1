import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const nav = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    await axios.post("http://localhost:8080/api/signup", user);
    alert("Signup Success");
    nav("/login");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })} />

      <input placeholder="Password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })} />

      <button onClick={signup}>Signup</button>

      <button onClick={() => nav("/login")}>
  Already user? Login
</button>
    </div>
  );
}

export default Signup;