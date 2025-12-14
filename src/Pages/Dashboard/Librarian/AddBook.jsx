import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const { user } = useAuth(); // logged in firebase user
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

    // must be logged in
    if (!user) return toast.error("You must be logged in to add books.");

    // validations
    if (!bookName.trim()) return toast.error("Book name required.");
    if (!author.trim()) return toast.error("Author name required.");
    if (!price.trim()) return toast.error("Price required.");
    if (!imageUrl.trim()) return toast.error("Image URL required.");

    // optional ImgBB validation like AddFood
    if (!imageUrl.includes("https://i.ibb.co/") && !imageUrl.includes("https://ibb.co/")) {
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
      const res = await axios.post("/books", bookData);
      console.log("MongoDB Response:", res.data);

      toast.success("📚 Book added successfully!");
      setLoading(false);

      // reset
      setBookName("");
      setAuthor("");
      setStatus("publish");
      setPrice("");
      setImageUrl("");
      setCategory("");
      setPublisher("");
      setYearOfPublishing("");
      setTotalPages("");
      setReview("");

      // redirect
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (e) {
      console.error(e);
      toast.error("Failed to add book.");
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <title>Library | Add Book</title>
      <Toaster position="top-right" />

      <h1 className="text-4xl font-bold mb-6 text-primary">Add Book</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96 flex flex-col gap-4"
      >

        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input"
        />

        <div className="flex gap-2">
          <label htmlFor="status" className="text-primary font-medium">Select Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select"
        >
          <option value="publish">Publish</option>
          <option value="unpublish">Unpublish</option>
        </select>
        </div>

        <input
          type="number"
          placeholder="Price (e.g., 250)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />

        <input
          type="url"
          placeholder="Book Image URL (ImgBB)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Publisher (optional)"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Year of Publishing"
          value={yearOfPublishing}
          onChange={(e) => setYearOfPublishing(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Total Pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          className="input"
        />

        <input
  type="number"
  placeholder="Ratings (e.g., 4.5)"
  value={ratings}
  onChange={(e) => setRatings(e.target.value)}
  min="0"
  max="5"
  step="0.1"
  className="input"
/>

        <textarea
          placeholder="Review / Description"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="textarea"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
