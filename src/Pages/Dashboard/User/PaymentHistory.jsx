import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isLoading, data: payments = [], isError } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading payment history...</p>;
  if (isError)
    return <p className="text-center mt-10">Failed to load payments.</p>;
  if (payments.length === 0)
    return <p className="text-center mt-10">No payment history found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <title>BookCourier | My Payment History</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="graybg text-secondary">
            <tr className="text-left">
              <th className="p-3 border-b">Product</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Transaction ID</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Time</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-bg)]">
            {payments.map((payment) => {
              const paidDate = new Date(payment.paidAt);
              return (
                <tr
                  key={payment._id}
                  className="hover:bg-[var(--color-hoverbg)] description align-middle"
                >
                  {/* Product */}
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <img
                        src={payment.book?.image || "https://via.placeholder.com/60"}
                        alt={payment.book?.bookName || "Book"}
                        className="w-16 h-20 object-cover rounded flex-shrink-0"
                      />
                      <span className="text-sm sm:text-base break-words">
                        {payment.book?.bookName || "Unknown"}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-3 border-b text-sm sm:text-base">
                    ${payment.amount?.toFixed(2) || "0.00"}
                  </td>

                  {/* Transaction ID */}
                  <td className="p-3 border-b break-all text-sm sm:text-base">
                    {payment.transactionId || "N/A"}
                  </td>

                  {/* Date */}
                  <td className="p-3 border-b text-sm sm:text-base">
                    {paidDate.toLocaleDateString()}
                  </td>

                  {/* Time */}
                  <td className="p-3 border-b text-sm sm:text-base">
                    {paidDate.toLocaleTimeString()}
                  </td>

                  {/* Action */}
                  <td className="p-3 border-b text-center">
                    {payment.book ? (
                      <Link
                        to={`/book/${payment.book._id}`}
                        className="btn-primary btn-sm px-3 py-1 text-sm sm:text-base rounded-lg"
                      >
                        View Details
                      </Link>
                    ) : (
                      <span className="text-gray-500 text-xs sm:text-sm">N/A</span>
                    )}
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

export default PaymentHistory;
