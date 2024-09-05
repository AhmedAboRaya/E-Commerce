import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("admin");
  const [deletingUserId, setDeletingUserId] = useState(null);

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

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setDeletingUserId(userId);
      fetch(`http://localhost:7000/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setUsers(users.filter(user => user.id !== userId));
            toast.success("User deleted successfully!");
          } else {
            toast.error("Failed to delete user.");
          }
        })
        .catch((err) => {
          toast.error("Error deleting user.");
        })
        .finally(() => {
          setDeletingUserId(null);
        });
    }
  };

  const filteredUsers = users.filter((user) => user.role === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fadeIn">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-center mb-6 text-[#cb0c6b]">
        Accounts List
      </h1>
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
      {loading ? (
        <div className="flex justify-center mt-11">
          <Spinner animation="border" variant="pink" style={{ color: "#cb0c6b" }} />
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl duration-500 border-1 border-[#cb0c6b]"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-[#cb0c6b]">
                    {user.fname} {user.lname}
                  </h2>
                  <button
                    className="border-1 border-red-600 rounded-2xl text-red-600 hover:text-white hover:bg-red-600 duration-500"
                    onClick={() => handleDelete(user.id)}
                  >
                    <X />
                  </button>
                </div>
                <p className="text-gray-700">Email: {user.email}</p>
                <p className="text-gray-700">Password: {user.pass}</p>
                <p className="text-gray-600">Role: {user.role}</p>
              </li>
            ))
          ) : (
            <div className="text-center text-gray-600">No users found.</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Accounts;
