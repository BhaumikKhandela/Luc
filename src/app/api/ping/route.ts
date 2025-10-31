import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function wakeDb(maxRetries = 100, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (err) {
      console.warn(`DB wake attempt ${i + 1} failed. Retrying...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("DB did not wake in time.");
}

export async function GET() {
  try {
    await wakeDb(); // 👈 keep retrying until Neon wakes
    return NextResponse.json({ status: "ok", message: "DB is awake 🚀" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
