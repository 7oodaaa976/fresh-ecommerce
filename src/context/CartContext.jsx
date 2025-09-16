"use client";

import { getLoggedUserCart } from "@/CartServ/getUserCart";
import { getMyToken } from "@/utitlies/getMyToken";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCart, setnumOfCart] = useState(0);

 

  async function GetUserData() {
    try {
      let res = await getLoggedUserCart();
      console.log(res);

    

      if (res.status === "success") {
        setnumOfCart(res.numOfCartItems)
        
      }
      

    } catch (err) {
      console.log(`Error ${err}`);
    }
  }

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <CartContext.Provider value={{ numOfCart, setnumOfCart }}>
      {children}
    </CartContext.Provider>
  );
}
