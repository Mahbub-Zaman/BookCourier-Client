import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axios = useAxios();

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("publish");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [yearOfPublishing, setYearOfPublishing] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [ratings, setRatings] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to add books.");
    if (!bookName.trim()) return toast.error("Book name required.");
    if (!author.trim()) return toast.error("Author name required.");
    if (!price.trim()) return toast.error("Price required.");
    if (!imageUrl.trim()) return toast.error("Image URL required.");

    if (
      !imageUrl.includes("https://i.ibb.co/") &&
      !imageUrl.includes("https://ibb.co/")
    ) {
      return toast.error("Image must be hosted on ImgBB!");
    }

    const bookData = {
      bookName,
      author,
      status,
      price: parseFloat(price),
      image: imageUrl,
      category,
      publisher,
      yearOfPublishing,
      totalPages,
      review,
      rating: ratings ? parseFloat(ratings) : null,
      createdAt: new Date(),
      librarianName: user.displayName,
      librarianEmail: user.email,
      librarianImage: user.photoURL,
    };

    setLoading(true);

    try {
      await axios.post("/books", bookData);
      toast.success("📚 Book added successfully!");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen whitebg py-10 px-4">
      <title>BookCourier | Add Book</title>
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center gap-4">
        <img
          src="/add-book.png"
          alt="Add Book"
          className="w-12 h-12"
        />
        <h1 className="text-3xl font-bold text-primary">Add New Book</h1>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto graybg rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="label">Book Name *</label>
              <input
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Author *</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Price *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Image URL (ImgBB) *</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select w-full"
              >
                <option value="publish">Publish</option>
                <option value="unpublish">Unpublish</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="label">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Publisher</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="input w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Year</label>
                <input
                  type="number"
                  value={yearOfPublishing}
                  onChange={(e) => setYearOfPublishing(e.target.value)}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="label">Pages</label>
                <input
                  type="number"
                  value={totalPages}
                  onChange={(e) => setTotalPages(e.target.value)}
                  className="input w-full"
                />
              </div>
            </div>

            <div>
              <label className="label">Rating</label>
              <input
                type="number"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                min="0"
                max="5"
                step="0.1"
                className="input w-full"
              />
            </div>

            <div>
              <label className="label">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="textarea w-full h-28"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
