import React, { memo } from "react";
import ImageCard from "./ImageCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/cartSlice";

export const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductDetails = () => {
    navigate(`/products/${product.id}`, {
      state: { product },
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
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
      <div className="mt-2 space-y-0.5">
        <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 font-semibold">{product.brand}</p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-green-600 mt-1">₹{product.price}</p>
        <p className="text-xs text-gray-400">Warranty: {product.warranty}</p>
        <div className="mt-2 flex gap-2 justify-between">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-green-700"
          >
            Add to Cart
          </button>
          <button className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "Product";
