import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    SlidersHorizontal,
    Grid3X3,
    LayoutList,
    ChevronDown,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard from "@/components/shared/ProductCard";
import {
    products as allProducts,
    categories,
    sortOptions,
    priceRanges,
} from "@/data/mockData";

// ─── Animation variants ───

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

// ─── Component ───

export default function Shop() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    // ── State ──
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activePriceRange, setActivePriceRange] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // ── Filtered & sorted products ──
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Category filter
        if (activeCategory) {
            result = result.filter((p) => p.category === activeCategory);
        }

        // Price filter
        if (activePriceRange !== null) {
            const range = priceRanges[activePriceRange];
            result = result.filter((p) => p.price >= range.min && p.price < range.max);
        }

        // Sort
        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "newest":
                result.sort((a, b) => b.id - a.id);
                break;
            case "best-selling":
                result.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                break;
        }

        return result;
    }, [activeCategory, activePriceRange, sortBy]);

    // ── Pagination ──
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const clearFilters = () => {
        setActiveCategory(null);
        setActivePriceRange(null);
        setCurrentPage(1);
    };

    const activeFiltersCount =
        (activeCategory ? 1 : 0) + (activePriceRange !== null ? 1 : 0);

    // ── Sidebar content (reused in mobile drawer) ──
    const filterSidebar = (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                    {t("shop.categories")}
                </h3>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => {
                                setActiveCategory(null);
                                setCurrentPage(1);
                            }}
                            className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${!activeCategory
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                        >
                            {t("shop.all_products")}
                            <span className="ms-auto float-end text-xs opacity-60">
                                {allProducts.length}
                            </span>
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setCurrentPage(1);
                                }}
                                className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.id
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                            >
                                {cat.name}
                                <span className="ms-auto float-end text-xs opacity-60">
                                    {cat.count}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                    {t("shop.price")}
                </h3>
                <ul className="space-y-2">
                    {priceRanges.map((range, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => {
                                    setActivePriceRange(activePriceRange === idx ? null : idx);
                                    setCurrentPage(1);
                                }}
                                className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${activePriceRange === idx
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                            >
                                {range.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Availability */}
            <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                    {t("shop.availability")}
                </h3>
                <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">{t("shop.in_stock")}</span>
                    <span className="ms-auto text-xs text-muted-foreground">
                        {allProducts.filter((p) => p.availability === "in-stock").length}
                    </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm text-muted-foreground">{t("shop.low_stock")}</span>
                    <span className="ms-auto text-xs text-muted-foreground">
                        {allProducts.filter((p) => p.availability === "low-stock").length}
                    </span>
                </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                >
                    {t("shop.clear_all")}
                </Button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* ── Hero Banner ── */}
                <div className="relative bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            }}
                        />
                    </div>
                    <div className="container mx-auto px-4 py-12 md:py-16 relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                        >
                            {activeCategory
                                ? categories.find((c) => c.id === activeCategory)?.name ?? t("shop.title")
                                : t("shop.all_products")}
                        </motion.h1>
                        <Breadcrumb
                            items={[
                                { label: t("shop.title"), href: "/shop" },
                                ...(activeCategory
                                    ? [
                                        {
                                            label:
                                                categories.find((c) => c.id === activeCategory)
                                                    ?.name ?? "",
                                        },
                                    ]
                                    : []),
                            ]}
                        />
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex gap-8">
                        {/* ── Desktop Sidebar ── */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-28">{filterSidebar}</div>
                        </aside>

                        {/* ── Main Grid Area ── */}
                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                                {/* Left: results count + mobile filter toggle */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="lg:hidden flex items-center gap-2"
                                        onClick={() => setIsMobileFilterOpen(true)}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        {t("shop.filters")}
                                        {activeFiltersCount > 0 && (
                                            <span className="ms-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                                                {activeFiltersCount}
                                            </span>
                                        )}
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {filteredProducts.length === 1
                                            ? t("shop.products_count", { count: 1 })
                                            : t("shop.products_count_plural", { count: filteredProducts.length })}
                                    </span>
                                </div>

                                {/* Right: sort + view toggle */}
                                <div className="flex items-center gap-3">
                                    {/* Sort dropdown */}
                                    <div className="relative">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 min-w-[160px] justify-between"
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                        >
                                            <span className="text-sm">
                                                {sortBy === "featured" ? t("shop.sort.featured") :
                                                    sortBy === "newest" ? t("shop.sort.newest") :
                                                        sortBy === "best-selling" ? t("shop.sort.best_selling") :
                                                            sortBy === "price-asc" ? t("shop.sort.price_asc") :
                                                                sortBy === "price-desc" ? t("shop.sort.price_desc") :
                                                                    sortBy === "rating" ? t("shop.sort.rating") :
                                                                        sortBy === "name-asc" ? t("shop.sort.name_asc") :
                                                                            sortBy === "name-desc" ? t("shop.sort.name_desc") :
                                                                                t("shop.sort.label")}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </Button>
                                        <AnimatePresence>
                                            {isSortOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    className="absolute end-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[180px] py-1"
                                                >
                                                    {sortOptions.map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => {
                                                                setSortBy(opt.value);
                                                                setIsSortOpen(false);
                                                            }}
                                                            className={`w-full text-start px-4 py-2 text-sm transition-colors ${sortBy === opt.value
                                                                ? "bg-primary/10 text-primary font-medium"
                                                                : "text-foreground hover:bg-muted"
                                                                }`}
                                                        >
                                                            {opt.value === "featured" ? t("shop.sort.featured") :
                                                                opt.value === "newest" ? t("shop.sort.newest") :
                                                                    opt.value === "best-selling" ? t("shop.sort.best_selling") :
                                                                        opt.value === "price-asc" ? t("shop.sort.price_asc") :
                                                                            opt.value === "price-desc" ? t("shop.sort.price_desc") :
                                                                                opt.value === "rating" ? t("shop.sort.rating") :
                                                                                    opt.value === "name-asc" ? t("shop.sort.name_asc") :
                                                                                        opt.value === "name-desc" ? t("shop.sort.name_desc") :
                                                                                            opt.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* View toggles */}
                                    <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-2 transition-colors ${viewMode === "grid"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-card text-muted-foreground hover:bg-muted"
                                                }`}
                                            aria-label={t("shop.grid_view")}
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-2 transition-colors ${viewMode === "list"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-card text-muted-foreground hover:bg-muted"
                                                }`}
                                            aria-label={t("shop.list_view")}
                                        >
                                            <LayoutList className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Active filter chips */}
                            {activeFiltersCount > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {activeCategory && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                            {categories.find((c) => c.id === activeCategory)?.name}
                                            <button
                                                onClick={() => {
                                                    setActiveCategory(null);
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {activePriceRange !== null && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                            {priceRanges[activePriceRange].label}
                                            <button
                                                onClick={() => {
                                                    setActivePriceRange(null);
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-muted-foreground hover:text-foreground underline"
                                    >
                                        {t("shop.clear_all")}
                                    </button>
                                </div>
                            )}

                            {/* ──── Product Grid ──── */}
                            {paginatedProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-muted-foreground text-lg mb-4">
                                        {t("shop.no_products")}
                                    </p>
                                    <Button variant="outline" onClick={clearFilters}>
                                        {t("shop.clear_all")}
                                    </Button>
                                </div>
                            ) : (
                                <motion.div
                                    key={`${sortBy}-${activeCategory}-${activePriceRange}-${currentPage}`}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className={
                                        viewMode === "grid"
                                            ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                                            : "flex flex-col gap-4"
                                    }
                                >
                                    {paginatedProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variants={itemVariants}
                                        />
                                    ))}
                                </motion.div>
                            )}

                            {/* ──── Pagination ──── */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                    >
                                        {isRtl ? t("common.next") : t("common.previous")}
                                    </Button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <Button
                                            key={i}
                                            variant={currentPage === i + 1 ? "default" : "outline"}
                                            size="sm"
                                            className="w-9 h-9"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                    >
                                        {isRtl ? t("common.previous") : t("common.next")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Mobile Filter Drawer ── */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                                onClick={() => setIsMobileFilterOpen(false)}
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: isRtl ? "100%" : "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: isRtl ? "100%" : "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} w-80 max-w-[85vw] bg-card z-50 shadow-xl lg:hidden overflow-y-auto`}
                            >
                                <div className="flex items-center justify-between p-4 border-b border-border">
                                    <h2 className="font-semibold text-lg">{t("shop.filters")}</h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-4">{filterSidebar}</div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
