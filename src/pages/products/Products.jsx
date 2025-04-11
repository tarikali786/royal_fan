import React from 'react'
import { ProductCard } from '../../components'

export const Products = ({ title, products }) => {
  return (
    <section className="my-8 w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
