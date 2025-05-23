// Products.js
import React from "react";
import { Button, ProductCard } from "../../components";

export const Products = ({ title, products }) => {
  return (
    <section className="my-8 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <Button title="More" link={`/products-category/${title}`} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
