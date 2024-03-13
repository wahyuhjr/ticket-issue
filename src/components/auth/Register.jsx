"use client";

import { Button, Input } from "@nextui-org/react";
import { useRegister } from "./hooks/useRegister";
import { Toaster } from "react-hot-toast";

export default function Register() {
  const { loading, handleChange, handleSubmitRegister } = useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[360px] bg-white shadow-md rounded px-8 py-6 space-y-4">
        <h2 className="text-center font-bold text-xl">Welcome Admin</h2>
        <form className="space-y-4">
          <Input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            isDisabled={loading}
            onClick={handleSubmitRegister}
            className="bg-blue-600 rounded-lg text-white py-3 w-full"
          >
            Register
          </Button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
