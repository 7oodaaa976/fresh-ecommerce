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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, registerType } from "@/Schema/registerSchema";
import { useRouter } from "next/navigation";
import { authRegister } from './../../services/authServ';

export default function Register() {
  const router = useRouter();
  const form = useForm<registerType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleRegister(forminfo: registerType) {
    console.log(forminfo);

   authRegister(forminfo)
   router.push('/login')
  }
  return (
    <>
      <div className="w-full px-6 lg:w-[60%] mx-auto my-14 ">
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name : </FormLabel>
                  <FormControl>
                    <Input className="mb-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email : </FormLabel>
                  <FormControl>
                    <Input type="email" className="mb-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> password : </FormLabel>
                  <FormControl>
                    <Input type="password" className="mb-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> rePassword : </FormLabel>
                  <FormControl>
                    <Input type="password" className="mb-2" {...field} />
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
                  <FormLabel> Phone : </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <Button className="w-full cursor-pointer bg-[#000aa1]" type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}
