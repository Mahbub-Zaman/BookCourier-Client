import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import BookCard from "../../components/BookCard/BookCard";

const AllBooks = () => {
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // 'asc' or 'desc'

  useEffect(() => {
    axiosInstance.get("/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, [axiosInstance]);

  // Filtered and sorted books
  const filteredBooks = books
    .filter(book =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-gray-200 min-h-screen border-b-theme">
      <title>BookCourier | All Available Books</title>
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full md:w-1/3 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 justify-center">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => <BookCard key={idx} book={book} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
