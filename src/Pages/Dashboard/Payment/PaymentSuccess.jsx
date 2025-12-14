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
      if (!sessionId) {
        setMessage("Invalid session");
        setLoading(false);
        return;
      }

      try {
        // Call backend correctly using query string
        const { data } = await axios.patch(`/payment-success?session_id=${sessionId}`);
        if (data.success) {
          setMessage(`Payment successful! Transaction ID: ${data.transactionId}`);
        } else {
          setMessage("Payment failed or already processed.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Payment failed.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, axios]);

  if (loading) return <p className="text-center mt-10">Processing payment...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <title>BookCourier | Payment Success</title>
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
