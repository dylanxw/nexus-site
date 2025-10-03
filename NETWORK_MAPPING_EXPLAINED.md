# Network Carrier Mapping Explanation

## How It Works

### User Experience (Frontend)
Users see and can select from 6 carrier options:
- **Unlocked** - Works with any carrier
- **Verizon** - Locked to Verizon
- **AT&T** - Locked to AT&T
- **T-Mobile** - Locked to T-Mobile
- **US Cellular** - Locked to US Cellular
- **Other Carrier** - Locked to another carrier

### Backend Pricing Logic
The pricing API (`/api/buyback/pricing/route.ts`) maps these selections:
- **"Unlocked"** → looks up "Unlocked" pricing in database
- **All other options** → look up "Carrier Locked" pricing in database

```typescript
// In pricing API
const networkForLookup = network === "Unlocked" ? "Unlocked" : "Carrier Locked";
```

### Database Structure
Atlas pricing only provides two categories:
- **Unlocked** devices (higher price)
- **Carrier Locked** devices (lower price)

### What Gets Stored
When a quote is created:
- **User's actual selection** is stored (e.g., "Verizon")
- This preserves what the user selected for display purposes
- Admin can see which specific carriers are most common

## Example Flow

1. **User selects**: iPhone 15 Pro Max, 256GB, **Verizon**, Flawless
2. **Pricing lookup**: Searches for "iPhone 15 Pro Max 256GB **Carrier Locked**"
3. **Price returned**: $450 (Carrier Locked price from Atlas)
4. **Quote saved with**: network = "Verizon" (preserves user selection)
5. **Confirmation shows**: "Network: Verizon"

## Benefits of This Approach

✅ **Better UX**: Users can specify their exact carrier
✅ **Accurate Pricing**: Uses Atlas's two-tier pricing structure
✅ **Data Insights**: Track which carriers are most common
✅ **Future Flexibility**: If Atlas adds carrier-specific pricing, minimal changes needed

## Files Involved

- `src/lib/pricing-calculator.ts` - Defines the 6 carrier options
- `src/app/api/buyback/pricing/route.ts` - Maps carriers to Atlas pricing
- `src/app/buyback/iphone/[model]/page.tsx` - User selects carrier
- `src/app/buyback/components/overview-template.tsx` - Displays selected carrier
- `src/app/api/buyback/quote/route.ts` - Saves user's carrier selection