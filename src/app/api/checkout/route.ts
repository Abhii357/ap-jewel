import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      guestEmail,
      guestName,
      guestPhone,
      totalAmount,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      couponCode,
      discountAmount,
      items,
    } = body;

    if (!items || items.length === 0 || !totalAmount || !addressLine1 || !city || !state || !postalCode) {
      return NextResponse.json({ error: "Missing required checkout parameters." }, { status: 400 });
    }

    // Generate unique order number: APJ-YEAR-RANDOM (4 digits)
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `APJ-${year}-${rand}`;
    const paymentId = `pay_mock_${Math.random().toString(36).substring(2, 11)}`;

    // Create the order using a transaction/nested write
    const order = await db.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        guestEmail: guestEmail || null,
        guestName: guestName || null,
        guestPhone: guestPhone || null,
        totalAmount: parseFloat(totalAmount),
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        postalCode,
        country: country || "India",
        couponCode: couponCode || null,
        discountAmount: parseFloat(discountAmount || "0.0"),
        status: "PROCESSING",
        paymentStatus: "PAID",
        paymentId,
        items: {
          create: items.map((item: any) => ({
            productId: item.id.startsWith("prod-") ? null : item.id,
            productName: item.name,
            quantity: item.quantity,
            priceAtPurchase: parseFloat(item.price),
            weightAtPurchase: parseFloat(item.weight || "0.0"),
            metalTypeAtPurchase: item.metalType || "GOLD",
            purityAtPurchase: item.metalPurity || "22K",
            makingChargeAtPurchase: parseFloat(item.makingChargesValue || "0.0"),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Checkout process error:", error);
    return NextResponse.json({ error: "Internal server error processing checkout." }, { status: 500 });
  }
}
