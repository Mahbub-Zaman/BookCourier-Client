import React, { useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";

export default function FeaturedFoods() {
  const [foods, setFoods] = useState([]);

  const loadFoods = () => {
    fetch("https://plateshare-api-server-beige.vercel.app/featured-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  };

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <div className="px-6 py-12 mx-auto max-w-6xl">
      <h1 className="text-3xl text-center font-bold text-primary mb-8">
        Latest Food Items
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}
