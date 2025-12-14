import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BookReviews = ({ bookId, hasOrdered }) => {
  const { user } = useAuth();
  const axios = useAxios();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ rating: 0, review: "" });
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/reviews?bookId=${bookId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleStarClick = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async () => {
    if (!formData.review) return toast.error("Review cannot be empty");
    if (formData.rating === 0) return toast.error("Please select a rating");

    setSubmitting(true);
    try {
      await axios.post("/reviews", {
        bookId,
        userId: user.uid,
        userName: user.displayName || user.name || "Anonymous",
        userPhoto: user.photo || user.photoURL,
        email: user.email,
        rating: formData.rating,
        review: formData.review,
      });
      toast.success("Review added successfully");
      setFormData({ rating: 0, review: "" });
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {hasOrdered && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h3 className="font-semibold text-black mb-2">Write a Review</h3>

          {/* Star Rating */}
          <div className="rating rating-lg rating-half mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 mask-half-1 bg-green-500"
                  checked={formData.rating === star - 0.5}
                  onChange={() => handleStarClick(star - 0.5)}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 mask-half-2 bg-green-500"
                  checked={formData.rating === star}
                  onChange={() => handleStarClick(star)}
                />
              </React.Fragment>
            ))}
          </div>

          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            placeholder="Write your review here..."
            className="w-full border border-green-400 text-black rounded p-2 mb-2"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} className="p-4 mb-4 bg-gray-100 rounded">
            <div className="flex items-center mb-2">
              <img
                src={rev.userPhoto || "https://via.placeholder.com/40"}
                alt={rev.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-black">{rev.userName}</p>
                <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <input
                        key={star}
                        type="radio"
                        className={`mask mask-star-2 bg-green-500`}
                        readOnly
                        checked={star <= Math.round(rev.rating)}
                        />
                    ))}
                </div>
              </div>
            </div>
            <p className="text-black">{rev.review}</p>
            <p className="text-sm text-gray-500">{new Date(rev.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookReviews;
