import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const axios = useAxios();

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return setMessage("Invalid session");

      try {
        // Call backend to confirm payment
        const { data } = await axios.post("/payment/confirm-session", { sessionId });

        setMessage("Payment successful! Transaction ID: " + data.transactionId);
      } catch (err) {
        console.error(err);
        setMessage("Payment failed or already processed.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, axios]);

  if (loading) return <p className="text-center mt-10">Processing payment...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4">{message}</h1>
      <Link
        to="/dashboard/my-orders"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
