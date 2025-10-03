export const siteConfig = {
  name: "Nexus Tech Solutions",
  description: "Fast, reliable electronics repair in Denton, TX. Phones, tablets, computers & consoles with lifetime warranty and same-day service.",
  url: "https://nexustechsolutions.io",
  phone: "940-600-1012",
  phoneFormatted: "(940) 600-1012",
  phoneHref: "tel:940-600-1012",
  email: "info@nexustechsolutions.io",
  inquiriesEmail: "inquiries@nexustechsolutions.io",
  address: {
    street: "3305 S Mayhill Rd, STE 109",
    city: "Denton",
    state: "TX",
    zip: "76208",
    full: "3305 S Mayhill Rd, STE 109, Denton, TX 76208"
  },
  hours: {
    monday: "10:00 AM - 7:00 PM",
    tuesday: "10:00 AM - 7:00 PM",
    wednesday: "10:00 AM - 7:00 PM",
    thursday: "10:00 AM - 7:00 PM",
    friday: "10:00 AM - 7:00 PM",
    saturday: "1:00 PM - 6:00 PM",
    sunday: "Closed",
    weekdayShort: "Mon-Fri: 10am-7pm",
    saturdayShort: "Sat: 1pm-6pm",
    display: "Mon-Fri: 10am-7pm, Sat: 1pm-6pm"
  },
  social: {
    facebook: "",
    instagram: "",
    google: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_LINK || ""
  },
  maps: {
    embedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || ""
  },
  analytics: {
    googleId: process.env.NEXT_PUBLIC_GA_ID || ""
  },
  services: [
    {
      id: "iphone-repair",
      name: "iPhone Repair",
      description: "Screen replacement, battery, charging port, camera and more",
      icon: "smartphone"
    },
    {
      id: "mac-pc-repair",
      name: "Mac & PC Repair",
      description: "Hardware diagnostics, virus removal, upgrades and repairs",
      icon: "laptop"
    },
    {
      id: "tablet-repair",
      name: "iPad/Tablet Repair",
      description: "Screen replacement, charging issues, software problems",
      icon: "tablet"
    },
    {
      id: "data-recovery",
      name: "Data Recovery",
      description: "Professional data recovery for all storage devices",
      icon: "harddrive"
    },
    {
      id: "console-repair",
      name: "Game Console Repair",
      description: "PlayStation, Xbox, Nintendo Switch repairs and mods",
      icon: "gamepad2"
    },
    {
      id: "other-repair",
      name: "Other Repair",
      description: "Drones, smartwatches, and various consumer tech products",
      icon: "wrench"
    }
  ],
  trustSignals: {
    rating: "4.9",
    reviewCount: "150+",
    devicesServiced: "5,000+",
    warranty: "Lifetime",
    turnaround: "Same-Day"
  }
} as const;

// TypeScript type helper for better IDE support
export type SiteConfig = typeof siteConfig;