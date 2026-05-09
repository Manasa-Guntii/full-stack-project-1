import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const nav = useNavigate();

  const API = "http://16.112.122.5:8080/api";

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (error) {
      console.log("Load Users Error:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (id) => {
    try {
      await axios.put(`${API}/update/${id}`, editUser);
      alert("User Updated");
      loadUsers();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      alert("User Deleted");
      loadUsers();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <table border="1" style={{ margin: "20px auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <input
                  defaultValue={u.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
              </td>

              <td>
                <input
                  defaultValue={u.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </td>

              <td>
                <input
                  defaultValue={u.password}
                  onChange={(e) =>
                    setEditUser({ ...editUser, password: e.target.value })
                  }
                />
              </td>

              <td>
                <button onClick={() => updateUser(u.id)}>Update</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;