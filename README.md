# Historical Translation Project™

**Bridging Nine Centuries of Medical Scholarship**

A Next.js 14 site for the Historical Translation Project™ — a research institute dedicated to the rigorous translation, authentication, and modern scientific contextualization of classical Islamic-Jewish medical and pharmacognostic texts.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS design system
- **Typography:** Cormorant Garamond (display) · Jost (body) · IBM Plex Mono (code)
- **Deployment:** Vercel (auto-detected)

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, scholars, featured formulations, methodology |
| `/about` | Mission, team, advisory board, milestones |
| `/formulations` | Full formulation catalog with category badges |
| `/formulations/[slug]` | Individual formulation dossier (ingredients, historical source, clinical notes) |
| `/advisor` | **Botanical Wellness Advisor** — interactive educational tool |
| `/research` | Four-stage methodology + primary corpus detail |
| `/contact` | Enquiry form with institutional categories |
| `/disclaimer` | Full DSHEA/FDA compliance disclaimer |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## New: Botanical Wellness Advisor (`/advisor`)

Interactive multi-step educational tool with **DSHEA-compliant legal architecture**:

1. **Disclaimer Gate** — mandatory acceptance before proceeding
2. **User Type** — individual vs. healthcare practitioner
3. **Wellness Interests** — 8 domains using structure/function language only
4. **Medication Screening** — class-level interaction flagging (educational, not clinical)
5. **Surgery Screening** — 7–10 day discontinuation notice
6. **Results** — matched formulations with interaction alerts and dossier links

### Compliance Features
- All language uses FDA structure/function terminology
- No disease claims anywhere in the advisor flow
- Persistent disclaimer banners on results page
- Interaction flags are educational, always defer to HCP
- Surgery discontinuation warning when applicable

## API Routes (Scaffolded)

| Route | Phase | Description |
|---|---|---|
| `/api/chat` | Phase 2 | Claude API conversational layer with DSHEA system prompt + output filter |
| `/api/cart` | Phase 3 | Shopify Storefront API headless cart integration |

### Enabling Phase 2 (Claude Chat)
1. Set `ANTHROPIC_API_KEY` in Vercel environment variables
2. Complete adversarial compliance testing
3. Uncomment the API call in `src/app/api/chat/route.ts`
4. Legal review of system prompt

### Enabling Phase 3 (Shopify Cart)
1. Set `SHOPIFY_STOREFRONT_TOKEN` and `SHOPIFY_STORE_DOMAIN`
2. Map formulation slugs → Shopify variant GIDs
3. Uncomment the cart logic in `src/app/api/cart/route.ts`

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to GitHub → Vercel auto-deploys from `main` branch.

## Legal

All formulations are presented for educational and historical research purposes only. Not a drug, medical device, or regulated therapeutic agent. These statements have not been evaluated by the FDA.

---

© Historical Translation Project™. All rights reserved.
