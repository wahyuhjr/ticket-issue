// frontend/hooks/useLogin.js
"use client";
import { API_URL } from "@/config/apiUrl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password fields");
    } else {
      await handleSubmit();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      // const data = await res.json();
      router.push("/dashboard");
      toast.success("Login success");

    } catch (error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    handleChange,
    handleSubmit,
    handleLoginClick,
  };
};
