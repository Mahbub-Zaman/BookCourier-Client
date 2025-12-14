import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/book/${book._id}`}
      className="block mx-auto max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md"
    >
      <div className="bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col rounded-xl overflow-hidden">
        {/* Book Image */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={book.image}
            alt={book.bookName}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-4 flex flex-col">
          {/* Title and Author with overflow hidden */}
          <h2 className="text-base w-40 text-black font-semibold truncate overflow-hidden whitespace-nowrap">
            {book.bookName}
          </h2>
          <p className="text-base w-40 text-gray-500 truncate overflow-hidden whitespace-nowrap">
            {book.author}
          </p>
          <p className="text-green-600 font-medium text-sm">Status: {book.status}</p>
          
          <div className="flex space-between justify-between items-center mt-2">
            <p className="text-yellow-500 text-sm flex items-center gap-1">
            ⭐ {book.rating || "N/A"}
          </p>
          <p className="font-bold text-red-600">
            ${book.price}
          </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
