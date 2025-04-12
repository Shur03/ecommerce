
import { useState } from "react";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData: FormData) => {
    setSubmitting(true);
    setError("");

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        callbackUrl: "/product",
      });
    } catch (err) {
      setError("Нэвтрэхэд алдаа гарлаа.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    error,
    handleLogin,
  };
};
