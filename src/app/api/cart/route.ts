import { NextRequest, NextResponse } from 'next/server';

// In-memory cart store (replace with Shopify Storefront API in production)
const carts: Record<string, Array<{ slug: string; title: string; qty: number }>> = {};

export async function POST(req: NextRequest) {
  try {
    const { slug, title, qty } = await req.json();
    const cartId = 'default'; // In production, derive from session/cookie

    if (!carts[cartId]) carts[cartId] = [];

    const existing = carts[cartId].find((item) => item.slug === slug);
    if (existing) {
      existing.qty += qty || 1;
    } else {
      carts[cartId].push({ slug, title, qty: qty || 1 });
    }

    return NextResponse.json({
      success: true,
      cart: carts[cartId],
      message: 'Item added to cart. Shopify checkout integration coming soon.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to add item' },
      { status: 400 }
    );
  }
}

export async function GET() {
  const cartId = 'default';
  return NextResponse.json({
    cart: carts[cartId] || [],
    message: 'Shopify Storefront API integration scaffold. Connect your store to enable real checkout.',
  });
}
