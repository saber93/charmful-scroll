import { motion, type Variants } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Product } from "@/data/mockData";

interface ProductCardProps {
    product: Product;
    /** animation variant for stagger effects — parent must supply variants */
    variants?: Variants;
}

export default function ProductCard({ product, variants }: ProductCardProps) {
    return (
        <motion.div
            variants={variants}
            className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* ── Image ── */}
            <Link to={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Shine */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine" />
                    </div>

                    {/* Discount badge */}
                    {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                            -{product.discount}%
                        </Badge>
                    )}

                    {/* Availability badge */}
                    {product.availability === "low-stock" && (
                        <Badge className="absolute top-2 right-2 bg-amber-500 text-white text-xs">
                            Low Stock
                        </Badge>
                    )}

                    {/* Quick-action bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-background rounded-full flex items-center justify-center"
                                aria-label="Add to wishlist"
                            >
                                <Heart className="w-4 h-4 text-foreground" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                                aria-label="Add to cart"
                            >
                                <ShoppingCart className="w-4 h-4 text-accent-foreground" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-background rounded-full flex items-center justify-center"
                                aria-label="Quick view"
                            >
                                <Eye className="w-4 h-4 text-foreground" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* ── Info ── */}
            <div className="p-3">
                <Link to={`/product/${product.slug}`}>
                    <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Vendor */}
                <p className="text-xs text-muted-foreground mb-1.5">{product.vendor}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.round(product.rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-muted text-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-primary">${product.price}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
