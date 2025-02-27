import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  try {
    const submission = await prisma.submission.create({
      data: {
        data: JSON.stringify(data),
      },
    });
    return NextResponse.json(submission, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}