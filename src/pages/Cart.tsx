import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { products } from "@/data/mockData";
import type { CartItem } from "@/data/mockData";

// ─── Seed with sample items ───

const initialCart: CartItem[] = [
    { product: products[0], quantity: 2, selectedSize: "M", selectedColor: products[0].colors[0]?.name ?? "" },
    { product: products[2], quantity: 1, selectedSize: "L", selectedColor: products[2].colors[0]?.name ?? "" },
    { product: products[6], quantity: 1, selectedSize: "10", selectedColor: products[6].colors[0]?.name ?? "" },
];

export default function Cart() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
    const [cartNote, setCartNote] = useState("");

    const updateQuantity = (index: number, newQty: number) => {
        if (newQty < 1) return;
        setCartItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item))
        );
    };

    const removeItem = (index: number) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => setCartItems([]);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Breadcrumb */}
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: t("cart.title") }]} />
                </div>

                <div className="container mx-auto px-4 pb-16">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                        {t("cart.title")}
                        {itemCount > 0 && (
                            <span className="text-base font-normal text-muted-foreground ms-2">
                                {itemCount === 1 ? t("cart.items_count", { count: 1 }) : t("cart.items_count_plural", { count: itemCount })}
                            </span>
                        )}
                    </h1>

                    {cartItems.length === 0 ? (
                        /* ── Empty State ── */
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                {t("cart.empty_title", "Your cart is empty")}
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                {t("cart.empty_text")}
                            </p>
                            <Button asChild size="lg">
                                <Link to="/shop">{t("cart.continue_shopping")}</Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* ── Cart Items ── */}
                            <div className="lg:col-span-2">
                                {/* Desktop table header */}
                                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    <div className="col-span-6">{t("cart.product")}</div>
                                    <div className="col-span-2 text-center">{t("cart.price")}</div>
                                    <div className="col-span-2 text-center">{t("cart.quantity")}</div>
                                    <div className="col-span-2 text-end">{t("cart.total")}</div>
                                </div>

                                <AnimatePresence>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-b border-border"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                                                {/* Product info */}
                                                <div className="col-span-6 flex gap-4">
                                                    <Link
                                                        to={`/product/${item.product.slug}`}
                                                        className="shrink-0"
                                                    >
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                                                        />
                                                    </Link>
                                                    <div className="min-w-0">
                                                        <Link to={`/product/${item.product.slug}`}>
                                                            <h3 className="font-medium text-foreground text-sm hover:text-primary transition-colors line-clamp-2">
                                                                {item.product.name}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {item.selectedSize && (
                                                                <span>{t("product.size")}: {item.selectedSize}</span>
                                                            )}
                                                            {item.selectedColor && (
                                                                <span className="ms-2">
                                                                    {t("product.color")}: {item.selectedColor}
                                                                </span>
                                                            )}
                                                        </p>
                                                        {/* Mobile price */}
                                                        <p className="md:hidden text-sm font-medium text-foreground mt-1">
                                                            ${item.product.price}
                                                        </p>
                                                        {/* Mobile remove */}
                                                        <button
                                                            onClick={() => removeItem(index)}
                                                            className="md:hidden text-xs text-destructive hover:underline mt-2 flex items-center gap-1"
                                                        >
                                                            <X className="w-3 h-3" /> {t("cart.remove", "Remove")}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price (desktop) */}
                                                <div className="hidden md:flex col-span-2 justify-center">
                                                    <div>
                                                        <span className="font-medium text-foreground">
                                                            ${item.product.price}
                                                        </span>
                                                        {item.product.originalPrice > item.product.price && (
                                                            <span className="block text-xs text-muted-foreground line-through">
                                                                ${item.product.originalPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Quantity */}
                                                <div className="col-span-2 flex justify-center">
                                                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(index, item.quantity - 1)
                                                            }
                                                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                                                            aria-label={t("product.decrease_quantity", "Decrease quantity")}
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-foreground border-x border-border">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(index, item.quantity + 1)
                                                            }
                                                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                                                            aria-label={t("product.increase_quantity", "Increase quantity")}
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Total + Remove (desktop) */}
                                                <div className="hidden md:flex col-span-2 items-center justify-end gap-3">
                                                    <span className="font-semibold text-foreground">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors"
                                                        aria-label={t("cart.remove_item", "Remove item")}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Mobile total */}
                                                <div className="md:hidden flex items-center justify-between mt-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        {t("cart.subtotal")}
                                                    </span>
                                                    <span className="font-semibold text-foreground">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Cart actions */}
                                <div className="flex flex-wrap items-center gap-3 mt-6">
                                    <Button variant="outline" asChild>
                                        <Link to="/shop">{t("cart.continue_shopping")}</Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={clearCart}
                                    >
                                        <Trash2 className="w-4 h-4 me-1" />
                                        {t("cart.clear_cart")}
                                    </Button>
                                </div>

                                {/* Cart note */}
                                <div className="mt-8">
                                    <label
                                        htmlFor="cart-note"
                                        className="text-sm font-medium text-foreground mb-2 block"
                                    >
                                        {t("cart.order_notes")}
                                    </label>
                                    <textarea
                                        id="cart-note"
                                        rows={3}
                                        value={cartNote}
                                        onChange={(e) => setCartNote(e.target.value)}
                                        placeholder={t("cart.notes_placeholder")}
                                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                                    />
                                </div>
                            </div>

                            {/* ── Cart Summary ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 bg-muted/50 rounded-2xl p-6 space-y-4">
                                    <h2 className="font-semibold text-lg text-foreground">
                                        {t("cart.order_summary")}
                                    </h2>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                                            <span className="font-medium text-foreground">
                                                ${subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t("cart.shipping")}</span>
                                            <span className="text-green-600 font-medium">{t("cart.free")}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">{t("cart.tax")}</span>
                                            <span className="text-muted-foreground">
                                                {t("cart.tax_note")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="flex justify-between text-lg font-bold text-foreground">
                                            <span>{t("cart.total")}</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button asChild size="lg" className="w-full gap-2 text-base">
                                        <Link to="/checkout">
                                            {t("cart.checkout")}
                                            <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                                        </Link>
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        {t("cart.secure_message")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
