import { BASE_TIMESTAMP } from './seedUsers';

export const CATEGORIES = [
  'All',
  'Seeds',
  'Fertilizers',
  'Pesticides',
  'Equipment',
  'Tools',
];

export const seedProducts = [
  {
    id: 'prod-1',
    name: 'Certified Bt Cotton Seeds (Hybrid 7007)',
    category: 'Seeds',
    price: 865,
    unit: 'packet (450g)',
    stock: 45,
    rating: 4.8,
    reviewsCount: 38,
    description: 'High-yield Bollgard II certified hybrid seeds suitable for irrigated black soil. Excellent boll retention and tolerance against sucking pests.',
    ownerId: 'u1',
    sellerName: 'Ramesh Patil (Own Farm Produce)',
    sellerLocation: 'Baramati, Pune',
    sellerPhone: '9823012345',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r1', author: 'Suresh Deshmukh', rating: 5, comment: '95% germination rate achieved in Baramati soil.' },
      { id: 'r2', author: 'Kavita Jadhav', rating: 4, comment: 'Strong boll development and uniform branching.' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Organic Enriched Vermicompost (Cow Dung Base)',
    category: 'Fertilizers',
    price: 450,
    unit: '50 kg bag',
    stock: 28,
    rating: 4.9,
    reviewsCount: 52,
    description: '100% pure organic vermicompost made with native Desi cow dung and earthworms. Boosts soil microbial activity, moisture retention and root growth.',
    ownerId: 'u1',
    sellerName: 'Ramesh Patil (Organic Unit)',
    sellerLocation: 'Baramati, Pune',
    sellerPhone: '9823012345',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r3', author: 'Anand Shinde', rating: 5, comment: 'Rich texture, no weeds or plastic traces. Best for sugarcane.' }
    ]
  },
  {
    id: 'prod-3',
    name: 'JS-335 Certified Soybean Seed',
    category: 'Seeds',
    price: 3600,
    unit: '30 kg bag',
    stock: 20,
    rating: 4.7,
    reviewsCount: 29,
    description: 'Certified breeder-standard JS-335 soybean seeds with high oil content and 95-day maturity period. Resistant to pod shattering.',
    ownerId: 'u2',
    sellerName: 'Suresh Deshmukh Agro Traders',
    sellerLocation: 'Pimpalgaon, Nashik',
    sellerPhone: '9822154321',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r4', author: 'Ganesh More', rating: 5, comment: 'Very clean grade seeds, uniform germination.' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Nashik Fursungi Red Onion Seeds',
    category: 'Seeds',
    price: 1850,
    unit: '1 kg tin',
    stock: 35,
    rating: 4.9,
    reviewsCount: 64,
    description: 'Renowned Nashik Fursungi winter onion seed variety. Globe shaped, deep red color, excellent storage life of 5-6 months without rotting.',
    ownerId: 'u2',
    sellerName: 'Suresh Deshmukh Agro Traders',
    sellerLocation: 'Pimpalgaon, Nashik',
    sellerPhone: '9822154321',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r5', author: 'Ramesh Patil', rating: 5, comment: 'Sowed last rabi season, gave 180 quintals per acre yield.' }
    ]
  },
  {
    id: 'prod-5',
    name: '16L Dual-Motor Battery Knapsack Sprayer',
    category: 'Equipment',
    price: 2450,
    unit: 'piece',
    stock: 14,
    rating: 4.6,
    reviewsCount: 41,
    description: 'High-pressure 12V 12Ah lithium-ion battery sprayer with adjustable brass nozzles, telescopic lance and pressure regulator switch.',
    ownerId: 'u3',
    sellerName: 'Kolhapur Agri Machinery Hub',
    sellerLocation: 'Shirol, Kolhapur',
    sellerPhone: '9850123987',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r6', author: 'Kavita Jadhav', rating: 4, comment: 'Long battery run time, sprays 25 tanks on a single charge.' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Cold-Pressed Pure Neem Oil 10,000 PPM',
    category: 'Pesticides',
    price: 680,
    unit: '1 Litre bottle',
    stock: 50,
    rating: 4.8,
    reviewsCount: 77,
    description: 'Certified bio-pesticide with high Azadirachtin content (10,000 PPM). Repels whiteflies, aphids, bollworms and leaf miners without harming bees.',
    ownerId: 'u4',
    sellerName: 'Paithan Bio-Inputs Co-op',
    sellerLocation: 'Paithan, Aurangabad',
    sellerPhone: '9423546789',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r7', author: 'Ramesh Patil', rating: 5, comment: 'Regular spray prevented whitefly attack on cotton.' }
    ]
  },
  {
    id: 'prod-7',
    name: 'Bio-NPK Liquid Microbial Consortium',
    category: 'Fertilizers',
    price: 520,
    unit: '1 Litre bottle',
    stock: 40,
    rating: 4.7,
    reviewsCount: 33,
    description: 'Combined nitrogen-fixing, phosphorus-solubilizing and potash-mobilizing bacterial culture for soil drenching or drip irrigation.',
    ownerId: 'u4',
    sellerName: 'Paithan Bio-Inputs Co-op',
    sellerLocation: 'Paithan, Aurangabad',
    sellerPhone: '9423546789',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r8', author: 'Suresh Deshmukh', rating: 5, comment: 'Significantly lowered urea requirement in onion fields.' }
    ]
  },
  {
    id: 'prod-8',
    name: 'Trichoderma Viride Bio-Fungicide Powder',
    category: 'Pesticides',
    price: 240,
    unit: '1 kg packet',
    stock: 60,
    rating: 4.9,
    reviewsCount: 45,
    description: 'Antagonistic fungal culture effective against root rot, collar rot, damping off and wilt in cotton, soybean and vegetables.',
    ownerId: 'u1',
    sellerName: 'Ramesh Patil (Own Stock)',
    sellerLocation: 'Baramati, Pune',
    sellerPhone: '9823012345',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r9', author: 'Anand Shinde', rating: 5, comment: 'Treated sugarcane setts, zero fungal issues.' }
    ]
  },
  {
    id: 'prod-9',
    name: 'Ergonomic Heavy-Duty Hand Rotary Weeder',
    category: 'Tools',
    price: 790,
    unit: 'piece',
    stock: 22,
    rating: 4.5,
    reviewsCount: 19,
    description: 'Durable carbon-steel blade with serrated teeth for fast inter-row weeding. Reduces manual labor cost by 70%.',
    ownerId: 'u5',
    sellerName: 'Vidarbha Farmer Implements',
    sellerLocation: 'Katol, Nagpur',
    sellerPhone: '9765432109',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r10', author: 'Kavita Jadhav', rating: 4, comment: 'Very sturdy blade, works well in moist soil.' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Drip Lateral Pipe 16mm (Class-2 ISI Mark)',
    category: 'Equipment',
    price: 1850,
    unit: '400 meter bundle',
    stock: 18,
    rating: 4.8,
    reviewsCount: 31,
    description: 'UV stabilized high-density polyethylene 16mm drip tube with inline drippers at 40cm spacing. Clog resistant and rated for 10 years.',
    ownerId: 'u3',
    sellerName: 'Kolhapur Agri Machinery Hub',
    sellerLocation: 'Shirol, Kolhapur',
    sellerPhone: '9850123987',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r11', author: 'Ramesh Patil', rating: 5, comment: 'Uniform discharge across 100 meter lengths.' }
    ]
  },
  {
    id: 'prod-11',
    name: 'Abhiraj Hybrid Tomato Seeds (High Disease Resistance)',
    category: 'Seeds',
    price: 920,
    unit: '10g packet (approx 3500 seeds)',
    stock: 55,
    rating: 4.7,
    reviewsCount: 36,
    description: 'Determinate red fruit tomato seeds with strong resistance against Tomato Leaf Curl Virus (ToLCV) and bacterial wilt.',
    ownerId: 'u1',
    sellerName: 'Ramesh Patil (Own Stock)',
    sellerLocation: 'Baramati, Pune',
    sellerPhone: '9823012345',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r12', author: 'Suresh Deshmukh', rating: 5, comment: 'Firm fruits with excellent transport tolerance.' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Water-Soluble 19-19-19 Foliar Fertilizer (Imported Grade)',
    category: 'Fertilizers',
    price: 1650,
    unit: '25 kg bag',
    stock: 25,
    rating: 4.8,
    reviewsCount: 48,
    description: '100% water-soluble balanced NPK fertilizer with micro-nutrients in chelated form. Ideal for drip fertigation and vegetative growth stages.',
    ownerId: 'u5',
    sellerName: 'Vidarbha Farmer Implements',
    sellerLocation: 'Katol, Nagpur',
    sellerPhone: '9765432109',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r13', author: 'Anand Shinde', rating: 5, comment: 'Dissolves instantly without clogging drippers.' }
    ]
  },
  {
    id: 'prod-13',
    name: 'Japanese Steel Bypass Pruning Secateurs',
    category: 'Tools',
    price: 490,
    unit: 'piece',
    stock: 30,
    rating: 4.6,
    reviewsCount: 22,
    description: 'Razor-sharp SK-5 high carbon steel blade for clean horticultural pruning in grapes, pomegranate, citrus, and vegetable shoots.',
    ownerId: 'u2',
    sellerName: 'Suresh Deshmukh Agro Traders',
    sellerLocation: 'Pimpalgaon, Nashik',
    sellerPhone: '9822154321',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r14', author: 'Ramesh Patil', rating: 4, comment: 'Comfortable grip and effortless cutting.' }
    ]
  },
  {
    id: 'prod-14',
    name: 'Beauveria Bassiana Bio-Insecticide',
    category: 'Pesticides',
    price: 280,
    unit: '1 kg packet',
    stock: 42,
    rating: 4.7,
    reviewsCount: 27,
    description: 'Beneficial entomopathogenic fungus that targets caterpillars, thrips, grubs and stem borers naturally without toxic chemical residues.',
    ownerId: 'u4',
    sellerName: 'Paithan Bio-Inputs Co-op',
    sellerLocation: 'Paithan, Aurangabad',
    sellerPhone: '9423546789',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r15', author: 'Ganesh More', rating: 5, comment: 'Highly effective against bollworms when humidity is high.' }
    ]
  },
  {
    id: 'prod-15',
    name: '7-HP Petrol Mini Power Tiller Rotary Cultivator',
    category: 'Equipment',
    price: 38500,
    unit: 'machine unit',
    stock: 4,
    rating: 4.9,
    reviewsCount: 15,
    description: 'Fuel-efficient 212cc 4-stroke engine power weeder for sugarcane interculture, cotton soil aerating and orchard ridge making. Subsidized in Maharashtra DBT.',
    ownerId: 'u3',
    sellerName: 'Kolhapur Agri Machinery Hub',
    sellerLocation: 'Shirol, Kolhapur',
    sellerPhone: '9850123987',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r16', author: 'Ramesh Patil', rating: 5, comment: 'Saves thousands in tractor rental for weeding.' }
    ]
  },
  {
    id: 'prod-16',
    name: 'Soil Testing pH & Moisture Tester (Field Probe)',
    category: 'Tools',
    price: 850,
    unit: 'meter unit',
    stock: 25,
    rating: 4.4,
    reviewsCount: 34,
    description: 'Dual-probe field instrument measuring soil pH (3.5 to 8.0) and root-zone moisture level without batteries. Helps calculate accurate lime and sulfur dosing.',
    ownerId: 'u1',
    sellerName: 'Ramesh Patil (Own Stock)',
    sellerLocation: 'Baramati, Pune',
    sellerPhone: '9823012345',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r17', author: 'Suresh Deshmukh', rating: 4, comment: 'Instant check before fertigation.' }
    ]
  },
  {
    id: 'prod-17',
    name: 'Co-86032 (Nira) Certified Sugarcane Seedlings',
    category: 'Seeds',
    price: 250,
    unit: 'tray of 100 saplings',
    stock: 65,
    rating: 4.9,
    reviewsCount: 44,
    description: 'Single-bud tissue cultured healthy Co-86032 sugarcane seedlings with high sugar recovery rate, drought resilience and vigorous tillering.',
    ownerId: 'u3',
    sellerName: 'Kolhapur Agri Machinery Hub',
    sellerLocation: 'Shirol, Kolhapur',
    sellerPhone: '9850123987',
    image: '',
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
    reviews: [
      { id: 'r18', author: 'Ramesh Patil', rating: 5, comment: '100% survival rate after field planting.' }
    ]
  }
];
