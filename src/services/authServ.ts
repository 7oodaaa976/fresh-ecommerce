import { loginType } from "@/Schema/loginSchema";
import { registerType } from "@/Schema/registerSchema";
import axios from "axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export async function authRegister(forminfo: registerType) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      forminfo
    );
    if (response.data.message === "success") {
      toast.success("Successfuly Registerd 😀", {
        position: "bottom-center",
        duration: 4000,
      });
    }
  } catch (err:unknown) {
    if(err instanceof AxiosError){
       toast.error(err?.response?.data.message, {
      position: "top-center",
      duration: 4000,
    });

    }
   
  }
}

export async function authLogin(forminfo: loginType) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      forminfo
    );
    if (response.data.message === "success") {
      toast.success("Successfuly Loged in  😀", {
        position: "top-center",
        duration: 4000,
      });
      // console.log(response);
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data.message, {
        position: "top-center",
        duration: 4000,
      });
    }
  }
}
