import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Orders = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const defaultUserPhoto = "https://via.placeholder.com/40";

  const fetchOrders = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`/librarian/orders?email=${user.email}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await axios.patch(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const cancelOrder = async (orderId) => {
    setUpdatingId(orderId);
    try {
      await axios.delete(`/orders/${orderId}`);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelWithAlert = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(orderId);
        Swal.fire("Cancelled!", "The order has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="p-6 mx-auto max-w-6xl">
      <title>BookCourier | All Orders</title>
      <Toaster position="top-right" />
      <h2 className="text-3xl text-primary font-bold mb-6">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">Book</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Order Date</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Payment</th>
              <th className="p-3 border-b">Order Status</th>
              <th className="p-3 border-b">Update Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const book = order.bookDetails || {};
              const customer = order.customerDetails || {};

              return (
                <tr key={order._id} className="hover:bg-gray-50 text-gray-700">
                  {/* Book */}
                  <td className="p-2 border-b">
                    <div className="flex items-center gap-3">
                      <img
                        src={book.image || "https://via.placeholder.com/60x90"}
                        alt={book.bookName || "Book"}
                        className="w-12 h-16 object-cover rounded flex-shrink-0"
                      />
                      <span className="text-sm md:text-base">{book.bookName || "N/A"}</span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="p-2 border-b">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.photo || defaultUserPhoto}
                        alt={customer.name || "Customer"}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-sm md:text-base">{customer.name || "Unknown"}</p>
                        <p className="text-gray-500 text-xs md:text-sm">{customer.email || "N/A"}</p>
                      </div>
                    </div>
                  </td>

                  {/* Order Date */}
                  <td className="p-2 border-b text-sm md:text-base">{new Date(order.orderDate).toLocaleDateString()}</td>

                  {/* Price */}
                  <td className="p-2 border-b text-sm md:text-base">${book.price || "0.00"}</td>

                  {/* Payment */}
                  <td className="p-2 border-b text-sm md:text-base">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.paymentStatus || "unpaid"}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="p-2 border-b text-sm md:text-base">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">
                      {order.Orderstatus || "pending"}
                    </span>
                  </td>

                  {/* Update Status */}
                  <td className="p-2 border-b text-center">
                    <select
                      className="border rounded p-1 text-sm"
                      value={order.Orderstatus || "pending"}
                      disabled={updatingId === order._id}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-2 border-b text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      disabled={updatingId === order._id}
                      onClick={() => handleCancelWithAlert(order._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
