import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}