import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const AdminPurchases = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [editingPurchaseId, setEditingPurchaseId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/checkout")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setPurchases(data);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setIsLoading(false);
      });
  }, []);

  const handleStatusChange = (purchaseId, status) => {
    setEditingPurchaseId(purchaseId);
    setNewStatus(status);
  };

  const handleUpdateStatus = () => {
    fetch(`http://localhost:9000/checkout/${editingPurchaseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPurchases((prevPurchases) =>
          prevPurchases.map((purchase) =>
            purchase.id === editingPurchaseId
              ? { ...purchase, status: newStatus }
              : purchase
          )
        );
        setEditingPurchaseId(null);
        setNewStatus("");
      })
      .catch((error) => {
        console.error("Error updating purchase status:", error);
      });
  };

  const filteredPurchases =
    filteredStatus === "all"
      ? purchases
      : purchases.filter((purchase) => purchase.status === filteredStatus);

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="flex justify-center mt-11">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center flex-col">
            <label className="block text-center font-medium text-gray-700 mb-2">
              Filter by Status:
            </label>
            <select
              value={filteredStatus}
              onChange={(e) => setFilteredStatus(e.target.value)}
              className="mt-1 block text-center border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="under delivery">Under Delivery</option>
              <option value="canceled">Canceled</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {filteredPurchases.length > 0 ? (
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-4 border-b text-pink-500">Customer Name</th>
                  <th className="p-4 border-b text-pink-500">Product Name</th>
                  <th className="p-4 border-b text-pink-500">Address</th>
                  <th className="p-4 border-b text-pink-500">Mobile</th>
                  <th className="p-4 border-b text-pink-500">Payment Method</th>
                  <th className="p-4 border-b text-pink-500">Status</th>
                  <th className="p-4 border-b text-pink-500">Date</th> {/* Added Date column */}
                  <th className="p-4 border-b text-pink-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="p-4 border-b">{purchase.user.name}</td>
                    <td className="p-4 border-b">{purchase.product.name}</td>
                    <td className="p-4 border-b">{purchase.user.address}</td>
                    <td className="p-4 border-b">{purchase.user.mobile}</td>
                    <td className="p-4 border-b">
                      {purchase.user.paymentMethod}
                    </td>
                    <td className="p-4 border-b">
                      <span
                        className={`p-1 rounded-md ${
                          purchase.status === "pending"
                            ? "bg-yellow-500"
                            : purchase.status === "under delivery"
                            ? "bg-sky-700"
                            : purchase.status === "canceled"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                    <td className="p-4 border-b">{purchase.date}</td> {/* Added Date data */}
                    <td className="p-4 border-b">
                      <button
                        onClick={() =>
                          handleStatusChange(purchase.id, purchase.status)
                        }
                        className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600"
                      >
                        Change Status
                      </button>
                      {editingPurchaseId === purchase.id && (
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            New Status:
                          </label>
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2"
                          >
                            <option value="pending">Pending</option>
                            <option value="under delivery">
                              Under Delivery
                            </option>
                            <option value="canceled">Canceled</option>
                            <option value="delivered">Delivered</option>
                          </select>
                          <button
                            onClick={handleUpdateStatus}
                            className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600"
                          >
                            Update Status
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No purchases found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPurchases;
