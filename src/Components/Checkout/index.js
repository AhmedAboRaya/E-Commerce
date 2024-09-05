import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const userEmail = localStorage.getItem("email");
  const { id } = useParams();
  const [product, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [visaDetails, setVisaDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then((response) => response.json())
      .then((product) => {
        setTimeout(() => {
          setProducts(product);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!name) validationErrors.name = "Name is required";
    if (!address) validationErrors.address = "Address is required";
    if (!mobile || mobile.length < 10) validationErrors.mobile = "Valid mobile number is required";

    if (paymentMethod === "visa") {
      if (!visaDetails.cardNumber || visaDetails.cardNumber.length !== 16) validationErrors.cardNumber = "Valid card number is required";
      if (!visaDetails.expiryDate) validationErrors.expiryDate = "Expiry date is required";
      if (!visaDetails.cvv || visaDetails.cvv.length !== 3) validationErrors.cvv = "Valid CVV is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const formData = {
        user: {
          name,
          address,
          mobile,
          email,
          paymentMethod,
          visaDetails,
        },
        product,
        status: "pending", 
        date: new Date().toISOString().split('T')[0], 
      };

      fetch("http://localhost:9000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Checkout successful:", data); // Debugging
          toast.success("Product is pending now");
          navigate("/user/purchases");

          setName("");
          setAddress("");
          setMobile("");
          setEmail(userEmail); 
          setPaymentMethod("cash");
          setVisaDetails({ cardNumber: "", expiryDate: "", cvv: "" });
        })
        .catch((error) => {
          console.error("Error submitting checkout:", error);
          alert("Error during checkout. Please try again.");
        });
    }
  };

  const handleVisaInputChange = (e) => {
    const { name, value } = e.target;
    setVisaDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* ToastContainer placed here to ensure it renders properly */}
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="flex justify-center col-span-2 mt-11">
            <Spinner animation="border" style={{ color: "#e274a9" }} />
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-6">
              <h1 className="text-2xl font-bold mb-2 text-pink-500">Product Details</h1>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md h-auto object-contain mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold mb-1 text-pink-500">{product.name}</h2>
                <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                <p className="text-gray-700 mb-1">Brand: {product.brand}</p>
                <p className="text-gray-700 mb-1">Category: {product.category}</p>
                <p className="text-gray-700 mb-1">Screen Size: {product.specs.screenSize}</p>
                <p className="text-gray-700 mb-1">Storage: {product.specs.storage}</p>
                {product.category === "Laptop" && (
                  <>
                    <p className="text-gray-700 mb-1">RAM: {product.specs.ram}</p>
                    <p className="text-gray-700 mb-1">Processor: {product.specs.processor}</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number:</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method:</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                  >
                    <option value="cash">Cash</option>
                    <option value="visa">Visa</option>
                  </select>
                </div>

                {paymentMethod === "visa" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number:</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={visaDetails.cardNumber}
                        onChange={handleVisaInputChange}
                        placeholder="Enter 16-digit card number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={visaDetails.expiryDate}
                        onChange={handleVisaInputChange}
                        placeholder="MM/YY"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVV:</label>
                      <input
                        type="text"
                        name="cvv"
                        value={visaDetails.cvv}
                        onChange={handleVisaInputChange}
                        placeholder="3-digit CVV"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                      />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600"
                >
                  Confirm Purchase
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;
