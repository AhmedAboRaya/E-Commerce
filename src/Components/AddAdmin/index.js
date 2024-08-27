import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAdmin = (admin) => {
    fetch("http://localhost:7000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    addAdmin(formData);

    setTimeout(() => {
      setLoading(false);
      setFormData({
        fname: "",
        lname: "",
        email: "",
        pass: "",
        role: "admin",
      });
      toast.success("Admin added", { duration: 2000 });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 animate-fadeIn">
      <div>
        <Toaster />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          First Name
        </label>
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          className="border rounded py-2 px-3 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Last Name
        </label>
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          className="border rounded py-2 px-3 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded py-2 px-3 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          name="pass"
          value={formData.pass}
          onChange={handleChange}
          className="border rounded py-2 px-3 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Role
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          className="border rounded py-2 px-3 w-full"
          readOnly
        />
      </div>
      <button
        type="submit"
        className="bg-[#e274a9] text-white py-2 px-4 rounded hover:bg-[#c25888]"
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <div
            className="spinner-border text-light"
            role="status"
            style={{ width: "1rem", height: "1rem" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Add Admin"
        )}
      </button>
    </form>
  );
};

export default AddAdmin;
