import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();

  // Replace with logged-in admin email
  const adminEmail = "admin.guy@example.com";

  const { isLoading, data: transactions = [], isError } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments", {
        params: { email: adminEmail },
      });
      console.log("Admin payments response:", res.data);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading transactions...</p>;
  if (isError)
    return <p className="text-center mt-10">Failed to load transactions.</p>;
  if (transactions.length === 0)
    return <p className="text-center mt-10">No transactions found.</p>;

  return (
<div className="max-w-7xl mx-auto mt-10 p-4">
  <title>BookCourier | All Transictions</title>
  <h2 className="text-3xl font-bold mb-6 text-center text-primary">All Transactions</h2>
  <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Book</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Author</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Customer</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Amount</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Transaction ID</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Librarian</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase">Payment Date</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions.map((t, idx) => {
          const paidDate = t.paidAt ? new Date(t.paidAt) : null;
          return (
            <tr
              key={t._id}
              className={`transition-colors duration-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              {/* Book */}
              <td className="py-3 px-6 flex items-center gap-3">
                {t.book?.image && (
                  <img
                    src={t.book.image}
                    alt={t.book.bookName}
                    className="w-12 h-12 object-cover rounded-lg shadow-sm"
                  />
                )}
                <span className="font-medium text-gray-800">{t.book?.bookName || "Unknown"}</span>
              </td>

              {/* Author */}
              <td className="py-3 px-6 text-gray-700">{t.book?.author || "Unknown"}</td>

              {/* Customer */}
              <td className="py-3 px-6 flex items-center gap-3">
                {t.customer?.photoURL && (
                  <img
                    src={t.customer.photoURL}
                    alt={t.customer.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{t.customer?.displayName || "Unknown"}</span>
                  <span className="text-sm text-gray-500">{t.customer?.email || "-"}</span>
                </div>
              </td>

              {/* Amount */}
              <td className="py-3 px-6 font-medium text-gray-800">${t.amount}</td>

              {/* Transaction ID */}
              <td className="py-3 px-6 text-gray-700 break-all">{t.transactionId || "-"}</td>

              {/* Librarian */}
              <td className="py-3 px-6 flex items-center gap-3">
                {t.librarian?.photoURL && (
                  <img
                    src={t.librarian.photoURL}
                    alt={t.librarian.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{t.librarian?.displayName || "Unknown"}</span>
                  <span className="text-sm text-gray-500">{t.librarian?.email || "-"}</span>
                </div>
              </td>

              {/* Payment Date */}
              <td className="py-3 px-6 text-gray-700">
                {paidDate ? (
                  <span>{`${paidDate.toLocaleDateString()} ${paidDate.toLocaleTimeString()}`}</span>
                ) : (
                  "-"
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

export default Transactions;
