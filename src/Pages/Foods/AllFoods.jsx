import React, { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://plateshare-api-server-beige.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        // Filter only available foods
        const availableFoods = data.filter(food => food.food_status === "Available");
        setFoods(availableFoods);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 mx-auto max-w-6xl">
      <title>PlateShare | Available Foods</title>
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        All Available Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">No foods available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFoods;
