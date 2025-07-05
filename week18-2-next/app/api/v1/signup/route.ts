import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { username, password } = data;
  const user = await client.user.create({
    data: {
      username,
      password,
    },
  });
  console.log(data);

  return NextResponse.json({
    message: "You have been signed up",
  });
}

export async function GET() {
  const user = await client.user.findFirst({});
  return Response.json({ name: user?.username, email: user?.username });
}
