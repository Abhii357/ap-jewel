import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Missing required parameter productId." }, { status: 400 });
    }

    const reviews = await db.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Internal server error fetching reviews." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, rating, comment, userName, title, userId } = body;

    if (!productId || !rating || !comment || !userName) {
      return NextResponse.json({ error: "Missing required parameters to submit review." }, { status: 400 });
    }

    const review = await db.review.create({
      data: {
        productId,
        rating: parseInt(rating),
        comment,
        userName,
        title: title || null,
        userId: userId || null,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json({ error: "Internal server error submitting review." }, { status: 500 });
  }
}
