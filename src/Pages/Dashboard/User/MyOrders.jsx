import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`/orders?email=${user.email}`);
      const filteredOrders = res.data.filter(
        (order) => (order.Orderstatus || "").toLowerCase() !== "cancelled"
      );
      setOrders(filteredOrders);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // Cancel order
  const handleCancel = async (orderId) => {
    if (!orderId) return;
    setUpdatingId(orderId);
    try {
      await axios.delete(`/orders/${orderId}`);
      toast.success("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    } finally {
      setUpdatingId(null);
    }
  };

  // Navigate to payment
  const handlePayNow = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading orders...</p>;

  if (!orders.length)
    return <p className="text-center mt-10 text-gray-700">You have no orders.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">My Orders</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Book Name</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>

                <td className="items-center">
                  <img
                    src={order.bookDetails?.image || "https://via.placeholder.com/60x90"}
                    alt={order.bookDetails?.bookName || "Book"}
                    className="w-16 h-20 object-cover rounded"
                  />
                </td>
                <td>{order.bookDetails?.bookName || "N/A"}</td>
                <td>${order.bookDetails?.price?.toFixed(2) || "0.00"}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="capitalize">{order.Orderstatus}</td>
                <td className="capitalize">{order.paymentStatus}</td>

                <td className="flex flex-col md:flex-row gap-2">
                  {order.Orderstatus.toLowerCase() === "pending" ? (
                    <>

                      {order.paymentStatus.toLowerCase() === "unpaid" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handlePayNow(order._id)}
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        className={`btn btn-sm btn-error ${
                          updatingId === order._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={updatingId === order._id}
                        onClick={() => handleCancel(order._id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 font-medium">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link
          to="/"
          className="inline-block bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Books
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
