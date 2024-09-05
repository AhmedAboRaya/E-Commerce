import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const statusColors = {
  pending: "text-yellow-500",
  "under delivery": "text-sky-700",
  canceled: "text-red-500",
  delivered: "text-green-500",
};

const Purchases = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetch(`http://localhost:9000/checkout`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure that the date field exists and is formatted properly
        const updatedPurchases = data.map((purchase) => ({
          ...purchase,
          date: purchase.date || new Date().toISOString().split('T')[0], // Fallback if no date exists
        }));
        setTimeout(() => {
          setPurchases(updatedPurchases);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setIsLoading(false);
      });
  }, []);

  const userPurchases = purchases.filter((purchase) => purchase.user.email === userEmail);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-11">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div className="p-6">
          {userPurchases.length > 0 ? (
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-4 border-b text-pink-500">Product Name</th>
                  <th className="p-4 border-b text-pink-500">Address</th>
                  <th className="p-4 border-b text-pink-500">Mobile</th>
                  <th className="p-4 border-b text-pink-500">Payment Method</th>
                  <th className="p-4 border-b text-pink-500">Status</th>
                  <th className="p-4 border-b text-pink-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {userPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="p-4 border-b">{purchase.product.name}</td>
                    <td className="p-4 border-b">{purchase.user.address}</td>
                    <td className="p-4 border-b">{purchase.user.mobile}</td>
                    <td className="p-4 border-b">{purchase.user.paymentMethod}</td>
                    <td className={`p-4 border-b ${statusColors[purchase.status] || "bg-gray-300 text-black"}`}>
                      {purchase.status}
                    </td>
                    <td className="p-4 border-b">{purchase.date}</td> {/* Ensure this displays the date from JSON */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No purchases found for this user.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Purchases;
