import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items
  useEffect(() => {
    if (!user?.uid) return;

    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/wishlist?userId=${user.uid}`);
        setWishlist(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch wishlist ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, axios]);

  // Remove item from wishlist
  const handleRemove = async (bookId) => {
    try {
      const res = await axios.post("/wishlist", { bookId, userId: user.uid });
      if (res.data.action === "removed") {
        setWishlist((prev) => prev.filter((item) => item.bookId !== bookId));
        toast.success("Book removed from wishlist ✅");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove book from wishlist ❌");
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-red-500">Please log in to see your wishlist.</p>;

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading wishlist...</p>;

  if (!wishlist.length)
    return <p className="text-center mt-10 text-gray-600">Your wishlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <title>BookCourier | My Wishlist</title>
      <h1 className="text-3xl font-bold text-primary mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.bookId}
            className="graybg shadow-md rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={item.bookDetails?.image || "https://via.placeholder.com/200x300"}
              alt={item.bookDetails?.bookName || "Book"}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-secondary mb-1">
                  {item.bookDetails?.bookName || "Unknown Book"}
                </h2>
                <p className="description mb-1">
                  <strong className="text-secondary">Author :</strong> {item.bookDetails?.author || "Unknown"}
                </p>
                <p className="description mb-2">
                  <strong className="text-secondary">Price :</strong> ${item.bookDetails?.price || "0"}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => navigate(`/book/${item.bookId}`)}
                  className="w-full px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleRemove(item.bookId)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
