# Nexus Tech Solutions Website

Professional electronics repair website for Nexus Tech Solutions in Denton, TX. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Conversion-Focused Design**: Prominent call-to-action buttons and phone number display
- **Mobile-First**: Responsive design with floating call button for mobile users
- **SEO Optimized**: Next.js App Router with comprehensive meta tags and JSON-LD structured data
- **Lead Generation**: Quote and scheduling forms with API integration
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Vercel Analytics
- **Notifications**: Sonner (toast notifications)

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and configure:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
# Google Maps Embed URL for store location
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=..."

# Google Analytics ID (or Google Tag Manager ID)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Link to Google Reviews page
NEXT_PUBLIC_GOOGLE_REVIEW_LINK="https://g.page/r/..."

# Email configuration (for lead notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
NOTIFICATION_EMAIL="notifications@nexustechsolutions.com"
```

### 3. Update Business Information

Edit `src/config/site.ts` to update:
- Business address
- Phone number (currently set to 940-600-1012)
- Hours of operation
- Service offerings

### 4. Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 5. Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Key Pages

- **Home (`/`)**: Hero section, services overview, trust signals, contact forms
- **Services (`/services`)**: Detailed repair service information
- **Store (`/store`)**: Refurbished device listings (placeholder for future ecommerce)
- **Gallery (`/gallery`)**: Before/after repair photos (placeholder)

## 🎯 Conversion Features

- **Floating Call Button**: Always visible on mobile devices
- **Multiple CTAs**: Call Now buttons in header, hero, and throughout site
- **Lead Forms**: Schedule repair and get quote modals
- **Trust Signals**: Lifetime warranty, same-day service, local business badges
- **Social Proof**: Google reviews integration and rating display

## 🔧 Development Guidelines

See `CLAUDE.md` for detailed development guidelines including:
- Conversion-first design principles
- Component naming conventions
- Accessibility standards (WCAG AA)
- SEO best practices
- Code style guidelines

## 📧 Lead Handling

The `/api/lead` endpoint currently logs form submissions. To enable email notifications:

1. Choose an email service (SendGrid, Resend, AWS SES)
2. Update the API route in `src/app/api/lead/route.ts`
3. Configure SMTP settings in `.env.local`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 📞 Business Contact

- **Phone**: 940-600-1012
- **Location**: Denton, TX
- **Services**: Phone repair, computer repair, tablet repair, game console repair, data recovery

## 🤝 Contributing

1. Follow the guidelines in `CLAUDE.md`
2. Test all changes thoroughly
3. Ensure mobile responsiveness
4. Maintain conversion-focused design

## 📝 Next Steps

- [ ] Add actual before/after photos to gallery
- [ ] Integrate Google Reviews API for dynamic review display
- [ ] Set up email service for lead notifications
- [ ] Add online store functionality for refurbished devices
- [ ] Implement inventory management system
- [ ] Add blog/content marketing section
- [ ] Set up customer testimonials system
- [ ] Add appointment booking system integration
