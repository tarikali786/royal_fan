import React from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data/productData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ImageCard from "../../components/ImageCard";
import { ProductCard } from "../../components";

export const ProductDetails = () => {
  const { id } = useParams();
  const product = productData.find((item) => item.id === id);

  if (!product)
    return <div className="text-center py-8">Product not found</div>;

  // Get related products by category
  const relatedProducts = productData.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="rounded-lg overflow-hidden"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <ImageCard
                  src={img}
                  alt={`${product.name}-${idx}`}
                  cardCss="w-full h-[40vh]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Thumbnail previews */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <ImageCard key={idx} src={img} cardCss="size-16" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm">Brand: {product.brand}</p>
          <p className="text-gray-800 text-lg font-semibold">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">Warranty: {product.warranty}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
              Add to Cart
            </button>
            <button className="bg-primary hover:bg-gray-800 text-white px-6 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
