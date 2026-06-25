export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryName: string;
  weight: number;
  metalType: "GOLD" | "DIAMOND";
  metalPurity: string;
  diamondCarat: number;
  diamondClarity: string | null;
  diamondColor: string | null;
  certifiedBy: string;
  makingChargesType: "PERCENTAGE" | "PER_GRAM";
  makingChargesValue: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isBridal: boolean;
  isFestival: boolean;
  stock: number;
  imageUrl: string;
}

export const mockProducts: ProductData[] = [
  {
    id: "prod-1",
    name: "Royal Vasant Gold Choker",
    slug: "royal-vasant-gold-choker",
    description: "An intricate, handcrafted 22K gold choker, perfect for bridal wear. Features classical filigree detailing with floral motifs carved by Munger's master karigars.",
    categoryName: "Necklaces",
    weight: 38.5,
    metalType: "GOLD",
    metalPurity: "22K",
    diamondCarat: 0,
    diamondClarity: null,
    diamondColor: null,
    certifiedBy: "BIS Hallmark Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 12,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isBridal: true,
    isFestival: true,
    stock: 2,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "prod-2",
    name: "Aura Solitaire Diamond Ring",
    slug: "aura-solitaire-diamond-ring",
    description: "An elegant 18K white gold band hosting a brilliant round-cut 1.2 carat solitaire diamond. Designed to capture light from every angle with certified clarity.",
    categoryName: "Rings",
    weight: 4.8,
    metalType: "DIAMOND",
    metalPurity: "18K",
    diamondCarat: 1.2,
    diamondClarity: "VVS",
    diamondColor: "EF",
    certifiedBy: "IGI Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 10,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isBridal: false,
    isFestival: false,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "prod-3",
    name: "Devi Antique Gold Bangles",
    slug: "devi-antique-gold-bangles",
    description: "A pair of traditional heavy kada bangles made from 22K gold, decorated with antique polish, ruby inserts, and micro-filigree borders. Suitable for festivals.",
    categoryName: "Bangles",
    weight: 42.0,
    metalType: "GOLD",
    metalPurity: "22K",
    diamondCarat: 0,
    diamondClarity: null,
    diamondColor: null,
    certifiedBy: "BIS Hallmark Certified",
    makingChargesType: "PER_GRAM",
    makingChargesValue: 450,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isBridal: true,
    isFestival: true,
    stock: 3,
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "prod-4",
    name: "Celestial Diamond Drops",
    slug: "celestial-diamond-drops",
    description: "Delicate and modern diamond drop earrings in 18K yellow gold settings. Features pave-set diamonds holding two pear-cut grade VVS drop diamonds.",
    categoryName: "Earrings",
    weight: 6.5,
    metalType: "DIAMOND",
    metalPurity: "18K",
    diamondCarat: 0.8,
    diamondClarity: "VS",
    diamondColor: "GH",
    certifiedBy: "IGI Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 12,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isBridal: false,
    isFestival: true,
    stock: 4,
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "prod-5",
    name: "Classic Gold Mangalsutra",
    slug: "classic-gold-mangalsutra",
    description: "A sophisticated everyday 22K gold mangalsutra featuring traditional black beads interspersed with solid gold links, and an elegant modern central pendant.",
    categoryName: "Necklaces",
    weight: 14.2,
    metalType: "GOLD",
    metalPurity: "22K",
    diamondCarat: 0,
    diamondClarity: null,
    diamondColor: null,
    certifiedBy: "BIS Hallmark Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 8,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isBridal: true,
    isFestival: false,
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "prod-6",
    name: "Luxury Diamond Tennis Bracelet",
    slug: "luxury-diamond-tennis-bracelet",
    description: "A classic tennis bracelet crafted in 18K white gold, featuring a continuous row of brilliant-cut diamonds totaling 3.5 carats. Epitome of luxury styling.",
    categoryName: "Bracelets",
    weight: 12.0,
    metalType: "DIAMOND",
    metalPurity: "18K",
    diamondCarat: 3.5,
    diamondClarity: "VVS",
    diamondColor: "EF",
    certifiedBy: "GIA Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 15,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isBridal: false,
    isFestival: false,
    stock: 1,
    imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop",
  }
];
