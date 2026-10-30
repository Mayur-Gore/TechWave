export const seedOrders = [

  {
    id: 'ORD-1092',
    buyerId: 'u1',
    items: [
      {
        productId: 'prod-5',
        name: '16L Dual-Motor Battery Knapsack Sprayer',
        price: 2450,
        quantity: 1,
        unit: 'piece',
      },
    ],
    total: 2450,
    status: 'Packed', // Placed, Packed, Shipped, Delivered
    deliveryAddress: 'Gat No. 142, Near Nira Left Canal, Baramati, Pune - 413102',
    paymentMethod: 'Google Pay UPI (Demo)',
    createdAt: '2026-10-12T16:00:00.000Z',
    updatedAt: '2026-10-13T09:30:00.000Z',
  },
  {
    id: 'ORD-1088',
    buyerId: 'u1',
    items: [
      {
        productId: 'prod-2',
        name: 'Organic Enriched Vermicompost (Cow Dung Base)',
        price: 450,
        quantity: 3,
        unit: '50 kg bag',
      },
      {
        productId: 'prod-8',
        name: 'Trichoderma Viride Bio-Fungicide Powder',
        price: 240,
        quantity: 2,
        unit: '1 kg packet',
      },
    ],
    total: 1830,
    status: 'Delivered',
    deliveryAddress: 'Gat No. 142, Near Nira Left Canal, Baramati, Pune - 413102',
    paymentMethod: 'Bank of Maharashtra Agri KCC (Demo)',
    createdAt: '2026-10-08T11:20:00.000Z',
    updatedAt: '2026-10-10T14:40:00.000Z',
  },
];
