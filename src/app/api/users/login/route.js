import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "@/utils/prisma";

export async function GET(req){
  const requestHeaders = new Headers(req.headers);
  console.log(requestHeaders);
}

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Jika user tidak ditemukan, kirim pesan error
    if (!findUser) {
      return NextResponse.json(
        { errorMessage: "Invalid credentials" },
        { status: 404 }
      );
    }

    // Bandingkan password yang diinputkan dengan password yang ada di database
    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      // toast.error('Email or password is incorrect!')
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 404 }
      );
    }

    // Jika password cocok, kirim data user
    const payload = {
      id: findUser.id,
      email: findUser.email,
      password: findUser.password,
    };

    // Buat token JWT
    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = NextResponse.json(
      { data: payload, message: "Login Success" },
      { status: 200, token }
    );
    res.cookies.set("token", token);

    return res;
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}

