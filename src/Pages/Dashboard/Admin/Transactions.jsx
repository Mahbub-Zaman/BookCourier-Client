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
      <title>BookCourier | All Transactions</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">All Transactions</h2>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full bg-[var(--color-bg)] divide-y divide-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase font-semibold text-center">
            <tr>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Librarian</th>
              <th className="py-3 px-4">Payment Date</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-bg)] divide-y divide-gray-200">
            {transactions.map((t) => {
              const paidDate = t.paidAt ? new Date(t.paidAt) : null;
              return (
                <tr
                  key={t._id}
                  className={`transition-colors duration-200 hover:bg-[var(--color-hoverbg)]`}
                >
              <td className="py-2 px-4 flex items-center gap-3">
                {t.book?.image && (
                  <img
                    src={t.book.image}
                    alt={t.book.bookName}
                    className="w-12 h-12 object-cover rounded-lg shadow-sm flex-shrink-0"
                  />
                )}
                <span className="font-medium description truncate max-w-[200px]">
                  {t.book?.bookName || "Unknown"}
                </span>
              </td>


                  <td className="py-3 px-6 text-center description">{t.book?.author || "Unknown"}</td>

                  <td className="py-3 px-6 flex items-center gap-3 justify-center">
                    {t.customer?.photoURL && (
                      <img
                        src={t.customer.photoURL}
                        alt={t.customer.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col text-left">
                      <span className="font-medium description">{t.customer?.displayName || "Unknown"}</span>
                      <span className="text-sm text-gray-500">{t.customer?.email || "-"}</span>
                    </div>
                  </td>

                  <td className="py-3 px-6 font-medium text-green-600 text-center">${t.amount.toFixed(2)}</td>

                  <td className="py-3 px-6 description break-all text-center">{t.transactionId || "-"}</td>

                  <td className="py-3 px-6 flex items-center gap-3 justify-center">
                    {t.librarian?.photoURL && (
                      <img
                        src={t.librarian.photoURL}
                        alt={t.librarian.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col text-left">
                      <span className="font-medium description">{t.librarian?.displayName || "Unknown"}</span>
                      <span className="text-sm text-gray-500">{t.librarian?.email || "-"}</span>
                    </div>
                  </td>

                  <td className="py-3 px-6 description text-center">
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
