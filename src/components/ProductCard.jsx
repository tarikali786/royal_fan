import React from "react";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-3 w-full sm:w-[240px]">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain"
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
        <p className="font-bold text-green-600 mt-1">₹{product.price}</p>
        <p className="text-xs text-gray-400">Warranty: {product.warranty}</p>
        <div className="mt-2 flex gap-2">
          <button className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-700">
            Add to Cart
          </button>
          <button className="bg-black text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-800">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
