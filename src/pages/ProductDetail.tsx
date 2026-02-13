import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    ShoppingCart,
    Share2,
    Star,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Truck,
    RotateCcw,
    Shield,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard from "@/components/shared/ProductCard";
import { getProductBySlug, products } from "@/data/mockData";

// ─── Animation ───

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5 },
    }),
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Component ───

export default function ProductDetail() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const { slug } = useParams<{ slug: string }>();
    const product = getProductBySlug(slug ?? "");

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "info" | "reviews">(
        "description"
    );
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    // Related products (same category, exclude current)
    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product]);

    // ─── 404 ───
    if (!product) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        {t("product.not_found")}
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        {t("product.not_found_text")}
                    </p>
                    <Button asChild>
                        <Link to="/shop">{t("product.back_to_shop")}</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setZoomPosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Breadcrumb */}
                <div className="container mx-auto px-4">
                    <Breadcrumb
                        items={[
                            { label: t("shop.title"), href: "/shop" },
                            {
                                label:
                                    product.category.charAt(0).toUpperCase() +
                                    product.category.slice(1),
                                href: "/shop",
                            },
                            { label: product.name },
                        ]}
                    />
                </div>

                {/* ── Product Section ── */}
                <section className="container mx-auto px-4 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* ── Left: Image Gallery ── */}
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main image */}
                            <div
                                className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4 cursor-crosshair"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        src={product.images[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        style={
                                            isZoomed
                                                ? {
                                                    transform: "scale(2)",
                                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                                }
                                                : {}
                                        }
                                    />
                                </AnimatePresence>

                                {/* Discount badge */}
                                {product.discount > 0 && (
                                    <Badge className="absolute top-4 start-4 bg-destructive text-destructive-foreground text-sm px-3 py-1">
                                        -{product.discount}% {t("product.off")}
                                    </Badge>
                                )}

                                {/* Nav arrows */}
                                <button
                                    onClick={() =>
                                        setSelectedImage((prev) =>
                                            prev > 0 ? prev - 1 : product.images.length - 1
                                        )
                                    }
                                    className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                    aria-label={t("common.previous", "Previous image")}
                                >
                                    <ChevronLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedImage((prev) =>
                                            prev < product.images.length - 1 ? prev + 1 : 0
                                        )
                                    }
                                    className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                    aria-label={t("common.next", "Next image")}
                                >
                                    <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                            ? "border-primary ring-2 ring-primary/30"
                                            : "border-transparent hover:border-muted-foreground/30"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Right: Product Info ── */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {/* Vendor */}
                            <motion.p
                                variants={fadeUp}
                                custom={0}
                                className="text-sm text-muted-foreground uppercase tracking-wider"
                            >
                                {product.vendor}
                            </motion.p>

                            {/* Title */}
                            <motion.h1
                                variants={fadeUp}
                                custom={1}
                                className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
                            >
                                {product.name}
                            </motion.h1>

                            {/* Rating */}
                            <motion.div
                                variants={fadeUp}
                                custom={2}
                                className="flex items-center gap-3"
                            >
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.round(product.rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-muted text-muted"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {product.rating} ({t("product.reviews", { count: product.reviews })})
                                </span>
                            </motion.div>

                            {/* Price */}
                            <motion.div
                                variants={fadeUp}
                                custom={3}
                                className="flex items-baseline gap-3"
                            >
                                <span className="text-3xl font-bold text-primary">
                                    ${product.price}
                                </span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through">
                                            ${product.originalPrice}
                                        </span>
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-700"
                                        >
                                            {t("product.you_save")} ${product.originalPrice - product.price}
                                        </Badge>
                                    </>
                                )}
                            </motion.div>

                            {/* Short description */}
                            <motion.p
                                variants={fadeUp}
                                custom={4}
                                className="text-muted-foreground leading-relaxed transition-all duration-300"
                            >
                                {product.description}
                            </motion.p>

                            {/* ── Size selector ── */}
                            {product.sizes.length > 1 && (
                                <motion.div variants={fadeUp} custom={5}>
                                    <label className="text-sm font-medium text-foreground mb-3 block">
                                        {t("product.size")}:{" "}
                                        {selectedSize && (
                                            <span className="text-primary">{selectedSize}</span>
                                        )}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`min-w-[44px] h-10 px-3 rounded-lg border text-sm font-medium transition-all ${selectedSize === size
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border text-foreground hover:border-primary"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Color selector ── */}
                            {product.colors.length > 0 && (
                                <motion.div variants={fadeUp} custom={6}>
                                    <label className="text-sm font-medium text-foreground mb-3 block">
                                        {t("product.color")}:{" "}
                                        {selectedColor && (
                                            <span className="text-primary">
                                                {
                                                    product.colors.find((c) => c.hex === selectedColor)
                                                        ?.name
                                                }
                                            </span>
                                        )}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color.hex}
                                                onClick={() => setSelectedColor(color.hex)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.hex
                                                    ? "border-primary ring-2 ring-primary/30"
                                                    : "border-border hover:border-primary/50"
                                                    }`}
                                                style={{ backgroundColor: color.hex }}
                                                aria-label={color.name}
                                            >
                                                {selectedColor === color.hex && (
                                                    <Check
                                                        className={`w-4 h-4 ${color.hex === "#ffffff" ||
                                                            color.hex === "#f5f5dc" ||
                                                            color.hex === "#ffd700"
                                                            ? "text-foreground"
                                                            : "text-white"
                                                            }`}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Quantity + Add to Cart ── */}
                            <motion.div
                                variants={fadeUp}
                                custom={7}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                {/* Quantity */}
                                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                                        aria-label={t("product.decrease_quantity", "Decrease quantity")}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-14 h-11 flex items-center justify-center text-sm font-medium text-foreground border-x border-border">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                                        aria-label={t("product.increase_quantity", "Increase quantity")}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    size="lg"
                                    className="flex-1 h-11 gap-2 text-base"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {t("product.add_to_cart")}
                                </Button>

                                {/* Wishlist */}
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-11 w-11 p-0 shrink-0"
                                    aria-label={t("product.add_to_wishlist", "Add to wishlist")}
                                >
                                    <Heart className="w-5 h-5" />
                                </Button>
                            </motion.div>

                            {/* Buy Now */}
                            <motion.div variants={fadeUp} custom={8}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                    asChild
                                >
                                    <Link to="/checkout">{t("product.buy_now")}</Link>
                                </Button>
                            </motion.div>

                            {/* ── Trust badges ── */}
                            <motion.div
                                variants={fadeUp}
                                custom={9}
                                className="grid grid-cols-3 gap-4 pt-4 border-t border-border"
                            >
                                <div className="text-center">
                                    <Truck className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs text-muted-foreground">{t("product.free_shipping")}</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs text-muted-foreground">
                                        {t("product.easy_returns")}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-6 h-6 mx-auto mb-1 text-primary" />
                                    <p className="text-xs text-muted-foreground">
                                        {t("product.secure_checkout")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── Meta ── */}
                            <motion.div
                                variants={fadeUp}
                                custom={10}
                                className="text-sm text-muted-foreground space-y-1 pt-4 border-t border-border"
                            >
                                <p>
                                    <span className="font-medium text-foreground">{t("product.sku")}:</span>{" "}
                                    {product.sku}
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">{t("product.category")}:</span>{" "}
                                    <Link
                                        to="/shop"
                                        className="hover:text-primary transition-colors hover:ps-1 transition-all"
                                    >
                                        {product.category.charAt(0).toUpperCase() +
                                            product.category.slice(1)}
                                    </Link>
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">{t("product.tags")}:</span>{" "}
                                    {product.tags.join(", ")}
                                </p>
                            </motion.div>

                            {/* Share */}
                            <motion.div
                                variants={fadeUp}
                                custom={11}
                                className="flex items-center gap-3"
                            >
                                <Share2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{t("product.share")}:</span>
                                <div className="flex gap-2">
                                    {["Facebook", "Twitter", "Pinterest"].map((social) => (
                                        <button
                                            key={social}
                                            className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
                                        >
                                            {social}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Tabs ── */}
                <section className="border-t border-border">
                    <div className="container mx-auto px-4 py-12">
                        {/* Tab headers */}
                        <div className="flex gap-0 border-b border-border mb-8 overflow-x-auto">
                            {(
                                [
                                    { key: "description", label: t("product.description") },
                                    { key: "info", label: t("product.additional_info") },
                                    { key: "reviews", label: t("product.reviews_tab", { count: product.reviews }) },
                                ] as const
                            ).map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab === tab.key
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                            >
                                {activeTab === "description" && (
                                    <div className="prose prose-sm max-w-none text-muted-foreground">
                                        <p className="leading-relaxed">{product.description}</p>
                                        <h3 className="text-foreground mt-6 mb-3 text-lg font-semibold">
                                            {t("product.features")}
                                        </h3>
                                        <ul className="space-y-2 list-disc ps-5">
                                            <li>{t("product.feature_1", "Premium quality materials for lasting durability")}</li>
                                            <li>{t("product.feature_2", "Designed for comfort and style")}</li>
                                            <li>{t("product.feature_3", "Available in multiple sizes and colors")}</li>
                                            <li>{t("product.feature_4", "Easy care — machine washable")}</li>
                                            <li>{t("product.feature_5", "Ethically produced with sustainable practices")}</li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === "info" && (
                                    <div className="max-w-lg">
                                        <table className="w-full text-sm">
                                            <tbody className="divide-y divide-border">
                                                {[
                                                    [t("product.material", "Material"), t("product.material_value", "Premium Blend")],
                                                    [t("product.weight", "Weight"), "0.3 kg"],
                                                    [t("product.dimensions", "Dimensions"), t("product.dimensions_value", "Varies by size")],
                                                    [t("product.care", "Care"), t("product.care_value", "Machine wash cold")],
                                                    [t("product.origin", "Origin"), t("product.origin_value", "Ethically sourced")],
                                                ].map(([label, value]) => (
                                                    <tr key={label}>
                                                        <td className="py-3 font-medium text-foreground w-40">
                                                            {label}
                                                        </td>
                                                        <td className="py-3 text-muted-foreground ps-4">
                                                            {value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === "reviews" && (
                                    <div className="space-y-6">
                                        {/* Summary */}
                                        <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-xl">
                                            <div className="text-center">
                                                <p className="text-4xl font-bold text-foreground">
                                                    {product.rating}
                                                </p>
                                                <div className="flex mt-1 justify-center">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.round(product.rating)
                                                                ? "fill-amber-400 text-amber-400"
                                                                : "fill-muted text-muted"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {t("product.reviews", { count: product.reviews })}
                                                </p>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                {[5, 4, 3, 2, 1].map((stars) => {
                                                    const pct =
                                                        stars === 5
                                                            ? 68
                                                            : stars === 4
                                                                ? 22
                                                                : stars === 3
                                                                    ? 7
                                                                    : stars === 2
                                                                        ? 2
                                                                        : 1;
                                                    return (
                                                        <div
                                                            key={stars}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="text-xs text-muted-foreground w-3">
                                                                {stars}
                                                            </span>
                                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-amber-400 rounded-full"
                                                                    style={{ width: `${pct}%` }}
                                                                />
                                                            </div>
                                                            <span className={`text-xs text-muted-foreground w-8 ${isRtl ? 'text-left' : 'text-right'}`}>
                                                                {pct}%
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Sample reviews */}
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    name: "Sarah M.",
                                                    rating: 5,
                                                    date: t("product.review_date_1", "2 weeks ago"),
                                                    text: t("product.review_text_1", "Absolutely love this! The quality is amazing and it fits perfectly. Would definitely recommend."),
                                                },
                                                {
                                                    name: "Alex K.",
                                                    rating: 4,
                                                    date: t("product.review_date_2", "1 month ago"),
                                                    text: t("product.review_text_2", "Great product overall. Shipping was fast and the packaging was excellent. Minor sizing issue but it works."),
                                                },
                                            ].map((review, idx) => (
                                                <div
                                                    key={idx}
                                                    className="p-4 border border-border rounded-xl"
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                            {review.name[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-foreground">
                                                                {review.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {review.date}
                                                            </p>
                                                        </div>
                                                        <div className="ms-auto flex">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < review.rating
                                                                        ? "fill-amber-400 text-amber-400"
                                                                        : "fill-muted text-muted"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {review.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── Related Products ── */}
                {relatedProducts.length > 0 && (
                    <section className="border-t border-border bg-muted/30">
                        <div className="container mx-auto px-4 py-12">
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                {t("product.may_also_like")}
                            </h2>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                            >
                                {relatedProducts.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        product={p}
                                        variants={itemVariants}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
