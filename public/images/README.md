# Images Directory Structure

This folder contains all images for the Nexus Tech Solutions website.

## Folder Organization

### `/hero/`
- **storefront.jpg** - Your main storefront photo for the hero section
- **banner.jpg** - Any additional hero banners
- **background.jpg** - Hero background images

### `/gallery/`
- **before-after/** - Before and after repair photos
- **repairs/** - Detailed repair process photos
- **devices/** - Photos of repaired devices

### `/services/`
- **iphone-repair.jpg** - iPhone repair service images
- **computer-repair.jpg** - Computer repair images
- **tablet-repair.jpg** - Tablet repair images
- **console-repair.jpg** - Game console repair images
- **data-recovery.jpg** - Data recovery service images

### `/store/`
- **products/** - Refurbished device photos
- **interior/** - Store interior photos

### `/about/`
- **team.jpg** - Team photos
- **certifications/** - Certification images
- **awards/** - Any awards or recognition

## Image Guidelines

- **Format**: Use .jpg for photos, .png for graphics with transparency
- **Size**: Optimize images (recommended max 1920px width for hero images)
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `storefront-exterior.jpg`)
- **Alt Text**: Remember to add descriptive alt text in your components

## Usage Examples

```jsx
// Hero storefront image
<img src="/images/hero/storefront.jpg" alt="Nexus Tech Solutions storefront in Denton, TX" />

// Service images
<img src="/images/services/iphone-repair.jpg" alt="iPhone screen repair service" />

// Gallery before/after
<img src="/images/gallery/before-after/iphone-screen-repair.jpg" alt="iPhone screen repair before and after" />
```

## Next Steps

1. Add your storefront photo to `/hero/storefront.jpg`
2. Upload service-related images to respective folders
3. Update components to use these images
4. Ensure all images are optimized for web use