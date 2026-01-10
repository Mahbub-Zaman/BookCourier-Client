import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch order with book details
  const { isLoading, data: order, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
    enabled: !!orderId,
  });

  // Handle Pay Now click
  const handlePay = async () => {
    if (!order) return;

    try {
      // Send both orderId and customerEmail
      const res = await axiosSecure.post("/create-checkout-session", {
        orderId: order._id,
        customerEmail: order.customerDetails?.email, // <- critical fix
      });

      if (res.data?.url) {
        window.location.href = res.data.url; // redirect to Stripe checkout
      } else {
        alert("Payment URL not received from server.");
        console.error("Stripe session response:", res.data);
      }
    } catch (err) {
      console.error("Payment failed:", err.response?.data || err);
      alert("Payment failed. Check console for details.");
    }
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (isError || !order) return <div className="text-center mt-20">Order not found!</div>;

  return (
    <div className="max-w-md mx-auto mt-10 graybg shadow-lg p-5 rounded">
      <title>BookCourier | Confirm Payment</title>
      <h2 className="text-2xl font-bold mb-5 text-center">Confirm Payment</h2>

      <img
        src={order.book.img}
        alt={order.book.name}
        className="w-60 h-80 object-cover rounded"
      />

      <h3 className="text-xl mt-4">{order.book.name}</h3>
      <p className="text-lg font-bold mt-2">Price: ${order.book.price}</p>

      <button
        onClick={handlePay}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
