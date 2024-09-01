import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (pass!== confirmPass) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    if (fname.trim() === "") {
      setError("First name cannot be empty");
      setLoading(false);
      return;
    }
    
    if (lname.trim() === "") {
      setError("Last name cannot be empty");
      setLoading(false);
      return;
    }

    if (pass.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (email.trim() === "") {
      setError("Email cannot be empty");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (users.some((user) => user.email === email)) {
      setError("Email already exists");
      setLoading(false);
      return;
    }

    if (users.some((user) => user.email === email)) {
      setError("Email already exists");
      setLoading(false);
      return;
    }

    const newUser = {
      fname,
      lname,
      email,
      pass,
      role,
    };

    try {
      const response = await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        {
            error && (
              <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
            )
          }
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 py-2 hover:bg-pink-600 text-[#ffffff]  border-2 border-[#e274a9] rounded-md duration-500 font-semibold flex items-center justify-center"
            >
              {loading ? (
                <Spinner animation="border" style={{ color: "#ffffff" }} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
