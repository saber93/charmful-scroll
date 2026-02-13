import { useTranslation } from "react-i18next";
import SideDrawer from "../shared/SideDrawer";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Heart, RefreshCw, ChevronRight } from "lucide-react";

interface MobileMenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        title: "Electronics",
        items: ["Phones", "Laptops", "Tablets", "Accessories"]
    },
    {
        title: "Fashion",
        items: ["Men", "Women", "Kids", "Shoes"]
    },
    {
        title: "Home & Living",
        items: ["Furniture", "Decor", "Kitchen", "Garden"]
    },
    {
        title: "Beauty",
        items: ["Skincare", "Makeup", "Hair Care", "Fragrances"]
    },
];

export default function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    const menuItems = [
        {
            title: t('header.categories.electronics'),
            items: [
                t('header.subcategories.phones'),
                t('header.subcategories.laptops'),
                t('header.subcategories.tablets'),
                t('header.subcategories.accessories')
            ]
        },
        {
            title: t('header.categories.fashion'),
            items: [
                t('header.subcategories.men'),
                t('header.subcategories.women'),
                t('header.subcategories.kids'),
                t('header.subcategories.shoes')
            ]
        },
        {
            title: t('header.categories.homeAndLiving'),
            items: [
                t('header.subcategories.furniture'),
                t('header.subcategories.decor'),
                t('header.subcategories.kitchen'),
                t('header.subcategories.garden')
            ]
        },
        {
            title: t('header.categories.beauty'),
            items: [
                t('header.subcategories.skincare'),
                t('header.subcategories.makeup'),
                t('header.subcategories.hairCare'),
                t('header.subcategories.fragrances')
            ]
        },
    ];

    return (
        <SideDrawer isOpen={isOpen} onClose={onClose} title={t("common.menu")} side={isRtl ? "right" : "left"}>
            <div className="flex flex-col h-full">
                {/* Navigation Categories */}
                <div className="flex-1 overflow-y-auto component-scrollbar">
                    <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex items-center justify-between py-4 text-lg font-bold uppercase tracking-widest border-b border-border hover:text-primary transition-colors"
                    >
                        {t("header.all_products")}
                        <ChevronRight className={`w-5 h-5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                    </Link>

                    <Accordion type="single" collapsible className="w-full">
                        {menuItems.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border">
                                <AccordionTrigger className="py-4 text-lg font-bold uppercase tracking-widest hover:no-underline hover:text-primary transition-colors">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-4 pb-4 px-2">
                                        {item.items.map((subItem, sIdx) => (
                                            <li key={sIdx}>
                                                <Link
                                                    to="/shop"
                                                    onClick={onClose}
                                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                                    {subItem}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Simple Links */}
                    <div className="py-4 space-y-4">
                        <Link to="/shop" onClick={onClose} className="block text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors">
                            {t('header.new_arrivals')}
                        </Link>
                        <Link to="/shop" onClick={onClose} className="block text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors">
                            {t('header.special_offers')}
                        </Link>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-border grid grid-cols-2 gap-4">
                    <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex flex-col items-center justify-center p-4 bg-muted hover:bg-accent hover:text-accent-foreground transition-all group"
                    >
                        <Heart className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-tighter">{t("wishlist.title")}</span>
                    </Link>
                    <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex flex-col items-center justify-center p-4 bg-muted hover:bg-accent hover:text-accent-foreground transition-all group"
                    >
                        <RefreshCw className="w-6 h-6 mb-2 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-[11px] font-bold uppercase tracking-tighter">{t("compare.title")}</span>
                    </Link>
                </div>
            </div>
        </SideDrawer>
    );
}
