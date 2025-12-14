import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "https://plateshare-api-server-beige.vercel.app";

const FoodDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal / form state
  const [modalOpen, setModalOpen] = useState(false);
  const [requestLocation, setRequestLocation] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [requestQuantity, setRequestQuantity] = useState(1);
  const [contactNo, setContactNo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // requests list
  const [requests, setRequests] = useState([]);

  const extractNumber = (str) => {
  if (!str) return 0;
  const num = parseInt(str.match(/\d+/)?.[0]);
  return isNaN(num) ? 0 : num;
};


  // Fetch food
  const fetchFood = async () => {
    try {
      const res = await fetch(`${API_BASE}/foods/${id}`);
      if (!res.ok) throw new Error("Failed to fetch food");
      const data = await res.json();
      setFood(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load food");
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/foodRequests?foodId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFood();
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

    // Submit a new request (now includes action: null)
    const handleRequestSubmit = async (e) => {
      e.preventDefault();
      if (!user) return toast.error("You must be logged in to request food.");
      if (!requestLocation || !requestReason || !contactNo) {
        return toast.error("Please fill in all fields.");
      }
      if (!food) return toast.error("Food not loaded yet.");
      if (requestQuantity < 1 || requestQuantity > extractNumber(food.food_quantity)) {
    return toast.error(`Enter quantity between 1 and ${extractNumber(food.food_quantity)}`);
  }


    const requestData = {
      foodId: food._id,
      foodName: food.food_name,
      requestedQuantity:  `Serves ${requestQuantity} ${requestQuantity === "1" ? "person" : "people"}`,
      userName: user.displayName || "Anonymous",
      userEmail: user.email || "",
      userPhoto: user.photoURL || "",
      requestLocation,
      requestReason,
      contactNo,
      status: "pending", // request lifecycle status
      action: null,       // action will be "accepted" or "rejected" later
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/foodRequests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create request");
      }

      toast.success("Request submitted successfully!");
      setModalOpen(false);

      // reset form
      setRequestLocation("");
      setRequestReason("");
      setRequestQuantity(1);
      setContactNo("");

      // refresh requests from server (reliable)
      await fetchRequests();
    } catch (err) {
      console.error("Create request error:", err);
      toast.error("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  // Accept / Reject handler — updates request (status + action) and updates food quantity on accept
const handleRequestAction = async (requestId, action) => {
  try {
    // Helper to extract number from "Serves 3 people"
    const extractNumber = (str) => {
      if (!str) return 0;
      const num = parseInt(str.match(/\d+/)?.[0]);
      return isNaN(num) ? 0 : num;
    };

    const req = requests.find((r) => r._id === requestId);
    if (!req) throw new Error("Request not found");
    if (!food) throw new Error("Food not loaded");

    // 1️⃣ Update the request in the database (status + action)
    const updateReqRes = await fetch(`${API_BASE}/foodRequests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: action,
        action: action, // add new field to database
      }),
    });

    if (!updateReqRes.ok) {
      const text = await updateReqRes.text();
      throw new Error(text || "Failed to update request");
    }

    // 2️⃣ If ACCEPTED → update food quantity + status
    if (action === "accepted") {
      const requestedQty = extractNumber(req.requestedQuantity);
      const currentQty = extractNumber(food.food_quantity);

      const newQty = currentQty - requestedQty;
      const safeQty = newQty < 0 ? 0 : newQty;

      const updatedFoodPayload = {
        food_quantity: `Serves ${safeQty} ${safeQty === 1 ? "person" : "people"}`,
        food_status: safeQty <= 0 ? "Not Available" : "Available",
      };

      const updateFoodRes = await fetch(`${API_BASE}/foods/${food._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFoodPayload),
      });

      if (!updateFoodRes.ok) {
        const text = await updateFoodRes.text();
        throw new Error(text || "Failed to update food");
      }

      // Refresh food from database
      await fetchFood();

      // Update UI state
      setRequests((prev) =>
        prev.map((rq) =>
          rq._id === requestId
            ? { ...rq, status: "accepted", action: "accepted" }
            : rq.status === "pending"
            ? { ...rq, status: "rejected", action: "auto-rejected" }
            : rq
        )
      );
    }

    // 3️⃣ If REJECTED → update only this request
    if (action === "rejected") {
      setRequests((prev) =>
        prev.map((rq) =>
          rq._id === requestId
            ? { ...rq, status: "rejected", action: "rejected" }
            : rq
        )
      );
    }

    toast.success(`Request ${action} successfully!`);
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Failed to update request.");
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading food details...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Food not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <title>PlateShare | Food Details</title>
      <Toaster position="top-right" />

      {/* Food card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img src={food.food_image} alt={food.food_name} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">{food.food_name}</h1>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Quantity:</span> {food.food_quantity}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Pickup Location:</span> {food.pickup_location}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Expiry Date:</span> {food.expire_date}
          </p>

          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Additional Notes:</span> {food.additional_notes || "None"}
          </p>


          <div className="mb-4">
            <h2 className="text-primary font-bold mb-2">Donated By:</h2>
            <div className="flex items-center">
                <img
                  src={food.donator_image}
                  alt={food.donator_name}
                  className="w-9 h-9 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-gray-800 text-1xl font-semibold">{food.donator_name}</p>
                  <p className="text-gray-500 text-1xl text-sm">{food.donator_email}</p>
                </div>
            </div>
          </div>

          <p className={`font-semibold ${food.food_status === "Available" ? "text-green-600" : "text-red-600"}`}>
            Status: {food.food_status}
          </p>

          <button onClick={() => setModalOpen(true)} className="btn btn-primary mt-6 w-full" disabled={food.food_status !== "Available"}>
            Request Food
          </button>
        </div>
      </div>

      {/* Request modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold">✕</button>
            <h2 className="text-xl font-bold mb-4">Request Food</h2>
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Location" value={requestLocation} onChange={e => setRequestLocation(e.target.value)} required className="input" />
              <textarea placeholder="Reason" value={requestReason} onChange={e => setRequestReason(e.target.value)} required className="textarea" />
              <input type="number" min={1} max={extractNumber(food.food_quantity)} placeholder="Food Quantity (e.g., 2)" value={requestQuantity} onChange={(e) => setRequestQuantity(e.target.value)} required className="input" />
              <input type="text" placeholder="Contact No." value={contactNo} onChange={e => setContactNo(e.target.value)} required className="input" />
              <button type="submit" className={`btn btn-primary mt-2 ${submitting ? "btn-disabled" : ""}`} disabled={submitting}>{submitting ? "Submitting..." : "Submit Request"}</button>
            </form>
          </div>
        </div>
      )}

      {/* Requests table (only visible to food owner) */}
      {user && food?.donator_email === user.email && requests.length > 0 && (
        <div className="overflow-x-auto mt-8">
          <h2 className="text-2xl font-bold mb-4 text-green-500">Requests for this food :</h2>
          <table className="table w-full">
            <thead className="bg-green-200">
              <tr>
                <th>SL No</th>
                <th>Requester</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Quantity</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {requests.map((req, index) => {
                const reqId = req._id || req.id;
                return (
                  <tr key={reqId}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={req.userPhoto || "/Avatar.jpeg"} alt={req.userName} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-bold">{req.userName}</div>
                          <div className="text-sm opacity-50">{req.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td>{req.requestLocation}</td>
                    <td>{req.requestReason}</td>
                    <td>{req.requestedQuantity}</td>
                    <td>{req.contactNo}</td>
                    <td>
                      <span className={req.status === "pending" ? "text-yellow-600 font-semibold" : req.status === "accepted" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {req.status}
                      </span>
                    </td>
                    <td className="flex items-center gap-2">
                      {req.action === "accepted" && <span className="text-green-600 font-bold">Accepted</span>}
                      {req.action === "rejected" && <span className="text-red-600 font-bold">Rejected</span>}

                      {!req.action && (
                        <>
                          <button className="btn btn-success btn-sm" onClick={() => handleRequestAction(reqId, "accepted")} disabled={food.food_status !== "Available"}>
                            Accept
                          </button>
                          <button className="btn btn-error btn-sm" onClick={() => handleRequestAction(reqId, "rejected")}>
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default FoodDetails;
