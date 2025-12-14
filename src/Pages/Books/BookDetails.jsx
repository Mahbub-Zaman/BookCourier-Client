import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import BookReviews from "../../components/Restricted/BookReviews";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();

  const [book, setBook] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({ phone: "", address: "" });
  const [inWishlist, setInWishlist] = useState(false);

  // Fetch book, order, and wishlist status
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/book/${id}`);
        setBook(res.data);

        if (user?.email) {
          const ordersRes = await axios.get(`/orders?email=${user.email}`);
          const existingOrder = ordersRes.data.find(
            (order) => order.bookId === id || order.bookId?._id === id
          );
          if (existingOrder) {
            setOrderStatus(true);
            setPaymentStatus(existingOrder.paymentStatus);
          }
        }

        if (user?.uid) {
          const wishlistRes = await axios.get(`/wishlist?userId=${user.uid}`);
          const wishlistItem = wishlistRes.data.find(
            (w) => w.bookId === id || w.bookId?._id === id
          );
          if (wishlistItem) setInWishlist(true);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load book details ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, axios]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle placing order
  const handlePlaceOrder = async () => {
    if (!book) return;
    setPlacingOrder(true);

    const orderData = {
      bookId: book._id,
      userId: user._id || user.uid,
      librarianDetails: {
        email: book.librarianEmail || "unknown",
        name: book.librarianName || "unknown",
        photo: book.librarianImage || "https://via.placeholder.com/50",
      },
      customerDetails: {
        email: user.email,
        name: user.name || user.displayName,
        photo: user.photo || user.photoURL || "https://via.placeholder.com/50",
        phone: formData.phone,
        address: formData.address,
      },
      Orderstatus: "pending",
      paymentStatus: "unpaid",
    };

    try {
      const res = await axios.post("/orders", orderData);
      toast.success(res.data.message || "Order placed successfully ✅");
      setOrderStatus(true);
      setShowModal(false);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to place order ❌");
    } finally {
      setPlacingOrder(false);
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!user) return toast.error("You must be logged in to manage wishlist ❌");

    try {
      const res = await axios.post("/wishlist", {
        bookId: id,
        userId: user.uid,
      });

      if (res.data.action === "added") {
        setInWishlist(true);
        toast.success("Book added to wishlist ✅");
      } else if (res.data.action === "removed") {
        setInWishlist(false);
        toast.success("Book removed from wishlist ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist ❌");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading book details...</p>;
  if (!book)
    return <p className="text-center mt-10 text-red-500">Book not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <title>BookCourier | Book Details & Reviews</title>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium transition"
      >
        &larr; Back to Books
      </button>

      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-8 bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 transition transform hover:scale-[1.01]">
        <img
          src={book.image || "https://via.placeholder.com/200x300"}
          alt={book.bookName}
          className="w-full md:w-64 h-auto object-cover rounded-xl shadow-md"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.bookName}</h1>
            <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
            <p className="text-gray-700 mb-1"><strong>Category:</strong> {book.category}</p>
            <p className="text-gray-700 mb-1"><strong>Publisher:</strong> {book.publisher}</p>
            <p className="text-gray-700 mb-1"><strong>Year:</strong> {book.yearOfPublishing}</p>
            <p className="text-gray-700 mb-1"><strong>Pages:</strong> {book.totalPages}</p>
            <p className="text-gray-700 mb-1"><strong>Rating:</strong> {book.rating} ⭐</p>
            <p className="text-gray-700 mb-1"><strong>Status:</strong> {book.status}</p>
            <p className="text-gray-700 mb-1"><strong>Price:</strong> ${book.price}</p>
            <p className="text-gray-600 mb-2"><strong>Review:</strong> {book.review}</p>
            <p className="text-gray-700 mb-1">
              <strong>Payment Status:</strong>{" "}
              {orderStatus
                ? paymentStatus === "paid"
                  ? <span className="text-green-600 font-semibold">Paid ✅</span>
                  : <span className="text-yellow-500 font-semibold">Pending ⏳</span>
                : "Not Ordered"}
            </p>
          </div>

          <div className="flex justify-between">
            {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`mt-6 w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white transition ${
              inWishlist
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          {/* Order Button */}
          <button
            onClick={() => setShowModal(true)}
            disabled={orderStatus}
            className={`mt-6 w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white transition ${
              orderStatus
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
          >
            {orderStatus ? "Order Pending" : "Order Now"}
          </button>
          </div>
        </div>
      </div>
              <BookReviews bookId={book._id} hasOrdered={orderStatus} />
      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white/30 backdrop-blur-lg shadow-2xl border border-white/20 animate-fadeIn scale-100 md:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Place Your Order
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={user?.name || user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition shadow-lg"
              >
                {placingOrder ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
