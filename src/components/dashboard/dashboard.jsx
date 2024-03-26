"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useDahsboard } from "./hooks/useDahsboard";
import { SquarePen, Trash2 } from "lucide-react";

export default function Dashboard() {
  const { tickets, currentTicket, loading, handleChange, handleSubmit } =
    useDahsboard();

  return (
    <div>
      <main className="w-full bg-[#18181B] min-h-screen text-center px-4">
        <div className="flex flex-col gap-4 pt-5 text-white">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg">You are now logged in</p>
        </div>
        <div className="space-y-4 pt-4">
          <label className="font-bold text-white">Input Ticket</label>
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
        <div className="flex justify-center py-3">
          <div className="grid grid-cols-4 gap-4 mt-6">
            {tickets.map((ticket, index) => (
              <Card key={index} className="max-w-[400px]">
                <CardHeader className="flex justify-between items-center gap-3">
                  <p className="text-lg font-bold">{ticket.title}</p>
                  <div className="flex flex-row gap-2">
                    <Tooltip content="Delete" color="danger">
                      <Trash2 size={20} className="text-pink-500" />
                    </Tooltip>
                    <Tooltip onClick={handleSubmit} content="Edit" color="success">
                      <SquarePen size={20} className="text-green-400"/>
                    </Tooltip>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-sm text-default-500">
                    {ticket.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
