import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  weight: number;
  metalType: string;
  metalPurity: string;
  makingChargesType: string;
  makingChargesValue: number;
  price: number; // live dynamic price calculated when added
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  metalType: string;
  metalPurity: string;
  price: number;
}

export interface Coupon {
  code: string;
  discountType: "PERCENTAGE" | "FLAT";
  value: number;
  minOrderAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface APJewelStore {
  // Cart
  cart: CartItem[];
  addItemToCart: (item: Omit<CartItem, "quantity">) => void;
  removeItemFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  coupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;

  // Gold & Diamond Rates (seeded dynamically, defaults below)
  goldRates: Record<string, number>;
  diamondRates: Record<string, number>;
  setGoldRates: (rates: Record<string, number>) => void;
  setDiamondRates: (rates: Record<string, number>) => void;

  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<APJewelStore>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addItemToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find((i) => i.id === item.id);
        if (exists) {
          set({
            cart: cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...cart, { ...item, quantity: 1 }] });
        }
      },
      removeItemFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),
      updateCartQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }),
      clearCart: () => set({ cart: [], coupon: null }),
      coupon: null,
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      // Wishlist
      wishlist: [],
      toggleWishlist: (item) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((i) => i.id === item.id);
        if (exists) {
          set({ wishlist: wishlist.filter((i) => i.id !== item.id) });
        } else {
          set({ wishlist: [...wishlist, item] });
        }
      },
      isInWishlist: (id) => get().wishlist.some((i) => i.id === id),

      // Metal Rates (Default rates per gram/carat in INR)
      goldRates: {
        "24K": 7450, // Rs. 7,450 per gram
        "22K": 6830, // Rs. 6,830 per gram
        "18K": 5590, // Rs. 5,590 per gram
      },
      diamondRates: {
        "VVS-EF": 95000, // Rs. 95,000 per carat
        "VS-GH": 80000,  // Rs. 80,000 per carat
        "SI-IJ": 65000,  // Rs. 65,000 per carat
      },
      setGoldRates: (rates) => set({ goldRates: { ...get().goldRates, ...rates } }),
      setDiamondRates: (rates) => set({ diamondRates: { ...get().diamondRates, ...rates } }),

      // Auth
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "ap-jewel-storage",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        coupon: state.coupon,
        user: state.user,
      }), // only persist shopping state and user session
    }
  )
);
