import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBookOpen,
  FaUserEdit,
  FaCalendarAlt,
  FaLayerGroup,
  FaStar,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";


const EditBook = () => {
  const { id } = useParams(); // get book id from URL
  const navigate = useNavigate();
  const axios = useAxios();

  const [bookData, setBookData] = useState({
    bookName: "",
    author: "",
    status: "publish",
    price: "",
    image: "",
    category: "",
    publisher: "",
    yearOfPublishing: "",
    totalPages: "",
    review: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch book data
  const fetchBook = async () => {
    try {
      const res = await axios.get(`/book/${id}`);
      setBookData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch book data.");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/books/${id}`, bookData);
      console.log(res.data);
      toast.success("Book updated successfully!");
      setLoading(false);
      setTimeout(() => navigate("/dashboard/my-books"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book.");
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex justify-center items-center p-6">
    <title>BookCourier | Edit Book</title>
    <Toaster position="top-right" />

    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT: Book Full Preview */}
      <div className="col-span-1 graybg rounded-2xl shadow p-5">
        <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
          <FaBookOpen />
          Book Preview
        </h3>

        {/* Book Image */}
        <div className="flex justify-center">
          <img
            src={bookData.image || "https://via.placeholder.com/200x300"}
            alt="Book Preview"
            className="w-44 h-64 object-cover rounded-xl border shadow"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-lg font-bold text-secondary">
          {bookData.bookName || "Book Title"}
        </h2>

        {/* Author */}
        <p className="text-center text-sm description flex justify-center items-center gap-1">
          <FaUserEdit className="text-xs" />
          {bookData.author || "Unknown Author"}
        </p>

        {/* Divider */}
        <div className="my-4 border-b border-b-theme"></div>

        {/* Meta Info */}
        <div className="space-y-2 text-sm text-secondary">

          <p className="flex items-center gap-2">
            <FaDollarSign className="text-primary" />
            <span className="font-medium">Price:</span>
            ${bookData.price || "0.00"}
          </p>

          <p className="flex items-center gap-2">
            <FaLayerGroup className="text-primary" />
            <span className="font-medium">Pages:</span>
            {bookData.totalPages || "N/A"}
          </p>

          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span className="font-medium">Published:</span>
            {bookData.yearOfPublishing || "N/A"}
          </p>

          <p className="flex items-center gap-2">
            <FaBuilding className="text-primary" />
            <span className="font-medium">Publisher:</span>
            {bookData.publisher || "N/A"}
          </p>

          <p className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">Rating:</span>
            {bookData.rating ? `${bookData.rating} / 5` : "Not rated"}
          </p>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-secondary mb-1">
            Description
          </p>
          <p className="text-xs description leading-relaxed">
            {bookData.review || "No description available for this book."}
          </p>
        </div>
      </div>


      {/* RIGHT: FORM */}
      <div className="col-span-2 graybg rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          Edit Book Details
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Book Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={bookData.bookName}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter book name"
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Author Name</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter author name"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Publish Status</label>
            <select
              name="status"
              value={bookData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="publish">Publish</option>
              <option value="unpublish">Unpublish</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Price</label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Category</label>
            <input
              type="text"
              name="category"
              value={bookData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Book category"
            />
          </div>

          {/* Publisher */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={bookData.publisher}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Publisher name"
            />
          </div>

          {/* Year */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Year of Publishing</label>
            <input
              type="number"
              name="yearOfPublishing"
              value={bookData.yearOfPublishing}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. 2024"
            />
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Total Pages</label>
            <input
              type="number"
              name="totalPages"
              value={bookData.totalPages}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Number of pages"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-secondary">Rating (0 – 5)</label>
            <input
              type="number"
              name="rating"
              value={bookData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="input input-bordered w-full"
              placeholder="e.g. 4.5"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-secondary">Book Image URL</label>
            <input
              type="url"
              name="image"
              value={bookData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://example.com/book.jpg"
            />
          </div>

          {/* Review */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-secondary">Review / Description</label>
            <textarea
              name="review"
              value={bookData.review}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write a short description or review"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary px-10 ${loading && "btn-disabled"}`}
            >
              {loading ? "Updating..." : "Update Book"}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
};

export default EditBook;
