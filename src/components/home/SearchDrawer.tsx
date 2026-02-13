import { useState } from "react";
import { useTranslation } from "react-i18next";
import SideDrawer from "../shared/SideDrawer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { products } from "@/data/mockData";
import { Link } from "react-router-dom";

interface SearchDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");

    const filteredProducts = query
        ? products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : products.slice(0, 3); // Featured if no query

    return (
        <SideDrawer isOpen={isOpen} onClose={onClose} title={t("general.search.title")}>
            <div className="space-y-8">
                {/* Search input field */}
                <div className="relative">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("general.search.placeholder")}
                        className="pe-12 h-14 text-lg border-2 focus-visible:ring-primary rounded-none"
                        autoFocus
                    />
                    <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                </div>

                {/* Suggested products */}
                <div className="space-y-4">
                    <h4 className="font-bold uppercase tracking-widest text-sm text-muted-foreground">
                        {query ? t("general.search.results") : t("general.search.suggested")}
                    </h4>

                    <div className="divide-y divide-border">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.slug}`}
                                onClick={onClose}
                                className="group flex gap-4 py-4 items-center"
                            >
                                <div className="w-20 h-20 bg-muted overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                        {product.name}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="font-bold text-primary">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {query && filteredProducts.length === 0 && (
                            <p className="py-8 text-center text-muted-foreground">
                                {t("general.search.no_results", { query })}
                            </p>
                        )}
                    </div>
                </div>

                {/* View all results button */}
                {query && filteredProducts.length > 0 && (
                    <Link
                        to={`/shop?q=${query}`}
                        onClick={onClose}
                        className="block text-center py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                    >
                        {t("general.search.view_all")}
                    </Link>
                )}
            </div>
        </SideDrawer>
    );
}
