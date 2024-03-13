import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Get data from request body
  const { title, description, userId } = await req.json();

  try {
    // Create ticket
    const createTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        userId,
      },
    });

    // Return success response
    return NextResponse.json({
      data: createTicket,
      message: "Ticket created successfully",
      status: 200,
    });
  } catch (error) {
    // Handle errors
    console.log(error); // Log the error for debugging
    return NextResponse.error(
      "Something went wrong while creating the ticket. Please try again later",
      500
    );
  }
}
