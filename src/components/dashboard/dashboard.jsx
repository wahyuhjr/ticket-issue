"use client";
import { API_URL } from "@/config/apiUrl";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { title, description, userId } = issue;
    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, userId }),
      });
      console.log(res);
      if (!res.ok) {
        toast.error("Creadte ticket failed!");
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setLoading(true);
      toast.success("Created ticket successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <main className="w-full bg-[#18181B] min-h-screen text-white text-center">
        <div class="flex flex-col gap-4 pt-5">
          <h1 class="text-3xl font-bold">Welcome</h1>
          <p class="text-lg">You are now logged in</p>
        </div>
        {/* add data */}
        <div class="space-y-4 pt-4">
          <label className="font-bold">Input issue</label>
          <Input
            onChange={handleChange}
            className="w-1/2 mx-auto"
            placeholder="title"
          />
          <Textarea
            onChange={handleChange}
            className="w-1/2 mx-auto"
            placeholder="description"
          />
          <Button
            isDisabled={loading}
            onClick={handleSubmit}
            className="bg-primary text-white py-3 w-1/2 mx-auto rounded-lg"
          >
            Create Ticket
          </Button>
        </div>
      </main>
    </div>
  );
}
