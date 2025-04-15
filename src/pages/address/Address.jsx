import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const Address = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    fullAddress: "",
    pinCode: "",
  });

  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setForm(JSON.parse(savedAddress));
      setHasAddress(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userAddress", JSON.stringify(form));
    alert("Address saved successfully!");
    navigate("/order");
  };

  const handleDelete = () => {
    localStorage.removeItem("userAddress");
    setForm({
      name: "",
      email: "",
      phone: "",
      fullAddress: "",
      pinCode: "",
    });
    setHasAddress(false);
    alert("Address deleted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary via-white to-yellow-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="md:text-2xl text-xl font-bold text-center text-black/80 mb-8">
          {hasAddress ? "Update Your Address" : "Enter Delivery Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex items-center gap-3 border px-3 py-2.5 rounded-lg shadow-sm">
            <PersonIcon className="text-primary" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="flex-1 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border px-3 py-2.5 rounded-lg shadow-sm">
            <EmailIcon className="text-primary" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="flex-1 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 border px-3 py-2.5 rounded-lg shadow-sm">
            <PhoneIcon className="text-primary" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="flex-1 outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 border px-3 py-2.5 rounded-lg shadow-sm">
            <HomeIcon className="mt-1 text-primary" />
            <textarea
              name="fullAddress"
              value={form.fullAddress}
              onChange={handleChange}
              placeholder="Full Address"
              required
              rows="3"
              spellCheck="false"
              className="flex-1 outline-none resize-none"
            />
          </div>

          {/* Pin Code */}
          <div className="flex items-center gap-3 border px-3 py-2.5 rounded-lg shadow-sm">
            <LocationOnIcon className="text-primary" />
            <input
              type="text"
              name="pinCode"
              value={form.pinCode}
              onChange={handleChange}
              placeholder="Pin Code"
              required
              className="flex-1 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-between pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {hasAddress ? "Update Address" : "Save & Proceed"}
            </button>

            {hasAddress && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete Address
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
