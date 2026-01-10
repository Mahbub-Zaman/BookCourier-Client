import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";

const ManageUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change
  const changeRole = async (userId, newRole) => {
    setLoading(true);
    try {
      const res = await axios.patch(`/users/${userId}/role`, { role: newRole });
      toast.success(res.data.message);
      fetchUsers(); // refresh table
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <title>BookCourier | All Availabe Users</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">All Users</h1>

    <div className="overflow-x-auto shadow-xl rounded-xl bg-[var(--color-bg)] border border-gray-200">
      <table className="table w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase font-semibold">
          <tr>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Image</th>
            <th className="px-4 py-2 text-center">Email</th>
            <th className="px-4 py-2 text-center">Role</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
            >
              <td className="px-6 py-2 font-medium">{user.displayName || "No Name"}</td>
              <td className="px-4 py-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full mx-auto shadow-sm"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 capitalize">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : user.role === "librarian"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {user.role === "user" && (
                    <>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "librarian")}
                        className="btn btn-sm btn-info w-32"
                      >
                        Make Librarian
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "admin")}
                        className="btn btn-sm btn-success w-32"
                      >
                        Make Admin
                      </button>
                    </>
                  )}
                  {user.role === "librarian" && (
                    <>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "user")}
                        className="btn btn-sm btn-warning w-32"
                      >
                        Make User
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "admin")}
                        className="btn btn-sm btn-success w-32"
                      >
                        Make Admin
                      </button>
                    </>
                  )}
                  {user.role === "admin" && (
                    <>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "user")}
                        className="btn btn-sm btn-warning w-32"
                      >
                        Make User
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => changeRole(user._id, "librarian")}
                        className="btn btn-sm btn-info w-32"
                      >
                        Make Librarian
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageUsers;
