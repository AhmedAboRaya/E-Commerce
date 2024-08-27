import { useEffect, useState } from "react";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("admin"); // Default filter to 'admin'

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user => user.role === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#cb0c6b]">Accounts List</h1>
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg py-2 px-4 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
      </div>
      {filteredUsers.length > 0 ? (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl duration-500 border-1 border-[#cb0c6b]">
              <h2 className="text-xl font-semibold text-[#cb0c6b]">{user.fname} {user.lname}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Password: {user.pass}</p>
              <p className="text-gray-600">Role: {user.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600">No users found.</div>
      )}
    </div>
  );
};

export default Accounts;
