export type ProductType = {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
};

export type CartItemType = {
  product: ProductType;
  count: number;
  price: number;
};

export type OrderType = {
  _id: string;
  user: string;
  cartItems: CartItemType[];
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
};
