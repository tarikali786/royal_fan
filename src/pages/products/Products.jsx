import React from "react";
import { Button, ProductCard } from "../../components";

export const Products = ({ title, products }) => {
  return (
    <section className="my-8 w-full">
      <div className="flex  justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <Button title="More" />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
