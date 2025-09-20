"use server"

import { getMyToken } from "@/utitlies/getMyToken"
import { jwtDecode } from "jwt-decode"
import { OrderType } from "@/Types/order.type"

export default async function getUserOrders(): Promise<OrderType[]> {
  const token = await getMyToken()
  if (!token) throw new Error("Please login first")

  const { id } = jwtDecode<{ id: string }>(token)

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
    method: "GET"
  })

  if (!res.ok) throw new Error("Failed to fetch orders")

  const data: OrderType[] = await res.json()
  return data
}
