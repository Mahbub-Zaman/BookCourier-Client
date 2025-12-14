import React from "react";
import { useNavigate } from "react-router-dom";

//Each card must show: , 

export default function FoodCard({ food }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/food/${food._id}`); // Navigate to food details page
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={food.food_image}
        alt={food.food_name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-primary mb-2">{food.food_name}</h2>
        <p className="text-gray-600">{food.food_quantity}</p>
        <p className="text-gray-700">
          <span className="font-semibold">Pickup:</span> {food.pickup_location}
        </p>

        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Expire Date: </span>{food.expire_date}
        </p>

        <h2 className="text-green-600 font-bold mt-2">Donator Name :</h2>
        <div className="flex items-center">
              <img
                src={food.donator_image}
                alt={food.donator_name}
                className="w-9 h-9 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-gray-800 text-1xl font-semibold">{food.donator_name}</p>
                <p className="text-gray-500 text-1xl text-sm">{food.donator_email}</p>
              </div>
        </div>

        <button
          onClick={handleViewDetails}
          className="btn btn-primary mt-2 w-full"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

