import { PrismaClient, UserRole } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // ── Password hashes ───────────────────────────────────────────────────────
    const sellerPasswordHash = await bcrypt.hash('Password123!', 10);
    const buyerPasswordHash = await bcrypt.hash('Password123!', 10);

    // Clear existing data in dependency order
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.sellerProfile.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // ── Categories ────────────────────────────────────────────────────────────
    const [pottery, textiles, jewelry, woodwork] = await Promise.all([
        prisma.category.create({ data: { name: 'Pottery', slug: 'pottery' } }),
        prisma.category.create({ data: { name: 'Textiles', slug: 'textiles' } }),
        prisma.category.create({ data: { name: 'Jewelry', slug: 'jewelry' } }),
        prisma.category.create({ data: { name: 'Woodwork', slug: 'woodwork' } }),
    ]);

    // ── Seller users (with embedded SellerProfile) ────────────────────────────
    const [emmaCeramics, oakAndVine, silverAndStone, threadAndLoom] = await Promise.all([
        prisma.user.create({
            data: {
                name: 'Emma Ceramics',
                email: 'emma@handcraftedhaven.dev',
                passwordHash: sellerPasswordHash,
                role: UserRole.SELLER,
                sellerProfile: {
                    create: {
                        bio: 'Handcrafted ceramics with a modern touch.',
                        location: 'Portland, Oregon',
                        avatarUrl: 'https://picsum.photos/seed/emma/200/200',
                        joinedDate: new Date('2018-01-01'),
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: 'Oak & Vine',
                email: 'oak@handcraftedhaven.dev',
                passwordHash: sellerPasswordHash,
                role: UserRole.SELLER,
                sellerProfile: {
                    create: {
                        bio: 'Fine woodworking and custom furniture.',
                        location: 'Austin, Texas',
                        avatarUrl: 'https://picsum.photos/seed/oak/200/200',
                        joinedDate: new Date('2017-01-01'),
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: 'Silver & Stone',
                email: 'silver@handcraftedhaven.dev',
                passwordHash: sellerPasswordHash,
                role: UserRole.SELLER,
                sellerProfile: {
                    create: {
                        bio: 'Unique jewelry pieces crafted from silver and natural stones.',
                        location: 'Seattle, Washington',
                        avatarUrl: 'https://picsum.photos/seed/silver/200/200',
                        joinedDate: new Date('2019-01-01'),
                    },
                },
            },
        }),
        prisma.user.create({
            data: {
                name: 'Thread & Loom',
                email: 'thread@handcraftedhaven.dev',
                passwordHash: sellerPasswordHash,
                role: UserRole.SELLER,
                sellerProfile: {
                    create: {
                        bio: 'Handwoven textiles and home decor.',
                        location: 'Denver, Colorado',
                        avatarUrl: 'https://picsum.photos/seed/thread/200/200',
                        joinedDate: new Date('2020-01-01'),
                    },
                },
            },
        }),
    ]);

    // ── Buyer user ────────────────────────────────────────────────────────────
    const buyer = await prisma.user.create({
        data: {
            name: 'Buyer Demo',
            email: 'buyer@handcraftedhaven.dev',
            passwordHash: buyerPasswordHash,
            role: UserRole.BUYER,
        },
    });

    // ── Products ──────────────────────────────────────────────────────────────
    const [
        ceramicBowl,
        wovenWallHanging,
        copperEarrings,
        woodenBoard,
        mugSet,
        macrameHanger,
        silverPendant,
        paintedVase,
        linenRunner,
        oakBowl,
        beadedBracelet,
        wickerBasket,
    ] = await Promise.all([
        // Pottery — Emma Ceramics
        prisma.product.create({
            data: {
                name: 'Handcrafted Ceramic Bowl',
                description: 'A beautiful handcrafted ceramic bowl with a soft cream glaze. Perfect for serving salads or as a decorative piece.',
                imageUrl: 'https://picsum.photos/seed/bowl1/400/320',
                price: 48,
                sellerId: emmaCeramics.id,
                categoryId: pottery.id,
            },
        }),
        // Textiles — Thread & Loom
        prisma.product.create({
            data: {
                name: 'Woven Wall Hanging',
                description: 'A stunning hand-woven wall hanging made from natural cotton and wool, featuring earthy tones and intricate patterns.',
                imageUrl: 'https://picsum.photos/seed/textile2/400/320',
                price: 85,
                sellerId: threadAndLoom.id,
                categoryId: textiles.id,
            },
        }),
        // Jewelry — Silver & Stone
        prisma.product.create({
            data: {
                name: 'Copper Wire Earrings',
                description: 'Delicate hand-formed copper wire earrings with a hammered texture. Lightweight and hypoallergenic, ideal for everyday wear.',
                imageUrl: 'https://picsum.photos/seed/jewel3/400/320',
                price: 32,
                sellerId: silverAndStone.id,
                categoryId: jewelry.id,
            },
        }),
        // Woodwork — Oak & Vine
        prisma.product.create({
            data: {
                name: 'Wooden Serving Board',
                description: 'A rustic serving board hand-cut from reclaimed walnut wood. Finished with food-safe oil for a warm, natural look.',
                imageUrl: 'https://picsum.photos/seed/wood4/400/320',
                price: 65,
                sellerId: oakAndVine.id,
                categoryId: woodwork.id,
            },
        }),
        // Pottery — Emma Ceramics
        prisma.product.create({
            data: {
                name: 'Artisan Coffee Mug Set',
                description: 'A set of two wheel-thrown stoneware mugs with a rich chocolate glaze. Each piece is unique with subtle variations from the kiln.',
                imageUrl: 'https://picsum.photos/seed/mug5/400/320',
                price: 72,
                sellerId: emmaCeramics.id,
                categoryId: pottery.id,
            },
        }),
        // Textiles — Thread & Loom
        prisma.product.create({
            data: {
                name: 'Macramé Plant Hanger',
                description: 'Hand-knotted macramé plant hanger using 100% natural cotton rope. Fits pots up to 8 inches in diameter.',
                imageUrl: 'https://picsum.photos/seed/plant6/400/320',
                price: 45,
                sellerId: threadAndLoom.id,
                categoryId: textiles.id,
            },
        }),
        // Jewelry — Silver & Stone
        prisma.product.create({
            data: {
                name: 'Silver Leaf Pendant',
                description: "A sterling silver pendant shaped from a real pressed leaf. Each necklace captures nature's organic detail in lasting metal.",
                imageUrl: 'https://picsum.photos/seed/pendant7/400/320',
                price: 58,
                sellerId: silverAndStone.id,
                categoryId: jewelry.id,
            },
        }),
        // Pottery — Emma Ceramics
        prisma.product.create({
            data: {
                name: 'Hand-Painted Vase',
                description: 'A tall earthenware vase hand-painted with botanical motifs in muted sage and terracotta. Waterproof interior glaze included.',
                imageUrl: 'https://picsum.photos/seed/vase8/400/320',
                price: 95,
                sellerId: emmaCeramics.id,
                categoryId: pottery.id,
            },
        }),
        // Textiles — Thread & Loom
        prisma.product.create({
            data: {
                name: 'Linen Table Runner',
                description: 'A stonewashed linen table runner in natural oatmeal with hand-stitched fringe ends. Elegant for everyday dining or special occasions.',
                imageUrl: 'https://picsum.photos/seed/linen9/400/320',
                price: 38,
                sellerId: threadAndLoom.id,
                categoryId: textiles.id,
            },
        }),
        // Woodwork — Oak & Vine
        prisma.product.create({
            data: {
                name: 'Carved Oak Bowl',
                description: 'A large hand-carved oak bowl with a smooth interior and raw exterior edge. A statement piece for any home.',
                imageUrl: 'https://picsum.photos/seed/oak10/400/320',
                price: 120,
                sellerId: oakAndVine.id,
                categoryId: woodwork.id,
            },
        }),
        // Jewelry — Silver & Stone
        prisma.product.create({
            data: {
                name: 'Beaded Bracelet Set',
                description: 'A set of three stretch bracelets made with semi-precious stones including amethyst, rose quartz, and aventurine.',
                imageUrl: 'https://picsum.photos/seed/bead11/400/320',
                price: 28,
                sellerId: silverAndStone.id,
                categoryId: jewelry.id,
            },
        }),
        // Woodwork — Oak & Vine
        prisma.product.create({
            data: {
                name: 'Wicker Storage Basket',
                description: 'A hand-woven wicker basket with sturdy handles, perfect for blankets, toys, or pantry storage. Natural and sustainably sourced.',
                imageUrl: 'https://picsum.photos/seed/wicker12/400/320',
                price: 55,
                sellerId: oakAndVine.id,
                categoryId: woodwork.id,
            },
        }),
    ]);

    // ── Reviews ───────────────────────────────────────────────────────────────
    await Promise.all([
        prisma.review.create({
            data: {
                rating: 5,
                title: 'Absolutely love it!',
                body: 'This bowl is even more beautiful in person. The glaze is gorgeous and it is very well made.',
                userId: buyer.id,
                productId: ceramicBowl.id,
            },
        }),
        prisma.review.create({
            data: {
                rating: 5,
                title: 'Perfect wall art',
                body: 'The colors are exactly as pictured. Very high quality and ships quickly. Will order again!',
                userId: buyer.id,
                productId: wovenWallHanging.id,
            },
        }),
        prisma.review.create({
            data: {
                rating: 4,
                title: 'Great earrings',
                body: 'Really delicate and lightweight. Got lots of compliments wearing them. Shipping was fast.',
                userId: buyer.id,
                productId: copperEarrings.id,
            },
        }),
        prisma.review.create({
            data: {
                rating: 5,
                title: 'Stunning serving board',
                body: 'The wood grain is beautiful. Very sturdy and the food-safe finish is excellent.',
                userId: buyer.id,
                productId: woodenBoard.id,
            },
        }),
        prisma.review.create({
            data: {
                rating: 5,
                title: 'Best mugs I own',
                body: 'These mugs are the perfect size and the glaze is so rich. Love starting my day with them.',
                userId: buyer.id,
                productId: mugSet.id,
            },
        }),
    ]);

    console.log('✅ Seeding complete!');
    console.log('   • 4 categories');
    console.log('   • 5 users (4 sellers + 1 buyer)');
    console.log('   • 12 products');
    console.log('   • 5 reviews');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());