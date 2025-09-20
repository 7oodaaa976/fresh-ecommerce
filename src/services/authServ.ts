import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { loginType } from "@/Schema/loginSchema";
import { registerType } from "@/Schema/registerSchema";

// ✅ Register
export async function authRegister(forminfo: registerType) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      forminfo
    );
    if (response.data.message === "success") {
      toast.success("Successfully Registered 😀", {
        position: "bottom-center",
        duration: 4000,
      });
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

// ✅ Login
export async function authLogin(forminfo: loginType) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      forminfo
    );
    if (response.data.message === "success") {
      toast.success("Successfully Logged in 😀", {
        position: "top-center",
        duration: 4000,
      });
      // save token to localStorage if needed
      localStorage.setItem("token", response.data.token);
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

// ✅ Send reset code
export async function sendResetCode(email: string) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      { email }
    );
    if (response.data.status === "Success") {
      toast.success("Reset code sent to your email 📩", {
        position: "top-center",
      });
    }
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data.message, {
        position: "top-center",
      });
    }
  }
}

// ✅ Verify reset code
export async function verifyResetCode(resetCode: string) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      { resetCode }
    );
    toast.success("Code verified ✅", { position: "top-center" });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data.message, {
        position: "top-center",
      });
    }
  }
}

// ✅ Reset password
export async function resetPassword(email: string, newPassword: string) {
  try {
    const response = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      { email, newPassword }
    );
    if (response.data.token) {
      toast.success("Password reset successfully 🎉", {
        position: "top-center",
      });
      // ممكن تخزن التوكن الجديد لو حابب
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data.message, {
        position: "top-center",
      });
    }
  }
}
