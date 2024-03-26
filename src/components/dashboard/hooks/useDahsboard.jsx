"use client";
import { API_URL } from "@/config/apiUrl";
import { useState } from "react";
import toast from "react-hot-toast";

export const useDahsboard = () => {
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]); 
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
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        });
        if (!res.ok) {
          toast.error("Create ticket failed!");
          throw new Error("Something went wrong");
        }

        // console.log(document.cookie);
  
        const newData = await res.json();
        setLoading(false); 
        setTickets([...tickets, newData.data]); // Add new ticket to the list
        setcurrentTicket({ title: "", description: "" }); // Reset form
        toast.success("Created ticket successfully");
  
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false); 
      }
    };

    return{
        loading,
        tickets,
        currentTicket,
        handleChange,
        handleSubmit
    };
}
