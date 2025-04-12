import React from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data/productData";
import { ProductCard } from "../../components";

export const ProductsCategory = () => {
  const { category } = useParams();
  const ProductCategory = productData.filter(
    (item) => item?.category == category
  );

  return (
    <div className=" common-padding pb-20 pt-10">
      <h2 className="text-xl  mb-6 font-semibold">{category}</h2>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ProductCategory?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
