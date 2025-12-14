// PaymentFailed.jsx
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <title>BookCourier | Payment Failed</title>
      <XCircleIcon className="w-24 h-24 text-red-600 mb-6" />
      <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Failed</h1>
      <p className="text-gray-700 mb-6">
        Something went wrong with your payment. Please try again.
      </p>
      <Link
        to="/dashboard/my-orders"
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Back to Orders
      </Link>
    </div>
  );
};

export default PaymentFailed;

