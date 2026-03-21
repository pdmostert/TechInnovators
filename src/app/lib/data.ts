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
    description: string;
    sellerId: string;
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
        description: 'A beautiful handcrafted ceramic bowl with a soft cream glaze. Perfect for serving salads or as a decorative piece.',
        sellerId: 'seller-1',
    },
    {
        id: '2',
        name: 'Woven Wall Hanging',
        price: 85,
        rating: 5.0,
        reviewCount: 18,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/textile2/400/320',
        description: 'A stunning hand-woven wall hanging made from natural cotton and wool, featuring earthy tones and intricate patterns.',
        sellerId: 'seller-4',
    },
    {
        id: '3',
        name: 'Copper Wire Earrings',
        price: 32,
        rating: 4.6,
        reviewCount: 42,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/jewel3/400/320',
        description: 'Delicate hand-formed copper wire earrings with a hammered texture. Lightweight and hypoallergenic, ideal for everyday wear.',
        sellerId: 'seller-3',
    },
    {
        id: '4',
        name: 'Wooden Serving Board',
        price: 65,
        rating: 4.9,
        reviewCount: 31,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/wood4/400/320',
        description: 'A rustic serving board hand-cut from reclaimed walnut wood. Finished with food-safe oil for a warm, natural look.',
        sellerId: 'seller-2',
    },
    {
        id: '5',
        name: 'Artisan Coffee Mug Set',
        price: 72,
        rating: 4.7,
        reviewCount: 29,
        category: 'Pottery',
        image: 'https://picsum.photos/seed/mug5/400/320',
        description: 'A set of two wheel-thrown stoneware mugs with a rich chocolate glaze. Each piece is unique with subtle variations from the kiln.',
        sellerId: 'seller-1',
    },
    {
        id: '6',
        name: 'Macramé Plant Hanger',
        price: 45,
        rating: 4.8,
        reviewCount: 36,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/plant6/400/320',
        description: 'Hand-knotted macramé plant hanger using 100% natural cotton rope. Fits pots up to 8 inches in diameter.',
        sellerId: 'seller-4',
    },
    {
        id: '7',
        name: 'Silver Leaf Pendant',
        price: 58,
        rating: 4.5,
        reviewCount: 15,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/pendant7/400/320',
        description: 'A sterling silver pendant shaped from a real pressed leaf. Each necklace captures nature\'s organic detail in lasting metal.',
        sellerId: 'seller-3',
    },
    {
        id: '8',
        name: 'Hand-Painted Vase',
        price: 95,
        rating: 4.9,
        reviewCount: 22,
        category: 'Pottery',
        image: 'https://picsum.photos/seed/vase8/400/320',
        description: 'A tall earthenware vase hand-painted with botanical motifs in muted sage and terracotta. Waterproof interior glaze included.',
        sellerId: 'seller-1',
    },
    {
        id: '9',
        name: 'Linen Table Runner',
        price: 38,
        rating: 4.3,
        reviewCount: 19,
        category: 'Textiles',
        image: 'https://picsum.photos/seed/linen9/400/320',
        description: 'A stonewashed linen table runner in natural oatmeal with hand-stitched fringe ends. Elegant for everyday dining or special occasions.',
        sellerId: 'seller-4',
    },
    {
        id: '10',
        name: 'Carved Oak Bowl',
        price: 120,
        rating: 4.7,
        reviewCount: 11,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/oak10/400/320',
        description: 'A large hand-carved oak bowl with a smooth interior and raw exterior edge. A statement piece for any home.',
        sellerId: 'seller-2',
    },
    {
        id: '11',
        name: 'Beaded Bracelet Set',
        price: 28,
        rating: 4.4,
        reviewCount: 33,
        category: 'Jewelry',
        image: 'https://picsum.photos/seed/bead11/400/320',
        description: 'A set of three stretch bracelets made with semi-precious stones including amethyst, rose quartz, and aventurine.',
        sellerId: 'seller-3',
        },
    {
        id: '12',
        name: 'Wicker Storage Basket',
        price: 55,
        rating: 4.6,
        reviewCount: 27,
        category: 'Woodwork',
        image: 'https://picsum.photos/seed/wicker12/400/320',
        description: 'A hand-woven wicker basket with sturdy handles, perfect for blankets, toys, or pantry storage. Natural and sustainably sourced.',
        sellerId: 'seller-2',
    },
];

export const sellers: Seller[] = [
    { id: 'seller-1', name: 'Emma Ceramics', avatar: 'https://picsum.photos/seed/emma/200/200', location: 'Portland, Oregon', bio: 'Handcrafted ceramics with a modern touch.', rating: 4.8, reviewCount: 34, joinedDate: '2018' },
    { id: 'seller-2', name: 'Oak & Vine', avatar: 'https://picsum.photos/seed/oak/200/200', location: 'Austin, Texas', bio: 'Fine woodworking and custom furniture.', rating: 4.7, reviewCount: 28, joinedDate: '2017' },
    { id: 'seller-3', name: 'Silver & Stone', avatar: 'https://picsum.photos/seed/silver/200/200', location: 'Seattle, Washington', bio: 'Unique jewelry pieces crafted from silver and natural stones.', rating: 4.9, reviewCount: 42, joinedDate: '2019' },
    { id: 'seller-4', name: 'Thread & Loom', avatar: 'https://picsum.photos/seed/thread/200/200', location: 'Denver, Colorado', bio: 'Handwoven textiles and home decor.', rating: 4.6, reviewCount: 30, joinedDate: '2020' },
];

export type Seller = {
    id: string;
    name: string;
    avatar: string;
    location: string;
    bio: string;
    rating: number;
    reviewCount: number;
    joinedDate: string;
};

export const mockSeller: Seller = {
    id: 's1',
    name: 'Jane Doe',
    avatar: 'https://picsum.photos/seed/jane/200/200',
    location: 'San Francisco, CA',
    bio: "Hello, I'm Jane! I've been crafting unique handmade pieces for over 10 years. My passion is working with natural materials to bring a touch of nature into your home. Every item is thoughtfully designed and created with love in my small studio.",
    rating: 4.9,
    reviewCount: 128,
    joinedDate: '2019',
};

// ── Helper functions ──────────────────────────────────────────────────────────

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getSellerById(id: string): Seller | undefined {
    return sellers.find((s) => s.id === id);
}
