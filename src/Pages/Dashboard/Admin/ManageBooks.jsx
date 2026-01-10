import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axios = useAxios();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/books");
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const togglePublish = async (bookId, currentStatus) => {
    try {
      await axios.patch(`/books/${bookId}/status`, { status: currentStatus === "publish" ? "unpublish" : "publish" });
      toast.success("Book status updated!");
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const deleteBook = async (bookId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "All related orders will also be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/books/${bookId}`);
        toast.success("Book deleted successfully!");
        fetchBooks(); // refresh the table
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete book.");
      }
    }
  });
};

  return (
    <div className="min-h-screen p-6 whitebg">
      <title>BookCourier | Library Collection</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-primary">Manage Books</h1>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-500">No books available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="graybg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Book Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">Added By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-[var(--color-bg)]">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-[var(--color-hoverbg)]">
                  <td className="px-6 py-4">
                    <img
                      src={book.image}
                      alt={book.bookName}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 description font-medium">{book.bookName}</td>
                  <td className="px-6 py-4 description font-medium">
                    <div className="flex gap-4 items-center space-y-1">
                        <img
                        src={book.librarianImage}
                        alt={book.bookName}
                        className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="text-center">
                        <div className="font-semibold">{book.librarianName}</div>
                        <div className="text-gray-500 text-sm">{book.librarianEmail}</div>
                        </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 description">${book.price.toFixed(2)}</td>
                  <td className="px-6 py-4 description">{book.rating || "N/A"}</td>
                  <td className="px-6 py-4 description font-medium">{book.status}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => togglePublish(book._id, book.status)}
                      className={`px-3 py-1 text-sm rounded-lg text-white ${book.status === "publish" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {book.status === "publish" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
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

export default ManageBooks;
