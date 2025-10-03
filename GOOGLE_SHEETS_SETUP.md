# Google Sheets Integration Setup

This document explains how to set up Google Sheets integration for the Nexus Tech Solutions website.

## Overview

The website integrates with Google Sheets for:
1. **Repair Requests** - Customer repair requests and appointment bookings
2. **Inventory Management** - Device inventory tracking with pricing and status

## Prerequisites

1. Google account with access to Google Cloud Console
2. Google Sheets spreadsheets created for data storage

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details:
   - Name: `nexus-website-sheets`
   - Description: `Service account for website Google Sheets integration`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

## Step 3: Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Download the key file (keep it secure!)

## Step 4: Create Google Sheets

### Repair Requests Spreadsheet

1. Create new Google Sheet named "Nexus Repair Requests"
2. Set up columns in row 1 (headers):
   ```
   A: Timestamp
   B: Type (QUOTE/APPOINTMENT)
   C: Device Type
   D: Make
   E: Model
   F: Issues
   G: First Name
   H: Last Name
   I: Phone
   J: Email
   K: Description
   L: Appointment Date
   M: Appointment Time
   N: Status
   O: Notes
   P: Quote Amount
   Q: Technician
   ```

3. Share the sheet with your service account email:
   - Click "Share" button
   - Add the service account email (found in the JSON key file)
   - Give "Editor" permissions

### Inventory Spreadsheet

1. Create new Google Sheet named "Nexus Inventory"
2. Set up columns in row 1 (headers):
   ```
   A: Intake Date
   B: Supplier
   C: Model
   D: Color
   E: Carrier
   F: IMEI
   G: Battery Health
   H: Condition
   I: Cost
   J: Price
   K: B2B Price
   L: Facebook Price
   M: Swappa Price
   N: SKU
   O: eBay Price
   P: Shopify Price
   Q: Notes
   R: Storage
   ```

3. Share with service account (same process as above)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in the values:

```env
# From the service account JSON file
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"

# From the Google Sheets URLs
GOOGLE_SHEETS_REPAIR_REQUESTS_ID=your_repair_requests_spreadsheet_id
GOOGLE_SHEETS_INVENTORY_ID=your_inventory_spreadsheet_id
```

### Getting Spreadsheet IDs

The spreadsheet ID is found in the URL:
```
https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
```

### Formatting Private Key

The private key from the JSON file needs to be formatted as a single line with `\\n` for newlines:
```json
"private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC..."
```

## Step 6: Test Integration

1. Start the development server: `npm run dev`
2. Navigate to the repair form
3. Submit a test request
4. Check if data appears in your Google Sheets

## API Endpoints

### POST /api/repair-request
Submits a repair request to Google Sheets.

**Request Body:**
```json
{
  "deviceType": "Smartphone",
  "make": "Apple",
  "model": "iPhone 15 Pro",
  "issues": ["screen-damage", "battery-drains-fast"],
  "firstName": "John",
  "lastName": "Doe",
  "phone": "123-456-7890",
  "email": "john@example.com",
  "description": "Screen is cracked and battery dies quickly",
  "requestType": "appointment",
  "appointmentDate": "2024-03-15",
  "appointmentTime": "10:00 AM"
}
```

### GET /api/inventory
Fetches inventory items from Google Sheets.

**Query Parameters:**
- `inStock=true` - Filter for in-stock items only
- `model=iPhone` - Filter by device model

### POST /api/inventory
Adds new inventory item to Google Sheets.

**Request Body:**
```json
{
  "model": "iPhone 15 Pro",
  "color": "Natural Titanium",
  "condition": "Excellent",
  "cost": 800,
  "price": 950,
  "storage": "128GB",
  "notes": "Minor scratches on back"
}
```

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**
   - Check that the service account email has editor access to the sheets
   - Verify the spreadsheet IDs are correct

2. **Invalid Private Key**
   - Ensure the private key is properly formatted with `\\n` for newlines
   - Check that the entire key is included including headers and footers

3. **Spreadsheet Not Found**
   - Verify the spreadsheet ID in the environment variables
   - Make sure the spreadsheet exists and is accessible

4. **API Not Enabled**
   - Ensure Google Sheets API is enabled in Google Cloud Console
   - Check that the service account has proper permissions

### Testing Environment Variables

Create a simple test script to verify your setup:

```javascript
// test-sheets.js
const { google } = require('googleapis');

async function testConnection() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_REPAIR_REQUESTS_ID,
    });
    console.log('✅ Connection successful:', response.data.properties.title);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
```

Run with: `node test-sheets.js`

## Security Notes

- Never commit the `.env.local` file to version control
- Keep the service account JSON key file secure
- Use environment variables for all sensitive data
- Consider using Google Secret Manager for production deployments
- Regularly rotate service account keys