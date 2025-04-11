import React from "react";
import { Hero } from "./Hero";
import { Products } from "../products/Products";
import { productData } from "../../data/productData";

export const Home = () => {
  // Group products by category
  const groupedProducts = productData.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <>
      <Hero />
      <div className="flex flex-col w-full common-padding">
        {Object.keys(groupedProducts).map((category) => (
          <Products
            key={category}
            title={category}
            products={groupedProducts[category]}
          />
        ))}
      </div>
    </>
  );
};
 