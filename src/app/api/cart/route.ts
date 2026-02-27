import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/cart — Shopify Storefront API Cart Integration
 *
 * Supported actions:
 *   { action: "create_checkout", items: [{ variantId, quantity }] }
 *
 * To enable:
 * 1. Create Shopify store and generate Storefront API access token
 * 2. Set SHOPIFY_STOREFRONT_TOKEN and SHOPIFY_STORE_DOMAIN in Vercel env
 * 3. Create products matching HTP formulation catalog
 * 4. Add shopifyVariantId to each formulation in formulations.ts
 * 5. Set availableForPurchase: true and price for each product
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    return null;
  }

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, items } = body;

    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
      return NextResponse.json({
        message:
          'The store is being configured. Pricing and checkout will be available soon. ' +
          'In the meantime, you can explore formulation dossiers and contact us for institutional orders.',
        status: 'store_not_configured',
      }, { status: 503 });
    }

    if (action === 'create_checkout') {
      if (!items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: 'Items array required' }, { status: 400 });
      }

      const lineItems = items.map((item: { variantId: string; quantity: number }) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));

      const data = await shopifyFetch(
        `mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        priceV2 { amount currencyCode }
                      }
                    }
                  }
                }
              }
              cost {
                totalAmount { amount currencyCode }
                subtotalAmount { amount currencyCode }
              }
            }
            userErrors { field message }
          }
        }`,
        { input: { lines: lineItems } }
      );

      if (!data) {
        return NextResponse.json({ error: 'Shopify connection failed' }, { status: 502 });
      }

      const cart = data.data?.cartCreate?.cart;
      const errors = data.data?.cartCreate?.userErrors;

      if (errors && errors.length > 0) {
        return NextResponse.json({ error: errors[0].message }, { status: 400 });
      }

      return NextResponse.json({
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
        totalAmount: cart.cost?.totalAmount?.amount,
        currency: cart.cost?.totalAmount?.currencyCode,
        itemCount: cart.lines?.edges?.length || 0,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Cart route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong with the cart. Please try again.' },
      { status: 500 }
    );
  }
}
