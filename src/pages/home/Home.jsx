import React from "react";
import { Hero } from "./Hero";
import { Products } from "../products/Products";
import { productData } from "../../data/productData";

export const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-8 common-padding border border-black w-full h-[100vh] ">
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
