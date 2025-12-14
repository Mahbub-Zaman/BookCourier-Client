import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router-dom';

const LatestBooks = () => {
  const axios = useAxios();
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get('/latest-books');
        const sortedBooks = response.data
          .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          .slice(0, 6);
        setLatestBooks(sortedBooks);
      } catch (error) {
        console.error('Failed to fetch latest books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, [axios]);

  if (loading) return <p className="text-center py-10">Loading latest books...</p>;

  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-primary mb-8">
        Latest Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {latestBooks.map((book) => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-32 h-48 overflow-hidden mt-4">
              <img
                src={book.image}
                alt={book.bookName}
                className="w-full h-full object-cover rounded-md transform transition duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-green-600 mb-1 text-center">
                {book.bookName}
              </h3>
              <p className="text-gray-700 text-sm mb-2 text-center">{book.author}</p>
              <p className="text-gray-500 text-xs text-center">
                Added by: {book.librarianName}
              </p>
              <p className="text-gray-400 text-xs text-center">
                {new Date(book.addedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
