import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { runBrain } from "@/lib/engine";
import { prisma } from "@/lib/prisma";
import { brainSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = brainSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = runBrain(parsed.data);
    const row = await prisma.cortexRun.create({
      data: {
        inputs: parsed.data as unknown as Prisma.InputJsonValue,
        result: result as unknown as Prisma.InputJsonValue,
      },
    });
    return NextResponse.json({ id: row.id, result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to run company brain" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await prisma.cortexRun.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ runs: rows });
}
