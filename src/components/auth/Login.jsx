"use client";

import React from "react";
import { useLogin } from "./hooks/useLogin";
import { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export default function Login() {
  const {
    email,
    password,
    loading,
    handleChange,
    handleSubmit,
    handleLoginClick,
  } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center font-bold text-xl mb-6">Welcome Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mx-auto">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mx-auto">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mx-auto">
            <Button
              type="button"
              onClick={handleLoginClick}
              className={`bg-primary text-white py-3 w-full rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
