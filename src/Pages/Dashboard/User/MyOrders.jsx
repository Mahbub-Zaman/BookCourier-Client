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
    <div className="min-h-screen p-6">
      <title>BookCourier | All My Orders</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">My Orders</h1>

      <div className="overflow-x-auto shadow-xl rounded-xl bg-[var(--color-bg)] border border-gray-200">
        <table className="table w-full text-sm">
          <thead className="graybg text-secondary uppercase font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Book</th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-[var(--color-hoverbg)] transition-colors">
                <td className="text-center px-4 py-2 font-medium">{index + 1}</td>
                <td className="flex justify-center px-4 py-2">
                  <img
                    src={order.bookDetails?.image || "https://via.placeholder.com/60x90"}
                    alt={order.bookDetails?.bookName || "Book"}
                    className="w-16 h-20 object-cover rounded shadow-sm"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{order.bookDetails?.bookName || "N/A"}</td>
                <td className="px-4 py-2 text-green-600 font-medium">${order.bookDetails?.price?.toFixed(2) || "0.00"}</td>
                <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    order.Orderstatus.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.Orderstatus.toLowerCase() === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>{order.Orderstatus}</span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus.toLowerCase() === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>{order.paymentStatus}</span>
                </td>

                <td className="flex flex-col md:flex-row gap-2 justify-center px-2 ">
                  {order.Orderstatus.toLowerCase() === "pending" ? (
                    <>
                      {order.paymentStatus.toLowerCase() === "unpaid" && (
                        <button
                          className="btn btn-sm btn-success w-full md:w-auto"
                          onClick={() => handlePayNow(order._id)}
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        className={`btn btn-sm btn-error w-full md:w-auto ${
                          updatingId === order._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={updatingId === order._id}
                        onClick={() => handleCancel(order._id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="description font-medium">N/A</span>
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
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
