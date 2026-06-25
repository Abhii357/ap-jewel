export interface ProductPriceDetails {
  baseMetalPrice: number;
  makingCharges: number;
  diamondPrice: number;
  subtotal: number;
  gst: number;
  total: number;
}

/**
 * Calculates dynamic pricing for a jewelry piece.
 * Formula: Price = ((Weight * MetalRate) + MakingCharges + DiamondPrice) * 1.03 (GST)
 */
export function calculateProductPrice(
  product: {
    weight: number;
    metalType: string;
    metalPurity: string;
    makingChargesType: string;
    makingChargesValue: number;
    diamondCarat?: number;
    diamondClarity?: string | null;
    diamondColor?: string | null;
  },
  goldRates: Record<string, number>,
  diamondRates: Record<string, number>
): ProductPriceDetails {
  let baseMetalPrice = 0;
  let makingCharges = 0;
  let diamondPrice = 0;

  // 1. Metal Base Cost Calculation
  if (product.metalType === "GOLD") {
    const purity = product.metalPurity || "22K";
    const ratePerGram = goldRates[purity] || goldRates["22K"] || 6830;
    baseMetalPrice = product.weight * ratePerGram;
  } else if (product.metalType === "DIAMOND") {
    // Diamond jewelry still has a gold setting (e.g. 18K gold setting)
    const purity = product.metalPurity || "18K";
    const ratePerGram = goldRates[purity] || goldRates["18K"] || 5590;
    baseMetalPrice = product.weight * ratePerGram;
  } else {
    // Fallback or generic platinum/metal rate
    baseMetalPrice = product.weight * 6000;
  }

  // 2. Making Charges Calculation
  if (product.makingChargesType === "PERCENTAGE") {
    makingCharges = baseMetalPrice * (product.makingChargesValue / 100);
  } else {
    // PER_GRAM
    makingCharges = product.weight * product.makingChargesValue;
  }

  // 3. Diamond Cost Calculation (if applicable)
  if (product.metalType === "DIAMOND" && product.diamondCarat && product.diamondCarat > 0) {
    const clarityColor = `${product.diamondClarity || "VS"}-${product.diamondColor || "GH"}`;
    const ratePerCarat = diamondRates[clarityColor] || diamondRates["VS-GH"] || 80000;
    diamondPrice = product.diamondCarat * ratePerCarat;
  }

  // 4. Subtotal and GST Calculations (3% tax for precious jewelry in India)
  const subtotal = baseMetalPrice + makingCharges + diamondPrice;
  const gst = subtotal * 0.03;
  const total = subtotal + gst;

  return {
    baseMetalPrice: Math.round(baseMetalPrice),
    makingCharges: Math.round(makingCharges),
    diamondPrice: Math.round(diamondPrice),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(total),
  };
}
