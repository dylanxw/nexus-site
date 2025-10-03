# Nexus Tech Solutions - Setup Guide

This guide explains how to set up the backend integrations for the Nexus Tech Solutions website.

## Overview

The website has two main backend integrations:
1. **Email Notifications** - Repair requests are sent directly to your email
2. **Google Sheets Inventory** - Device inventory management

## Part 1: Email Setup (for Repair Requests)

### Option A: Hostinger Email Setup (Your Hosting Provider)

1. **Create Email Account** in your Hostinger control panel
   - Go to Hostinger hPanel > Email > Email Accounts
   - Create email accounts like `info@yourdomain.com` and `noreply@yourdomain.com`
   - Note down the passwords

2. **Configure Environment Variables**:
   ```env
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@yourdomain.com
   SMTP_PASS=your-email-password
   SMTP_FROM=noreply@yourdomain.com
   BUSINESS_EMAIL=info@yourdomain.com
   ```

   **Alternative Configuration** (if SSL causes issues):
   ```env
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

### Option B: Alternative Email Providers

**Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
# Requires app password with 2FA enabled
```

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Other Providers:**
Contact your email provider for SMTP settings.

## Part 2: Google Sheets Setup (for Inventory)

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "nexus-website"
3. Enable Google Sheets API:
   - APIs & Services > Library
   - Search "Google Sheets API" > Enable

### Step 2: Create Service Account

1. APIs & Services > Credentials
2. Create Credentials > Service Account
3. Name: `nexus-inventory-access`
4. Download JSON key file (keep secure!)

### Step 3: Create Inventory Spreadsheet

1. Create new Google Sheet: "Nexus Inventory"
2. Set up column headers in row 1:
   ```
   A: Intake Date    B: Supplier      C: Model         D: Color
   E: Carrier        F: IMEI          G: Battery Health H: Condition
   I: Cost           J: Price         K: B2B Price     L: Facebook Price
   M: Swappa Price   N: SKU           O: eBay Price    P: Shopify Price
   Q: Notes          R: Storage       S: Status
   ```

3. **Share with Service Account**:
   - Click "Share" button
   - Add service account email (from JSON file)
   - Give "Editor" permissions

### Step 4: Configure Environment Variables

Copy the spreadsheet ID from the URL:
```
https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
```

Add to your `.env.local`:
```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_HERE\\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_INVENTORY_ID=your_spreadsheet_id_here
```

**Important**: Format the private key as a single line with `\\n` for newlines.

## Complete Environment Variables

Your final `.env.local` should look like:

```env
# Email Configuration (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
BUSINESS_EMAIL=info@yourdomain.com

# Google Sheets (Inventory Only)
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_HERE\\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_INVENTORY_ID=your_spreadsheet_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Testing Your Setup

### Test Email Integration

1. Start development server: `npm run dev`
2. Go to repair form: `http://localhost:3000/denton-tx/repair-form`
3. Submit a test request
4. Check your business email for the notification
5. Check the customer email for confirmation

### Test Inventory Integration

1. Make API request to add inventory:
   ```bash
   curl -X POST http://localhost:3000/api/inventory \\
     -H "Content-Type: application/json" \\
     -d '{
       "model": "iPhone 15 Pro",
       "condition": "Excellent",
       "cost": 800,
       "price": 950
     }'
   ```

2. Check your Google Sheet for the new entry

## API Endpoints

### POST /api/repair-request
**Purpose**: Sends repair request emails to business and customer

**What happens**:
- Business receives detailed repair request email
- Customer receives confirmation email
- Both emails are professionally formatted

### GET /api/inventory
**Purpose**: Retrieves inventory from Google Sheets
- Query: `?inStock=true` for available items only
- Query: `?model=iPhone` to filter by model

### POST /api/inventory
**Purpose**: Adds new inventory item to Google Sheets

## Email Templates

### Business Notification Email:
- Device and customer information
- Detailed problem description
- Contact information with clickable links
- Appointment preferences (if applicable)

### Customer Confirmation Email:
- Thank you message
- Next steps explanation
- Business contact information
- Professional branding

## Troubleshooting

### Email Issues:

**Hostinger-Specific:**
- **Connection timeout**: Try port 587 with `SMTP_SECURE=false` instead of 465
- **Authentication failed**: Verify email account exists in Hostinger hPanel
- **SSL/TLS errors**: Add TLS configuration to nodemailer (see troubleshooting code below)
- **Domain not ready**: Ensure your domain's MX records are properly configured

**General Issues:**
- **Emails not sending**: Check spam folder, verify BUSINESS_EMAIL is correct
- **Rate limiting**: Hostinger may have sending limits, space out test emails

**TLS Configuration for Connection Issues:**
If you encounter SSL/TLS errors with Hostinger, you may need to modify the transporter:

```javascript
const transporter = nodemailer.createTransporter({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  }
});
```

**Alternative Port Configuration:**
If port 465 doesn't work, try:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Inventory Issues:
- **403 Error**: Service account needs editor access to sheet
- **Sheet not found**: Verify spreadsheet ID is correct
- **API Error**: Ensure Google Sheets API is enabled

### Development Issues:
- **Environment variables not loading**: Restart development server
- **API routes not working**: Check file paths in `/src/app/api/`

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not regular email passwords
- Keep service account JSON file secure
- Consider using environment variable management for production

## Support

If you need help with setup:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Test each integration separately (email vs inventory)