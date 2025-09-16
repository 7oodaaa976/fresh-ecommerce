"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { schema, checkoutType } from "@/Schema/checkoutSchema";
import OnlineCheckout from "@/checkOutServ/onlineCheckout";
import { createCashOrder } from "@/checkOutServ/cashCheckout"; // هنعمله تحت

export default function Checkout() {
  const id = useParams().id as string;
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online");
  const form = useForm<checkoutType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(schema),
  });

    async function handleCheckout(forminfo: checkoutType) {
    try {
      if (paymentMethod === "online") {
        const res = await OnlineCheckout(id, "", forminfo);
        if (res.status === "success") {
          window.location.href = res.session.url;
        }
      } else {
        const res = await createCashOrder(id, forminfo);
        toast.success("Cash Order Created Successfully ✅");
        console.log(res);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else if (typeof err === "string") {
        toast.error(err);
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  }


  return (
    <div className="w-full px-6 lg:w-[60%] mx-auto my-14">
      <h1 className="text-[#99A1AF] text-center font-bold text-3xl">CheckOut</h1>

      <form onSubmit={form.handleSubmit(handleCheckout)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type="text" className="mb-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type="text" className="mb-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type="text" className="mb-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        <div className="flex gap-4 my-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            Online Payment
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash on Delivery
          </label>
        </div>

        <Button className="w-full cursor-pointer bg-[#000aa1]" type="submit">
          {paymentMethod === "online" ? "Pay Online" : "Place Cash Order"}
        </Button>
      </form>
    </div>
  );
}
