export const dynamic = "force-dynamic";

import getUserOrders from "@/services/getUserOrders";
import { OrderType } from "@/Types/order.type";
import Image from "next/image";

export default async function AllOrders() {
  const orders: OrderType[] = await getUserOrders();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded mb-4 shadow">
          <p className="text-sm text-gray-500">
            Order ID: {order._id} | Date:{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="font-semibold">
            Total: ${order.totalOrderPrice} | Paid: {order.isPaid ? "✅" : "❌"}
          </p>

          <div className="mt-3 space-y-2">
            {order.cartItems.map((item) => (
              <div key={item.product._id} className="flex items-center gap-3">
                <Image
                  src={item.product.imageCover}
                  width={200}
                  height={200}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.count} × ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
