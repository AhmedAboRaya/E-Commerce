import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordTrue, setIsPasswordTrue] = useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  const user = users.find((u) => u.email === email && u.pass === password);
  if (user) {
    setUserRole(user.role);
    setIsPasswordTrue(true);
    console.log("Saving email to localStorage:", email);
    localStorage.setItem("email", email);
    navigate(user.role === "admin" ? "/admin" : "/user");
  } else {
    console.log("Invalid login credentials"); 
    setIsPasswordTrue(false);
  }
  setLoading(false);
};

  useEffect(() => {
    console.log(userRole);
  }, [userRole]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label className="text-gray-600">Remember me</label>
            </div>
            <Link to="#" className="text-pink-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          {!isPasswordTrue && (
            <p className="text-red-500 text-center">Email or Password wrong</p>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 flex justify-center items-center"
          >
            {loading ? <Spinner animation="border" /> : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
