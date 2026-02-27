"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Formulation } from "@/data/formulations";

/* ═══════════════════════════════════════════════════════════════
   CART TYPES
   ═══════════════════════════════════════════════════════════════ */

export interface CartItem {
  slug: string;
  name: string;
  tradeName: string;
  price: number | null;
  quantity: number;
  shopifyVariantId?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addItem: (formulation: Formulation) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
  /** Whether the Shopify checkout is available */
  checkoutEnabled: boolean;
  /** Redirect to Shopify checkout */
  checkout: () => Promise<void>;
}

/* ═══════════════════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════════════════ */

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((f: Formulation) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === f.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === f.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          slug: f.slug,
          name: f.name,
          tradeName: f.tradeName,
          price: f.price,
          quantity: 1,
          shopifyVariantId: f.shopifyVariantId,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.slug !== slug));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Checkout is enabled when ALL items have Shopify variant IDs and prices
  const checkoutEnabled =
    items.length > 0 &&
    items.every((i) => i.shopifyVariantId && i.price !== null);

  const checkout = useCallback(async () => {
    if (!checkoutEnabled) return;

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_checkout",
          items: items.map((i) => ({
            variantId: i.shopifyVariantId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }, [items, checkoutEnabled]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        checkoutEnabled,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
