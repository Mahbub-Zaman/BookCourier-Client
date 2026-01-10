import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth(); // logged-in librarian
  const axios = useAxios();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch only books added by the logged-in user
const fetchMyBooks = async () => {
  if (!user) return;
  try {
    setLoading(true);

    const res = await axios.get(`/librarian/books?email=${user.email}`);

    setBooks(res.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch your books.");
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMyBooks();
  }, [user]);

  return (
    <div className="min-h-screen p-6 ">
      <title>BookCourier | My Books</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">My Books</h1>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found. Add some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table bg-[var(--color-bg)] w-full rounded-lg">
            <thead className="graybg">
              <tr>
                <th>Image</th>
                <th>Book Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-[var(--color-hoverbg)]">
                  <td>
                    <img
                      src={book.image}
                      alt={book.bookName}
                      className="w-16 h-20 object-cover rounded"
                    />
                  </td>
                  <td>{book.bookName}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>{book.rating || "N/A"}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/edit-book/${book._id}`)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
