import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; // Import the custom hook for auth

const AddProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Assuming user contains agent's name and email
  const [imageUrl, setImageUrl] = useState(null);

  // Check if user data is available
  const agentName = user?.displayName || "Agent Name";
  const agentEmail = user?.email || "agent@example.com";

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const propertyData = {
      title: data.title,
      location: data.location,
      priceRange: {
        min: data.priceMin,
        max: data.priceMax,
      },
      agentName: agentName,
      agentEmail: agentEmail,
      imageUrl: imageUrl, // The image URL from ImgBB
    };

    // Save the property to the database
    axiosSecure
      .post("/properties", propertyData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Property added successfully!",
            icon: "success",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to add property.",
          icon: "error",
        });
      });
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setImageUrl(data.data.url); // Set the uploaded image URL
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to upload image.",
              icon: "error",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "Error uploading image.",
            icon: "error",
          });
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add New Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Property Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Property title is required" })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Property Location */}
        <div>
          <label htmlFor="location" className="block text-lg font-medium text-gray-700">Property Location</label>
          <input
            type="text"
            id="location"
            {...register("location", { required: "Property location is required" })}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Property Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Property Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
        </div>

        {/* Agent Name */}
        <div>
          <label htmlFor="agentName" className="block text-lg font-medium text-gray-700">Agent Name</label>
          <input
            type="text"
            id="agentName"
            value={agentName} // Set agent name as readonly
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label htmlFor="agentEmail" className="block text-lg font-medium text-gray-700">Agent Email</label>
          <input
            type="email"
            id="agentEmail"
            value={agentEmail} // Set agent email as readonly
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* Price Range */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="priceMin" className="block text-lg font-medium text-gray-700">Min Price</label>
            <input
              type="number"
              id="priceMin"
              {...register("priceMin", { required: "Min price is required" })}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.priceMin && <p className="text-red-500 text-sm">{errors.priceMin.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="priceMax" className="block text-lg font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              id="priceMax"
              {...register("priceMax", { required: "Max price is required" })}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.priceMax && <p className="text-red-500 text-sm">{errors.priceMax.message}</p>}
          </div>
        </div>

        {/* Add Property Button */}
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">Add Property</button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
