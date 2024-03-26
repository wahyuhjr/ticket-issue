import prisma from "@/utils/prisma";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log(process.env.JWT_SECRET)
  const { title, description } = await req.json();
  const authorization = req.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const data = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)); 
  try {
    const createTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        userId: data.payload.id,
      },
    });

    return NextResponse.json({
      data: createTicket,
      message: "Ticket created successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error); 
    return NextResponse.error(
      "Something went wrong while creating the ticket. Please try again later",
      500
    );
  }
}
