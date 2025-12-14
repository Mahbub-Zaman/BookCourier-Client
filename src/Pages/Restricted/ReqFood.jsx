import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "https://plateshare-api-server-beige.vercel.app"; // your backend base URL

const ReqFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [foods, setFoods] = useState({}); // Store food details by id
  const [loading, setLoading] = useState(true);

  // Fetch user requests
  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE}/myFoodRequests?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, [user]);

  // Fetch food details for requests
  useEffect(() => {
    requests.forEach(async (req) => {
      if (!foods[req.foodId]) {
        const res = await fetch(`${API_BASE}/foods/${req.foodId}`);
        const data = await res.json();
        setFoods((prev) => ({ ...prev, [req.foodId]: data }));
      }
    });
  }, [requests, foods]);

  const handleRequestAction = async (requestId, action) => {
    try {
      const req = requests.find((r) => r._id === requestId);
      if (!req) throw new Error("Request not found");

      const food = foods[req.foodId];
      if (!food) throw new Error("Food not loaded");

      // Update request
      const updateReqRes = await fetch(`${API_BASE}/foodRequests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action, action }),
      });
      if (!updateReqRes.ok) throw new Error("Failed to update request");

      // Update food quantity if accepted
      if (action === "accepted") {
        const extractNumber = (str) => {
          if (!str) return 0;
          const num = parseInt(str.match(/\d+/)?.[0]);
          return isNaN(num) ? 0 : num;
        };

        const currentQty = extractNumber(food.food_quantity);
        const requestedQty = extractNumber(req.requestedQuantity);
        const newQty = Math.max(currentQty - requestedQty, 0);

        const updatedFoodPayload = {
          food_quantity: `Serves ${newQty} ${newQty === 1 ? "person" : "people"}`,
          food_status: newQty <= 0 ? "Not Available" : "Available",
        };

        const updateFoodRes = await fetch(`${API_BASE}/foods/${req.foodId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFoodPayload),
        });

        if (!updateFoodRes.ok) throw new Error("Failed to update food");

        // Update foods state
        setFoods((prev) => ({
          ...prev,
          [req.foodId]: { ...food, ...updatedFoodPayload },
        }));
      }

      // Update requests state
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: action, action } : r
        )
      );

      toast.success(`Request ${action} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update request");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }
  if (requests.length === 0) return <div className="flex flex-col items-center justify-center h-screen">
    <p className="text-red-500 font-bold text-4xl mb-8">
    Oops!
  </p>
  <img
    src="/food.png"
    alt="Avatar"
    className="w-80 h-80"
  />
  <p className="text-primary font-bold text-4xl mt-8">
    No requests for foods you donated yet.
  </p>
  <p className="font-sm text-2xl mt-6">
    If someone request for foods it will appear here
  </p>
</div>;

  return (
    <div className="mx-auto px-6 py-12">
      <title>PlateShare | Food Requests</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-green-500 text-center">My Food Requests</h1>
      <table className="table w-full">
        <thead className="bg-green-200">
          <tr>
            <th>SL</th>
            <th>Food Image</th>
            <th>Food Name</th>
            <th>Requester</th>
            <th>Contact</th>
            <th>Quantity</th>
            <th>Reason</th>
            <th>Location</th>
            <th>Status</th>
            <th>Food Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {requests.map((req, index) => (
            <tr key={req._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={foods[req.foodId]?.food_image || "https://via.placeholder.com/60"}
                  alt={req.foodName}
                  className="w-20 h-12 rounded"
                />
              </td>
              <td>{req.foodName}</td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={req.userPhoto || "/Avatar.jpeg"}
                    alt={req.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{req.userName}</div>
                    <div className="text-sm opacity-50">{req.userEmail}</div>
                  </div>
                </div>
              </td>
              <td>{req.contactNo}</td>
              <td>{req.requestedQuantity}</td>
              <td>{req.requestReason}</td>
              <td>{req.requestLocation}</td>
              <td>
                <span
                  className={`font-semibold ${
                    req.status === "pending"
                      ? "text-yellow-600"
                      : req.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="flex items-center gap-2">
                {/* Accept/Reject buttons */}
                {!req.action && (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleRequestAction(req._id, "accepted")}
                      disabled={foods[req.foodId]?.food_status !== "Available"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRequestAction(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}

                

                {/* Status label if action exists */}
                {req.action === "accepted" && <span className="text-green-600 font-bold btn btn-soft btn-success">Accepted</span>}
                {req.action === "rejected" && <span className="text-red-600 font-bold btn btn-soft btn-error">Rejected</span>}
              </td>
              <td>
                {/* View Details button */}
                <button
                  className="btn btn-soft btn-info btn-sm"
                  onClick={() => navigate(`/food/${req.foodId}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReqFood;
