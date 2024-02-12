"use client";
import React from "react";
import { Input } from "../ui/input";

export default function Register() {
  async function handleSubmitRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/api/users/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[360px] bg-white shadow-md rounded px-8 py-6 space-y-4">
        <h2 className="text-center font-bold text-xl">Welcome Admin</h2>
        <form onSubmit={handleSubmitRegister} className="space-y-4">
          <Input name="username" type="text" placeholder="Username" />
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <button className="bg-blue-600 rounded-lg text-white py-3 w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
