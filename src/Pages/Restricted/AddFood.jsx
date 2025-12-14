import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const AddFood = () => {
  const { user } = useAuth(); // Logged-in Firebase user
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is logged in
    if (!user) {
      toast.error("You must be logged in to add food.");
      return;
    }

    // Validate inputs
    if (!foodName.trim()) return toast.error("Please provide a food name.");
    if (!imageUrl.trim()) return toast.error("Please provide a food image URL (must use ImgBB).");
    if (!imageUrl.includes("https://i.ibb.co/") && !imageUrl.includes("https://ibb.co/")) {
      return toast.error("Image must be hosted on ImgBB!");
    }
    if (!quantity.trim()) return toast.error("Please provide food quantity.");
    if (!pickupLocation.trim()) return toast.error("Please provide pickup location.");
    if (!expireDate) return toast.error("Please select expire date.");

    setLoading(true);

    try {
      // Prepare food data
      const foodData = {
        food_name: foodName,
        food_image: imageUrl,
        food_quantity: `Serves ${quantity} ${quantity === "1" ? "person" : "people"}`,
        pickup_location: pickupLocation,
        expire_date: expireDate,
        additional_notes: notes,
        donator_name: user.displayName,
        donator_email: user.email,
        donator_image: user.photoURL,
        food_status: "Available",
        createdAt: new Date(),
      };


      // Send to backend
      const response = await fetch("https://plateshare-api-server-beige.vercel.app/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const result = await response.json();
      console.log("MongoDB response:", result);

      toast.success("✅ Food added successfully!");
      setLoading(false);

      // Reset form
      setFoodName("");
      setImageUrl("");
      setQuantity("");
      setPickupLocation("");
      setExpireDate("");
      setNotes("");

      // Delay navigation to show toast
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <title>PlateShare | Add Food</title>
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Add Food</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96 flex flex-col gap-4"
      >
        {/* Food Name */}
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
          className="input"
        />

        {/* Image URL */}
        <input
          type="url"
          placeholder="Food Image URL (must use ImgBB)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="input"
        />

        {/* Quantity */}
        <input 
          type="number"
          placeholder="Food Quantity (e.g., 2)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="input"
        />


        {/* Pickup Location */}
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
          className="input"
        />

        {/* Expire Date */}
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          required
          className="input"
        />

        {/* Additional Notes */}
        <textarea
          placeholder="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
