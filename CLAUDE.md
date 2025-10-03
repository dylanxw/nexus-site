# Nexus Tech Solutions - Development Guidelines

## Project Goals

**Primary Goal**: High call conversions
- Prominent "Call Now" buttons everywhere (mobile floating button, header, hero)
- Phone number: 940-600-1012

**Secondary Goals**:
- Schedule repair appointments
- Get repair quotes
- Showcase services and expertise

## Conversion-First Mantra

Every design decision should prioritize conversions:
1. Call button visibility and prominence
2. Trust signals (warranty, reviews, local business)
3. Clear value propositions
4. Minimal friction for contact

## Component Naming Conventions

- Use kebab-case for file names: `site-header.tsx`, `hero-section.tsx`
- Use PascalCase for component names: `SiteHeader`, `HeroSection`
- Prefix with context when needed: `ScheduleModal`, `QuoteModal`

## Accessibility Standards

- WCAG AA compliance required
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators on all interactive elements
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)

## SEO Rules

- Title template: "%s | Nexus Tech Solutions (Denton, TX)"
- Include location in key pages (Denton, TX)
- Use next-seo for all meta tags
- Include JSON-LD structured data
- Canonical URLs on all pages
- Open Graph and Twitter meta tags

## Tone & Voice

- Professional but approachable
- Local and trustworthy
- Emphasize speed and reliability
- Use "we" and "our" to build connection
- Avoid technical jargon
- Focus on benefits over features

## Key Messaging

- Same-day service available
- Lifetime warranty on repairs
- Local, independent business
- Upfront pricing
- Expert technicians

## Development Standards

- Mobile-first responsive design
- Use Tailwind CSS for styling
- TypeScript for all code
- shadcn/ui for components
- Framer Motion for animations (subtle)
- Follow existing code patterns

## Environment Variables

Required for production:
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`: Google Maps embed for location
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (or GTM)
- `NEXT_PUBLIC_GOOGLE_REVIEW_LINK`: Link to Google Reviews page

## Testing Commands

```bash
npm run lint      # ESLint
npm run typecheck # TypeScript check
npm run build     # Production build
npm run dev       # Development server
```