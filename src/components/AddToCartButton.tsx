"use client";

import { useCart } from "@/components/CartProvider";
import type { Formulation } from "@/data/formulations";

interface Props {
  formulation: Formulation;
  compact?: boolean;
  className?: string;
}

export default function AddToCartButton({ formulation: f, compact = false, className = "" }: Props) {
  const { addItem, isInCart, removeItem } = useCart();
  const inCart = isInCart(f.slug);

  // Not available for purchase yet
  if (!f.availableForPurchase) {
    return (
      <button
        disabled
        className={`btn btn-outline ${className}`}
        style={{
          opacity: 0.5,
          cursor: "not-allowed",
          fontSize: compact ? "0.7rem" : "0.8rem",
          width: compact ? "100%" : undefined,
          justifyContent: "center",
        }}
      >
        {f.price === null ? "Pricing Coming Soon" : "Coming Soon"}
      </button>
    );
  }

  // Available — in cart already
  if (inCart) {
    return (
      <button
        onClick={() => removeItem(f.slug)}
        className={`btn ${className}`}
        style={{
          background: "var(--color-emerald)",
          color: "white",
          borderColor: "var(--color-emerald)",
          fontSize: compact ? "0.7rem" : "0.8rem",
          width: compact ? "100%" : undefined,
          justifyContent: "center",
        }}
      >
        ✓ In Cart — Remove
      </button>
    );
  }

  // Available — add to cart
  const priceLabel = f.price !== null
    ? `$${(f.price / 100).toFixed(2)}`
    : "";

  return (
    <button
      onClick={() => addItem(f)}
      className={`btn btn-gold ${className}`}
      style={{
        fontSize: compact ? "0.7rem" : "0.8rem",
        width: compact ? "100%" : undefined,
        justifyContent: "center",
      }}
    >
      Add to Cart{priceLabel ? ` — ${priceLabel}` : ""}
    </button>
  );
}
