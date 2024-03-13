"use client";
import { API_URL } from "@/config/apiUrl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [registerData, setRegisterData] = useState({
      username:"",
      email:"",
      password:"",
    });
  
    function handleChange(e) {
      const { name, value } = e.target;
      setRegisterData({ ...registerData, [name]: value });
    }
  
    async function handleSubmitRegister() {
      setLoading(true);
        const { username, email, password } = registerData;
        try {
          const res = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });
          console.log(res);
          if (!res.ok) {
            toast.error("Register failed!")
            throw new Error(`Server error: ${response.status}`);
          }
      
          const data = await res.json();
          setLoading(false);
          toast.success("User registered, please login...");
          router.push("/login");

        } catch (error) {
          console.error("Error:", error.message);
        }
      }
      
  
    return {
      loading,
      handleChange,
      handleSubmitRegister,
    };
}
