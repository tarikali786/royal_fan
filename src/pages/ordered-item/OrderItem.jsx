import React, { useEffect, useState } from "react";
import ImageCard from "../../components/ImageCard";
import { useNavigate } from "react-router-dom";

export const OrderItem = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(orders);
  }, []);

  const handleItemDetails = (itemId) => {
    navigate(`/products/${itemId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6">Your Orders</h2>

      {orderHistory.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        [...orderHistory].reverse().map((order, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg mb-6 shadow-sm"
          >
            <div className="bg-gray-100 px-4 py-2 flex justify-between items-center text-sm text-gray-600">
              <span>Order #{index + 1}</span>
              <span>{new Date(order.time).toLocaleDateString()}</span>
            </div>

            <div className="p-4 space-y-3">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition duration-200 ease-in-out"
                  onClick={() => handleItemDetails(item.id)}
                >
                  <ImageCard
                    src={item?.thumbnail}
                    alt={item.name}
                    cardCss="w-24 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between text-sm w-full">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {order.address.fullAddress}, {order.address.pinCode}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right text-sm font-semibold pt-2 border-t mt-3">
                Total: ₹{order.total}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
