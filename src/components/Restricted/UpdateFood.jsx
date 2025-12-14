import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(""); // <-- Add this

  // Fetch existing food data
  useEffect(() => {
    fetch(`https://plateshare-api-server-beige.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        // Extract numeric value from "Serves X people" string
        const qty = data.food_quantity.match(/\d+/);
        setQuantity(qty ? qty[0] : "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFood = {
      food_name: food.food_name,
      food_image: food.food_image,
      food_quantity: `Serves ${quantity} ${quantity === "1" ? "person" : "people"}`,
      pickup_location: food.pickup_location,
      expire_date: food.expire_date,
      additional_notes: food.additional_notes,
      food_status: food.food_status,
    };

    try {
      const res = await fetch(`https://plateshare-api-server-beige.vercel.app/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFood),
      });

      const data = await res.json();
      console.log("Update response:", data);
      toast.success("Food updated successfully!");
      navigate("/manage-food");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading food data...</p>;
  if (!food) return <p className="text-center mt-20">Food not found.</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Update Food</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Food Name"
          value={food.food_name}
          onChange={(e) => setFood({ ...food, food_name: e.target.value })}
          required
          className="input"
        />
        <input
          type="url"
          placeholder="Food Image URL"
          value={food.food_image}
          onChange={(e) => setFood({ ...food, food_image: e.target.value })}
          required
          className="input"
        />
        <input
          type="number"
          placeholder="Food Quantity (e.g., 2)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="input"
        />
        <input
          type="text"
          placeholder="Pickup Location"
          value={food.pickup_location}
          onChange={(e) => setFood({ ...food, pickup_location: e.target.value })}
          required
          className="input"
        />
        <input
          type="date"
          value={food.expire_date}
          onChange={(e) => setFood({ ...food, expire_date: e.target.value })}
          required
          className="input"
        />
        <textarea
          placeholder="Additional Notes"
          value={food.additional_notes}
          onChange={(e) => setFood({ ...food, additional_notes: e.target.value })}
          className="textarea"
        />
        <button type="submit" className="btn btn-primary mt-4">Update Food</button>
      </form>
    </div>
  );
};

export default UpdateFood;
