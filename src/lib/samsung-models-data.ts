// Comprehensive Samsung Galaxy models database
export const allSamsungModels = [
  // Galaxy S24 Series
  {
    model: "Galaxy S24 Ultra",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s24-ultra.jpg",
    maxPrice: 800,
    storage: ["256GB", "512GB", "1TB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy S24+",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s24-plus.jpg",
    maxPrice: 650,
    storage: ["256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy S24",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s24.jpg",
    maxPrice: 550,
    storage: ["128GB", "256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  // Galaxy S23 Series
  {
    model: "Galaxy S23 Ultra",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s23-ultra.jpg",
    maxPrice: 600,
    storage: ["256GB", "512GB", "1TB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy S23+",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s23-plus.jpg",
    maxPrice: 450,
    storage: ["256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy S23",
    series: "galaxy-s",
    image: "/images/buyback/samsung/galaxy-s23.jpg",
    maxPrice: 380,
    storage: ["128GB", "256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  // Galaxy Z Fold Series
  {
    model: "Galaxy Z Fold 6",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-fold-6.jpg",
    maxPrice: 900,
    storage: ["256GB", "512GB", "1TB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy Z Fold 5",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-fold-5.jpg",
    maxPrice: 750,
    storage: ["256GB", "512GB", "1TB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy Z Fold 4",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-fold-4.jpg",
    maxPrice: 550,
    storage: ["256GB", "512GB", "1TB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  // Galaxy Z Flip Series
  {
    model: "Galaxy Z Flip 6",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-flip-6.jpg",
    maxPrice: 600,
    storage: ["256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy Z Flip 5",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-flip-5.jpg",
    maxPrice: 480,
    storage: ["256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy Z Flip 4",
    series: "galaxy-z",
    image: "/images/buyback/samsung/galaxy-z-flip-4.jpg",
    maxPrice: 350,
    storage: ["128GB", "256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  // Galaxy Note Series
  {
    model: "Galaxy Note 20 Ultra",
    series: "galaxy-note",
    image: "/images/buyback/samsung/galaxy-note-20-ultra.jpg",
    maxPrice: 450,
    storage: ["128GB", "256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon", "Sprint"],
  },
  {
    model: "Galaxy Note 20",
    series: "galaxy-note",
    image: "/images/buyback/samsung/galaxy-note-20.jpg",
    maxPrice: 350,
    storage: ["128GB", "256GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon", "Sprint"],
  },
  {
    model: "Galaxy Note 10+",
    series: "galaxy-note",
    image: "/images/buyback/samsung/galaxy-note-10-plus.jpg",
    maxPrice: 280,
    storage: ["256GB", "512GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon", "Sprint"],
  },
  {
    model: "Galaxy Note 10",
    series: "galaxy-note",
    image: "/images/buyback/samsung/galaxy-note-10.jpg",
    maxPrice: 220,
    storage: ["256GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon", "Sprint"],
  },
  // Galaxy A Series (Popular Models)
  {
    model: "Galaxy A54 5G",
    series: "galaxy-a",
    image: "/images/buyback/samsung/galaxy-a54-5g.jpg",
    maxPrice: 250,
    storage: ["128GB", "256GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy A53 5G",
    series: "galaxy-a",
    image: "/images/buyback/samsung/galaxy-a53-5g.jpg",
    maxPrice: 180,
    storage: ["128GB", "256GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy A34 5G",
    series: "galaxy-a",
    image: "/images/buyback/samsung/galaxy-a34-5g.jpg",
    maxPrice: 180,
    storage: ["128GB", "256GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon"],
  },
  {
    model: "Galaxy A14 5G",
    series: "galaxy-a",
    image: "/images/buyback/samsung/galaxy-a14-5g.jpg",
    maxPrice: 90,
    storage: ["64GB", "128GB"],
    carriers: ["Unlocked", "AT&T", "T-Mobile", "Verizon", "Cricket", "Metro"],
  },
  // Add more models as needed
];

export function getSamsungModelBySlug(slug: string, series: string): typeof allSamsungModels[0] | undefined {
  const modelName = slug
    .split('-')
    .map((word) => {
      // Handle special cases for Samsung models
      if (word === 'galaxy') return 'Galaxy';
      if (word === 'ultra') return 'Ultra';
      if (word === 'plus') return '+';
      if (word === 'lite') return 'Lite';
      if (word === 'fe') return 'FE';
      if (word === '5g') return '5G';
      // Handle model numbers
      if (/^\d+$/.test(word)) return word;
      // Capitalize first letter for other words
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return allSamsungModels.find(m =>
    m.model === modelName && m.series === series
  );
}