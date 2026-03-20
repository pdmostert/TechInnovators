export type Category = 'All' | 'Pottery' | 'Textiles' | 'Jewelry' | 'Woodwork';

export type PriceRangeOption = {
    label: string;
    min: number;
    max: number | null; // null = no upper bound
};

export type Product = {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    category: Exclude<Category, 'All'>;
    image: string;
};

export const categories: Category[] = [
    'All',
    'Pottery',
    'Textiles',
    'Jewelry',
    'Woodwork',
];

export const priceRanges: PriceRangeOption[] = [
    { label: 'All Prices', min: 0, max: null },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $75', min: 50, max: 75 },
    { label: '$75 - $100', min: 75, max: 100 },
    { label: 'Over $100', min: 100, max: null },
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Handcrafted Ceramic Bowl',
        price: 48,
        rating: 4.8,
        reviewCount: 24,
        category: 'Pottery',
        image: 'https://picsum.photos/seed/bowl1/400/320',
    },
    {
        id: '2',
        name: 'Woven Wall Hanging',
        price: 85,
        rating: 5.0,
        reviewCount: 18,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/textile2/400/320',
    },
    {
        id: '3',
        name: 'Copper Wire Earrings',
        price: 32,
        rating: 4.6,
        reviewCount: 42,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/jewel3/400/320',
    },
    {
        id: '4',
        name: 'Wooden Serving Board',
        price: 65,
        rating: 4.9,
        reviewCount: 31,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/wood4/400/320',
    },
    {
        id: '5',
        name: 'Artisan Coffee Mug Set',
        price: 72,
        rating: 4.7,
        reviewCount: 29,
        category: 'Pottery',
        image: 'https://picsum.photos/seed/mug5/400/320',
    },
    {
        id: '6',
        name: 'Macramé Plant Hanger',
        price: 45,
        rating: 4.8,
        reviewCount: 36,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/plant6/400/320',
    },
    {
        id: '7',
        name: 'Silver Leaf Pendant',
        price: 58,
        rating: 4.5,
        reviewCount: 15,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/pendant7/400/320',
    },
    {
        id: '8',
        name: 'Hand-Painted Vase',
        price: 95,
        rating: 4.9,
        reviewCount: 22,
        category: 'Pottery',
        image: 'https://picsum.photos/seed/vase8/400/320',
    },
    {
        id: '9',
        name: 'Linen Table Runner',
        price: 38,
        rating: 4.3,
        reviewCount: 19,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/linen9/400/320',
    },
    {
        id: '10',
        name: 'Carved Oak Bowl',
        price: 120,
        rating: 4.7,
        reviewCount: 11,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/oak10/400/320',
    },
    {
        id: '11',
        name: 'Beaded Bracelet Set',
        price: 28,
        rating: 4.4,
        reviewCount: 33,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/bead11/400/320',
    },
    {
        id: '12',
        name: 'Wicker Storage Basket',
        price: 55,
        rating: 4.6,
        reviewCount: 27,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/wicker12/400/320',
    },
];

export type Seller = {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    reviewCount: number;
    joinedDate: string;
};

export const mockSeller: Seller = {
    id: 's1',
    name: 'Jane Doe',
    avatar: 'https://picsum.photos/seed/jane/200/200',
    bio: "Hello, I'm Jane! I've been crafting unique handmade pieces for over 10 years. My passion is working with natural materials to bring a touch of nature into your home. Every item is thoughtfully designed and created with love in my small studio.",
    rating: 4.9,
    reviewCount: 128,
    joinedDate: '2019',
};
