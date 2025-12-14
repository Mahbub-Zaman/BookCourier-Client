import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const ManageFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch foods added by the logged-in user
  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://plateshare-api-server-beige.vercel.app/foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user foods:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // Delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plateshare-api-server-beige.vercel.app/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Food deleted successfully!");
              setFoods(foods.filter((food) => food._id !== id));
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to delete food.");
          });
      }
    });
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading your foods...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 mx-auto max-w-6xl">
      <title>PlateShare | Manage My Food</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Manage Your Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Food Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Pickup Location</th>
                <th className="border px-4 py-2">Expire Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="text-center">
                  <td className="border px-4 py-2">{food.food_name}</td>
                  <td className="border px-4 py-2">{food.food_quantity}</td>
                  <td className="border px-4 py-2">{food.pickup_location}</td>
                  <td className="border px-4 py-2">{food.expire_date}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
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

export default ManageFood;
