import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to seed categories if empty on startup
async function getOrSeedCategories() {
  const count = await db.category.count();
  if (count === 0) {
    await db.category.createMany({
      data: [
        { name: "Rings", slug: "rings", description: "Diamond & gold bands" },
        { name: "Necklaces", slug: "necklaces", description: "Handcrafted chains & chokers" },
        { name: "Bangles", slug: "bangles", description: "Traditional heavy kadas" },
        { name: "Earrings", slug: "earrings", description: "Diamond studs & jhumkas" },
        { name: "Bracelets", slug: "bracelets", description: "Tennis bracelets & links" },
      ],
    });
  }
  return db.category.findMany();
}

export async function GET() {
  try {
    const categories = await getOrSeedCategories();
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true, category: true },
    });

    return NextResponse.json({ success: true, products, categories });
  } catch (error) {
    console.error("Admin products fetch error: ", error);
    return NextResponse.json({ error: "Internal server error fetching products list." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      categoryId,
      weight,
      metalType,
      metalPurity,
      diamondCarat,
      diamondClarity,
      diamondColor,
      certifiedBy,
      makingChargesType,
      makingChargesValue,
      isFeatured,
      isNewArrival,
      isBestSeller,
      isBridal,
      isFestival,
      stock,
      imageUrl,
    } = body;

    if (!name || !categoryId || weight === undefined || !metalType || !metalPurity || !imageUrl) {
      return NextResponse.json({ error: "Missing required product creation parameters." }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Check slug uniqueness
    const exists = await db.product.findUnique({ where: { slug } });
    const finalSlug = exists ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const product = await db.product.create({
      data: {
        name,
        slug: finalSlug,
        description: description || "Exquisite hand-selected jewelry ornament.",
        categoryId,
        weight: parseFloat(weight),
        metalType,
        metalPurity,
        diamondCarat: parseFloat(diamondCarat || "0.0"),
        diamondClarity: diamondClarity || null,
        diamondColor: diamondColor || null,
        certifiedBy: certifiedBy || "BIS Hallmark Certified",
        makingChargesType: makingChargesType || "PERCENTAGE",
        makingChargesValue: parseFloat(makingChargesValue || "10.0"),
        isFeatured: !!isFeatured,
        isNewArrival: !!isNewArrival,
        isBestSeller: !!isBestSeller,
        isBridal: !!isBridal,
        isFestival: !!isFestival,
        stock: parseInt(stock || "5"),
        images: {
          create: [
            {
              url: imageUrl,
              altText: name,
              orderIndex: 0,
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Admin create product error: ", error);
    return NextResponse.json({ error: "Internal server error creating product. Please verify database." }, { status: 500 });
  }
}
