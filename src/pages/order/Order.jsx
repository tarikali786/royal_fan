import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import emailjs from "emailjs-com";
import { clearCart } from "../../features/slices/cartSlice";

export const Order = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("userAddress"));
    const directItem = JSON.parse(localStorage.getItem("directOrderItem"));

    if (!savedAddress) {
      navigate("/address");
    } else {
      setAddress(savedAddress);
    }

    if (directItem) {
      setOrderItems([directItem]);
    } else {
      setOrderItems(cartItems);
    }
  }, []);

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = (total * 0.18).toFixed(2);
  const grandTotal = (total + parseFloat(gst)).toFixed(2);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handlePlaceOrder = () => {
    const emailParams = {
      to_email: "tarikali7444@gmail.com", // Optional: used only if added in template
      items: orderItems
        .map(
          (item) =>
            `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`
        )
        .join(", "),
      total: grandTotal,
    };

    // Send email to admin
    emailjs
      .send(
        "service_ypcajti",
        "template_8yc85pp",
        emailParams,
        "xGPZYmQSqpn-Nqt1j"
      )
      .then(() => {
        alert("Order Placed & Email Sent!");
      })
      .catch((err) => {
        alert("Order Placed but email failed!");
        console.error("Email error:", err.text || err);
      });
    dispatch(clearCart());
    // Save order in localStorage
    const existingOrders =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    localStorage.setItem(
      "orderHistory",
      JSON.stringify([
        ...existingOrders,
        {
          orderItems,
          address,
          total: grandTotal,
          time: new Date().toISOString(),
        },
      ])
    );

    // Clear direct item and navigate home
    localStorage.removeItem("directOrderItem");
    navigate("/order-item");
  };

  if (!address) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 items-start gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {orderItems.map((item) => (
          <div key={item.id} className="flex gap-6 shadow p-4 rounded mb-3">
            <ImageCard
              src={item?.thumbnail}
              alt={item.name}
              cardCss="sm:h-28 sm:w-40 h-24 w-60"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm">Qty: {item.quantity}</p>
              <p className="text-sm">{item.description}</p>
              <p className="text-sm">
                Price: <b> ₹{item.price * item.quantity}</b>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg space-y-4 sticky top-24">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <button
            onClick={() => navigate("/address")}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm">
            <strong>{address?.name}</strong>
          </p>
          <p className="text-sm">{address?.email}</p>
          <p className="text-sm">{address?.phone}</p>
          <p className="text-sm">
            {address?.fullAddress}, {address?.pinCode}
          </p>
        </div>

        <hr />
        <div className="flex justify-between">
          <p className="sm:text-[16px] text-sm">Item Price:</p>
          <b className="sm:text-[16px] text-sm">₹{total}</b>
        </div>
        <hr />
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="sm:text-[16px] text-sm"> GST (18%):</p>
            <b className="sm:text-[16px] text-sm">₹{gst}</b>
          </div>
          <hr />
          <div className="mt-4 flex justify-between">
            <p className="sm:text-[16px] text-sm">Total:</p>
            <b className="sm:text-[16px] text-sm">₹{grandTotal}</b>
          </div>
        </div>

        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg w-full hover:bg-green-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
