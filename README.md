# BAR Estimate Compliance Writer

A production-leaning starter for a California-focused automotive estimate drafting product.

This project is designed for dealerships and repair shops that need to produce:
- customer-friendly repair estimates
- BAR-aware disclosures
- separated towing and tear-down charges
- cleaner documentation before full DMS integration exists

## Why this exists

California repair shops and dealership service departments operate under tighter documentation requirements than most generic estimate builders support out of the box. This repo is an initial portfolio-quality vertical SaaS foundation focused on that gap.

It demonstrates:
- a modern web UI built with Next.js and TypeScript
- typed compliance logic separated from presentation code
- a structure that can grow into a real multi-tenant SaaS product
- maintainable code with comments and predictable organization for future contributors

## Features in this version

- Interactive estimate builder UI
- Customer-friendly repair language panel
- California BAR-oriented compliance checklist
- Disclosure generation for:
  - third-party payors
  - tear-down/disassembly workflows
  - towing charges
- Estimate totals for labor, parts, tax, and disclosed extras
- Production-minded project structure

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4

## Local development

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    estimate-builder.tsx
  lib/
    compliance.ts
```

## Notes for future engineers

### 1. Compliance logic is intentionally isolated
`src/lib/compliance.ts` contains business logic for:
- line-item totals
- aggregate totals
- checklist generation
- disclosure generation

That separation matters because compliance logic will change more often than the page shell.

### 2. This is a strong starter, not the finished SaaS
To make this production-ready for paying dealerships, the next major steps are:

- add authentication and authorization
- persist estimates in a real database
- add immutable audit logging
- add PDF generation and customer approval workflows
- connect to DMS providers like Tekion, CDK, and Reynolds
- add account-level dealership settings and branding
- create a document export / print workflow
- add tests for California-specific estimate scenarios

### 3. Suggested next backend architecture
A realistic next version would use:
- PostgreSQL
- Prisma or Drizzle ORM
- NextAuth / Clerk / Auth0
- object storage for exported PDFs
- event logging for estimate revisions and approvals

## Production roadmap

### Phase 1
- Persist estimate drafts
- Add dealership settings
- Add approval status workflow
- Add printable estimate output

### Phase 2
- Customer signature / approval link
- Estimate revision history
- Role-based access
- API endpoints for dealership systems

### Phase 3
- DMS sync
- VIN decoding
- labor guide integration
- shop-level analytics and audit reports

## Important disclaimer

This repository is a workflow and product prototype, not legal advice. Teams shipping it commercially should review the final implementation with qualified California automotive compliance counsel and validate current BAR guidance before rollout.

## License

MIT
