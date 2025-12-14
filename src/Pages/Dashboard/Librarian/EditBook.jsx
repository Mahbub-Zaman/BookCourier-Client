import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">Edit Book</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Book Name"
          name="bookName"
          value={bookData.bookName}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          placeholder="Author Name"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          className="input"
        />

        <select
          name="status"
          value={bookData.status}
          onChange={handleChange}
          className="select"
        >
          <option value="publish">Publish</option>
          <option value="unpublish">Unpublish</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={bookData.price}
          onChange={handleChange}
          className="input"
        />

        <input
          type="url"
          placeholder="Book Image URL"
          name="image"
          value={bookData.image}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          placeholder="Category"
          name="category"
          value={bookData.category}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          placeholder="Publisher"
          name="publisher"
          value={bookData.publisher}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          placeholder="Year of Publishing"
          name="yearOfPublishing"
          value={bookData.yearOfPublishing}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          placeholder="Total Pages"
          name="totalPages"
          value={bookData.totalPages}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          placeholder="Rating (0-5)"
          name="rating"
          value={bookData.rating}
          onChange={handleChange}
          className="input"
          min="0"
          max="5"
          step="0.1"
        />

        <textarea
          placeholder="Review / Description"
          name="review"
          value={bookData.review}
          onChange={handleChange}
          className="textarea"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
        >
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
