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
import { toast } from "sonner";
import { schema, loginType } from "@/Schema/loginSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const form = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleLogin(forminfo: loginType) {
    console.log(forminfo);
    const res = await signIn("credentials", {
      email: forminfo.email,
      password: forminfo.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);
    if (res?.ok) {
      toast.success("Successfully logedIn ", {
        position: "top-center",
        duration: 2000,
      });
      window.location.href = "/";
    } else {
      toast.error(res?.error, { position: "top-center", duration: 4000 });
    }

    router.push("/");
  }
  return (
    <>
      <div className="w-full px-6 lg:w-[60%] mx-auto my-14 ">
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <Form {...form}>
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
          </Form>
          <Button className="w-full cursor-pointer bg-[#000aa1]" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
