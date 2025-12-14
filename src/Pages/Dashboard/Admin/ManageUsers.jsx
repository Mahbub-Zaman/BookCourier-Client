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
    <div className="min-h-screen p-6 bg-gray-50">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">All Users</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.displayName || "No Name"}</td>
                <td className="border p-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full mx-auto" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 capitalize">{user.role || "user"}</td>
                <td className="border p-2">
                  <div className="flex justify-center gap-2">
                    {/* Conditional buttons based on role */}
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
