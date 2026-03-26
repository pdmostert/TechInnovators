export type Category = 'All' | 'Pottery' | 'Textiles' | 'Jewelry' | 'Woodwork';

export type PriceRangeOption = {
    label: string;
    min: number;
    max: number | null; // null = no upper bound
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
