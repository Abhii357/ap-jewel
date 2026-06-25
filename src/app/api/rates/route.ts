import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to seed gold and diamond rates if empty on startup
async function getOrSeedRates() {
  const goldCount = await db.goldRate.count();
  if (goldCount === 0) {
    await db.goldRate.createMany({
      data: [
        { karat: "24K", pricePerGram: 7450 },
        { karat: "22K", pricePerGram: 6830 },
        { karat: "18K", pricePerGram: 5590 },
      ],
    });
  }

  const diamondCount = await db.diamondRate.count();
  if (diamondCount === 0) {
    await db.diamondRate.createMany({
      data: [
        { quality: "VVS-EF", pricePerCarat: 95000 },
        { quality: "VS-GH", pricePerCarat: 80000 },
        { quality: "SI-IJ", pricePerCarat: 65000 },
      ],
    });
  }

  const gold = await db.goldRate.findMany();
  const diamond = await db.diamondRate.findMany();
  return { gold, diamond };
}

export async function GET() {
  try {
    const rates = await getOrSeedRates();
    return NextResponse.json({ success: true, rates });
  } catch (error) {
    console.error("Rates fetch error:", error);
    return NextResponse.json({ error: "Internal server error fetching rates." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { karat, pricePerGram, quality, pricePerCarat } = body;

    if (karat && pricePerGram !== undefined) {
      const updated = await db.goldRate.upsert({
        where: { karat },
        update: { pricePerGram: parseFloat(pricePerGram) },
        create: { karat, pricePerGram: parseFloat(pricePerGram) },
      });
      return NextResponse.json({ success: true, rate: updated });
    }

    if (quality && pricePerCarat !== undefined) {
      const updated = await db.diamondRate.upsert({
        where: { quality },
        update: { pricePerCarat: parseFloat(pricePerCarat) },
        create: { quality, pricePerCarat: parseFloat(pricePerCarat) },
      });
      return NextResponse.json({ success: true, rate: updated });
    }

    return NextResponse.json({ error: "Missing required parameters to update rates." }, { status: 400 });
  } catch (error) {
    console.error("Rates update error:", error);
    return NextResponse.json({ error: "Internal server error updating rates." }, { status: 500 });
  }
}
