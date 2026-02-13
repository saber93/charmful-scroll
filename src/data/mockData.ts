// ── Mock Data for Store Pages ──

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    images: string[];
    discount: number;
    category: string;
    vendor: string;
    sku: string;
    description: string;
    availability: "in-stock" | "out-of-stock" | "low-stock";
    tags: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

// ─── Categories ───

export const categories: Category[] = [
    { id: "women", name: "Women", slug: "women", count: 48, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80" },
    { id: "men", name: "Men", slug: "men", count: 36, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { id: "accessories", name: "Accessories", slug: "accessories", count: 24, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
    { id: "footwear", name: "Footwear", slug: "footwear", count: 18, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { id: "bags", name: "Bags", slug: "bags", count: 15, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
    { id: "jewelry", name: "Jewelry", slug: "jewelry", count: 12, image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?w=400&q=80" },
];

// ─── Products ───

export const products: Product[] = [
    {
        id: 1,
        name: "Elegant Floral Summer Dress",
        slug: "elegant-floral-summer-dress",
        price: 79,
        originalPrice: 129,
        rating: 4.8,
        reviews: 1240,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
            "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
        ],
        discount: 39,
        category: "women",
        vendor: "FashionHouse",
        sku: "FH-SD-001",
        description: "A beautifully crafted floral summer dress made from premium cotton blend fabric. Features a flattering A-line silhouette with delicate floral print throughout. Perfect for sunny days and outdoor events.",
        availability: "in-stock",
        tags: ["summer", "floral", "dress", "cotton"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "Rose Pink", hex: "#e8a0bf" },
            { name: "Sky Blue", hex: "#87ceeb" },
            { name: "Sage Green", hex: "#9caf88" },
        ],
    },
    {
        id: 2,
        name: "Classic Cotton T-Shirt",
        slug: "classic-cotton-tshirt",
        price: 35,
        originalPrice: 55,
        rating: 4.6,
        reviews: 856,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
            "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
        ],
        discount: 36,
        category: "men",
        vendor: "BasicWear",
        sku: "BW-CT-002",
        description: "Premium quality cotton t-shirt with a relaxed fit. Made from 100% organic cotton for ultimate comfort. Features a classic crew neck and short sleeves.",
        availability: "in-stock",
        tags: ["basic", "cotton", "t-shirt", "casual"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Navy", hex: "#1b3a5c" },
            { name: "Grey", hex: "#808080" },
        ],
    },
    {
        id: 3,
        name: "Premium Leather Jacket",
        slug: "premium-leather-jacket",
        price: 149,
        originalPrice: 199,
        rating: 4.9,
        reviews: 2103,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
            "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80",
        ],
        discount: 25,
        category: "men",
        vendor: "LeatherCraft",
        sku: "LC-LJ-003",
        description: "Handcrafted genuine leather jacket with a modern slim fit. Features premium YKK zippers, interior pockets, and a soft quilted lining. Built to last a lifetime.",
        availability: "low-stock",
        tags: ["leather", "jacket", "premium", "outerwear"],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Brown", hex: "#8b4513" },
        ],
    },
    {
        id: 4,
        name: "Designer Crossbody Bag",
        slug: "designer-crossbody-bag",
        price: 89,
        originalPrice: 150,
        rating: 4.7,
        reviews: 654,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
        ],
        discount: 41,
        category: "bags",
        vendor: "BagBoutique",
        sku: "BB-CB-004",
        description: "Chic designer crossbody bag crafted from vegan leather. Features adjustable strap, magnetic closure, and multiple interior compartments. Perfect for everyday use.",
        availability: "in-stock",
        tags: ["bag", "crossbody", "vegan-leather", "designer"],
        sizes: ["One Size"],
        colors: [
            { name: "Tan", hex: "#d2b48c" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Burgundy", hex: "#800020" },
        ],
    },
    {
        id: 5,
        name: "Casual Linen Shorts",
        slug: "casual-linen-shorts",
        price: 49,
        originalPrice: 79,
        rating: 4.5,
        reviews: 1876,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
        ],
        discount: 38,
        category: "men",
        vendor: "ComfortLine",
        sku: "CL-LS-005",
        description: "Lightweight linen shorts perfect for summer. Features an elastic waistband with drawstring, side pockets, and a relaxed fit for maximum comfort.",
        availability: "in-stock",
        tags: ["shorts", "linen", "summer", "casual"],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Beige", hex: "#f5f5dc" },
            { name: "Olive", hex: "#808000" },
            { name: "Navy", hex: "#1b3a5c" },
        ],
    },
    {
        id: 6,
        name: "Silk Blend Scarf",
        slug: "silk-blend-scarf",
        price: 28,
        originalPrice: 45,
        rating: 4.4,
        reviews: 432,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
            "https://images.unsplash.com/photo-1601924921557-45e8e0164a24?w=600&q=80",
        ],
        discount: 38,
        category: "accessories",
        vendor: "SilkWorks",
        sku: "SW-SS-006",
        description: "Luxurious silk blend scarf with a modern geometric print. Lightweight and versatile, perfect for adding a touch of elegance to any outfit.",
        availability: "in-stock",
        tags: ["scarf", "silk", "accessories", "luxury"],
        sizes: ["One Size"],
        colors: [
            { name: "Multi", hex: "#ff6b6b" },
            { name: "Midnight", hex: "#191970" },
        ],
    },
    {
        id: 7,
        name: "Running Performance Sneakers",
        slug: "running-performance-sneakers",
        price: 120,
        originalPrice: 180,
        rating: 4.8,
        reviews: 3210,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
        ],
        discount: 33,
        category: "footwear",
        vendor: "SpeedStep",
        sku: "SS-RS-007",
        description: "High-performance running sneakers with responsive cushioning technology. Features breathable mesh upper, lightweight EVA midsole, and durable rubber outsole.",
        availability: "in-stock",
        tags: ["sneakers", "running", "sport", "footwear"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: [
            { name: "Red/Black", hex: "#cc0000" },
            { name: "White/Blue", hex: "#4169e1" },
            { name: "All Black", hex: "#1a1a1a" },
        ],
    },
    {
        id: 8,
        name: "Bohemian Maxi Skirt",
        slug: "bohemian-maxi-skirt",
        price: 65,
        originalPrice: 95,
        rating: 4.6,
        reviews: 789,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
        ],
        discount: 32,
        category: "women",
        vendor: "BohoStyle",
        sku: "BS-MS-008",
        description: "Flowing bohemian maxi skirt with vibrant print. Made from lightweight rayon fabric with an elastic waistband. Perfect for festivals and beach days.",
        availability: "in-stock",
        tags: ["skirt", "maxi", "bohemian", "summer"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "Sunset", hex: "#ff7f50" },
            { name: "Ocean", hex: "#20b2aa" },
        ],
    },
    {
        id: 9,
        name: "Minimalist Gold Necklace",
        slug: "minimalist-gold-necklace",
        price: 42,
        originalPrice: 68,
        rating: 4.7,
        reviews: 1456,
        image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?w=600&q=80",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        ],
        discount: 38,
        category: "jewelry",
        vendor: "GoldLine",
        sku: "GL-GN-009",
        description: "Delicate minimalist gold necklace, 18k gold plated over sterling silver. Features a dainty pendant on a fine chain. Hypoallergenic and tarnish-resistant.",
        availability: "in-stock",
        tags: ["necklace", "gold", "minimalist", "jewelry"],
        sizes: ["16 inch", "18 inch", "20 inch"],
        colors: [
            { name: "Gold", hex: "#ffd700" },
            { name: "Rose Gold", hex: "#b76e79" },
            { name: "Silver", hex: "#c0c0c0" },
        ],
    },
    {
        id: 10,
        name: "Oversized Wool Coat",
        slug: "oversized-wool-coat",
        price: 189,
        originalPrice: 280,
        rating: 4.9,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
            "https://images.unsplash.com/photo-1544923246-77307dd270cb?w=600&q=80",
        ],
        discount: 33,
        category: "women",
        vendor: "WinterChic",
        sku: "WC-OC-010",
        description: "Luxurious oversized wool coat with a timeless silhouette. Features notch lapels, double-breasted closure, and side pockets. Perfect for the cooler months.",
        availability: "low-stock",
        tags: ["coat", "wool", "winter", "outerwear"],
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Camel", hex: "#c19a6b" },
            { name: "Charcoal", hex: "#36454f" },
        ],
    },
    {
        id: 11,
        name: "Vintage Denim Jacket",
        slug: "vintage-denim-jacket",
        price: 95,
        originalPrice: 140,
        rating: 4.5,
        reviews: 923,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
        ],
        discount: 32,
        category: "women",
        vendor: "DenimCo",
        sku: "DC-DJ-011",
        description: "Classic vintage-wash denim jacket with a relaxed fit. Features chest pockets, button closure, and a distressed finish for an authentic look.",
        availability: "in-stock",
        tags: ["denim", "jacket", "vintage", "casual"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "Light Wash", hex: "#a8c4e0" },
            { name: "Medium Wash", hex: "#5b7fa5" },
        ],
    },
    {
        id: 12,
        name: "Athletic Training Shorts",
        slug: "athletic-training-shorts",
        price: 38,
        originalPrice: 58,
        rating: 4.6,
        reviews: 2340,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
            "https://images.unsplash.com/photo-1562886877-aaaa5c17965a?w=600&q=80",
        ],
        discount: 34,
        category: "men",
        vendor: "ActiveFit",
        sku: "AF-TS-012",
        description: "Lightweight athletic training shorts with moisture-wicking technology. Features a built-in brief liner, zippered pocket, and 4-way stretch fabric.",
        availability: "in-stock",
        tags: ["shorts", "athletic", "training", "sport"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Navy", hex: "#1b3a5c" },
            { name: "Grey", hex: "#808080" },
        ],
    },
];

// ─── Filter Options ───

export const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "best-selling", label: "Best Selling" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "name-asc", label: "A – Z" },
    { value: "name-desc", label: "Z – A" },
];

export const priceRanges = [
    { min: 0, max: 25, label: "Under $25" },
    { min: 25, max: 50, label: "$25 – $50" },
    { min: 50, max: 100, label: "$50 – $100" },
    { min: 100, max: 200, label: "$100 – $200" },
    { min: 200, max: Infinity, label: "$200+" },
];

// ─── Helper ───

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    return products.filter((p) => p.category === categorySlug);
}
