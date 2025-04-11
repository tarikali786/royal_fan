import React from "react";
import { Hero } from "./Hero";
import { Products } from "../products/Products";
import { productData } from "../../data/productData";

export const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col  w-full  common-padding  ">
        {Object.keys(productData).map((category) => (
          <Products
            key={category}
            title={category}
            products={productData[category]}
          />
        ))}
      </div>
    </>
  );
};
