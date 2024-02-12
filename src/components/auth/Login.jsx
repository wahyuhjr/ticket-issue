"use client";

import React from "react";
import { Input } from "../ui/input";
import { useLogin } from "./hooks/useLogin";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const { email, password, loading, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[360px] bg-white shadow-md rounded px-8 py-6 space-y-4">
        <h2 className="text-center font-bold text-xl">Welcome Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`bg-blue-600 rounded-lg text-white py-3 w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
            <Toaster position="top-center" reverseOrder={false} />
          </button>
        </form>
      </div>
    </div>
  );
}
