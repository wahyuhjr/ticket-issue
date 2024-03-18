"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";
import { API_URL } from "@/config/apiUrl";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState(false); // State to store tickets
  const [currentTicket, setcurrentTicket] = useState({
    title: "",
    description: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurrentTicket({ ...currentTicket, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { title, description } = currentTicket;
    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userId: "2860579e-e315-42b5-a6ad-3fd4b16bae9d",
        }),
      });
      if (!res.ok) {
        toast.error("Create ticket failed!");
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setLoading(false); // Set loading to false after successful submission
      setTickets([...tickets, data]); // Add new ticket to the list
      setcurrentTicket({ title: "", description: "" }); // Reset form
      toast.success("Created ticket successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false); // Set loading to false if submission fails
    }
  };

  console.log(tickets); 

  return (
    <div>
      <main className="w-full bg-[#18181B] min-h-screen text-center">
        <div className="flex flex-col gap-4 pt-5 text-white">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg">You are now logged in</p>
        </div>
        <div className="space-y-4 pt-4">
          <label className="font-bold text-white">Input currentTicket</label>
          <Input
            name="title"
            value={currentTicket.title}
            onChange={handleChange}
            className="w-1/2 mx-auto"
            placeholder="title"
          />
          <Textarea
            name="description"
            value={currentTicket.description}
            onChange={handleChange}
            className="w-1/2 mx-auto"
            placeholder="description"
          />
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-primary text-white py-3 w-1/2 mx-auto rounded-lg"
          >
            Create Ticket
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-4 mt-6">
            {tickets.map((ticket, index) => ( 
            <Card key={index} className="max-w-[400px]">
              {/* <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader> */}
              <CardBody>
                <p className="text-md">{ticket.title}</p> {/* Display title */}
                <p className="text-small text-default-500">
                  {ticket.description}
                </p>
              </CardBody>
            </Card>
            ))}
            {/* Repeat for other cards */}
          </div>
        </div>
      </main>
    </div>
  );
}

