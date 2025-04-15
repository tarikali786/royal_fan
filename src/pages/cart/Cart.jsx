import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
} from "../../features/slices/cartSlice";
import ImageCard from "../../components/ImageCard";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    localStorage.removeItem("directOrderItem");
    navigate("/order", { state: { cartItems } });
  };
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + gst + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-green-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 items-center  p-4 rounded-lg shadow-lg "
            >
              <ImageCard
                src={item.thumbnail}
                alt={item.name}
                cardCss="h-28 w-40"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.brand}</p>
                <p className="text-black font-bold mt-1">₹{item.price}</p>
                <p className="text-black/60 text-sm mt-1">{item.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-gray-600">Qty:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="border px-2 py-1 w-16 rounded"
                    min="1"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="  p-6 rounded-lg border  border-black/40 shadow-lg sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
