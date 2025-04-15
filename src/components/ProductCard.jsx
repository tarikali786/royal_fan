import React, { memo, useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/slices/cartSlice";

export const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const exists = cartItems.some((item) => item.id === product.id);
    setIsInCart(exists);
  }, [cartItems, product.id]);

  const handleProductDetails = () => {
    navigate(`/products/${product.id}`, {
      state: { product },
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart(product.id));
  };

  const handleOrderNow = (e) => {
    e.stopPropagation();
    localStorage.setItem(
      "directOrderItem",
      JSON.stringify({ ...product, quantity: 1 })
    );
    navigate("/order");
  };

  return (
    <div
      onClick={handleProductDetails}
      className="bg-white shadow-md rounded-xl p-3 w-full cursor-pointer"
    >
      <ImageCard
        src={product.thumbnail}
        alt={product.name}
        cardCss={"w-full h-40 object-cover rounded-md"}
      />

      <div className="mt-2 space-y-1">
        <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 font-semibold">{product.brand}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <p className="font-bold text-green-600 mt-1">₹{product.price}</p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">Warranty: {product.warranty}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-2">
            <label className="text-sm text-gray-700">Qty:</label>
            <select
              value={quantity}
              disabled={isInCart}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`border px-2 py-0.5 rounded-md text-sm ${
                isInCart ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2 flex gap-2 justify-between">
          {isInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-400 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-green-700"
            >
              Add to Cart
            </button>
          )}

          <button
            onClick={handleOrderNow}
            className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "Product";
