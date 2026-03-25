import { prisma } from './prisma';

export async function getProducts(filters?: { q?: string; category?: string; minPrice?: number; maxPrice?: number }) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      ...(filters?.q && { name: { contains: filters.q, mode: 'insensitive' } }),
      ...(filters?.category && { category: { name: filters.category } }),
      ...(filters?.minPrice !== undefined && { price: { gte: filters.minPrice } }),
      ...(filters?.maxPrice !== undefined && { price: { lte: filters.maxPrice } }),
    },
    include: { category: true, seller: { include: { sellerProfile: true } } },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, seller: { include: { sellerProfile: true } }, reviews: true },
  });
}