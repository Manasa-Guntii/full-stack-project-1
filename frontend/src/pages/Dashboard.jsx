import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const nav = useNavigate();

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});

  const API = "http://localhost:8080/api";

  const loadUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (id) => {
    await axios.put(`${API}/update/${id}`, editUser);
    loadUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    loadUsers();
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <table border="1">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>

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
      </table>
    </div>
  );
}

export default Dashboard;