import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
    onOpenSearch: () => void;
    onOpenCart: () => void;
    onOpenAccount: () => void;
    onOpenMobileMenu: () => void;
    isScrolled: boolean;
}



export default function Navbar({
    onOpenSearch,
    onOpenCart,
    onOpenAccount,
    onOpenMobileMenu,
    isScrolled
}: NavbarProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const navItems = [
        {
            title: t('header.categories.electronics'),
            items: [
                { title: t('header.subcategories.mobiles'), items: [t('header.subcategories.phones'), t('navbar.items.samsung'), t('navbar.items.xiaomi'), t('navbar.items.realme')] },
                { title: t('header.subcategories.laptops'), items: [t('navbar.items.macbook'), t('navbar.items.dell'), t('navbar.items.hp'), t('navbar.items.lenovo')] },
                { title: t('header.subcategories.accessories'), items: [t('navbar.items.headphones'), t('navbar.items.chargers'), t('navbar.items.cases'), t('navbar.items.watches')] }
            ]
        },
        {
            title: t('header.categories.fashion'),
            items: [
                { title: t('header.subcategories.men'), items: [t('navbar.items.tshirts'), t('navbar.items.jeans'), t('navbar.items.jackets'), t('navbar.items.shoes')] },
                { title: t('header.subcategories.women'), items: [t('navbar.items.dresses'), t('navbar.items.tops'), t('navbar.items.skirts'), t('navbar.items.handbags')] }
            ]
        },
    ];

    return (
        <nav className={`transition-all duration-300 ${isScrolled ? "py-2 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm" : "py-5 bg-transparent shadow-none border-none backdrop-filter-none"}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Mobile Menu Trigger (Start on Mobile) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onOpenMobileMenu}
                >
                    <Menu className="w-6 h-6" />
                </Button>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
                        <span className="text-primary-foreground font-bold text-xl">M</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase hidden sm:block">
                        {t('header.storeName')}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-10">
                    <li className="relative group">
                        <Link to="/shop" className="text-[15px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
                            {t('header.shop')}
                        </Link>
                        <div className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </li>

                    {navItems.map((item) => (
                        <li
                            key={item.title}
                            className="relative"
                            onMouseEnter={() => setActiveItem(item.title)}
                            onMouseLeave={() => setActiveItem(null)}
                        >
                            <button className="flex items-center gap-1 text-[15px] font-bold uppercase tracking-widest hover:text-primary transition-colors py-2">
                                {item.title}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeItem === item.title ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {activeItem === item.title && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="fixed top-[135px] start-0 w-full bg-background border-b border-border shadow-2xl z-50 py-10"
                                    >
                                        <div className="container mx-auto grid grid-cols-4 gap-8">
                                            {item.items.map((sub, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <h4 className="font-black text-sm uppercase tracking-[0.2em] text-primary underline underline-offset-8 decoration-2 decoration-accent/30">
                                                        {sub.title}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {sub.items.map((link) => (
                                                            <li key={link}>
                                                                <Link
                                                                    to="/shop"
                                                                    className={`text-sm text-muted-foreground hover:text-primary inline-block transition-all duration-200 ${isRtl ? 'hover:-translate-x-1' : 'hover:translate-x-1'}`}
                                                                >
                                                                    {link}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            {/* Featured Image in Mega Menu */}
                                            <div className="col-span-1 relative overflow-hidden group">
                                                <img
                                                    src={`https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop`}
                                                    alt={t('header.promo')}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <span className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest">
                                                        {t('header.collection_2024')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* Action Icons */}
                <div className="flex items-center gap-1 sm:gap-3">
                    <Button variant="ghost" size="icon" onClick={onOpenSearch} className="hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={onOpenAccount} className="hidden sm:flex hover:text-primary transition-colors">
                        <User className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={onOpenCart} className="relative hover:text-primary transition-colors group">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -end-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            3
                        </span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
