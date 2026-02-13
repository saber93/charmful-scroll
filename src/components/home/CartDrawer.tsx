import { useTranslation } from "react-i18next";
import SideDrawer from "../shared/SideDrawer";
import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mockData";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock cart items for the drawer
const cartItems = [
    { ...products[0], quantity: 2, variant: "M / Rose Pink" },
    { ...products[1], quantity: 1, variant: "L / Black" },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { t } = useTranslation();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <SideDrawer isOpen={isOpen} onClose={onClose} title={t("general.cart.title")}>
            <div className="flex flex-col h-full space-y-6">
                {/* Shipping notice */}
                <div className="bg-accent/10 p-4 border border-accent/20 text-center">
                    <p className="text-sm font-medium">
                        🔥 {t("general.cart.shipping_notice")}
                    </p>
                    <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent transition-all duration-1000"
                            style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-border pe-2 -me-2 component-scrollbar">
                    {cartItems.map((item) => (
                        <div key={`${item.id}-${item.variant}`} className="py-6 flex gap-4 group">
                            <div className="w-24 h-24 bg-muted overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-foreground leading-tight line-clamp-2">
                                            {item.name}
                                        </h5>
                                        <button className="text-muted-foreground hover:text-destructive transition-colors ms-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                                        {item.variant}
                                    </p>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-border h-8">
                                        <button className="px-2 h-full hover:bg-muted transition-colors">
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                        <button className="px-2 h-full hover:bg-muted transition-colors">
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <span className="font-bold text-primary">${item.price * item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-center bg-muted/30 p-4">
                        <span className="text-lg font-bold uppercase tracking-widest">{t("general.cart.subtotal")}</span>
                        <span className="text-2xl font-black text-primary">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-primary/90 transition-all hover:gap-4 group"
                        >
                            {t("general.cart.checkout")}
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/cart"
                            onClick={onClose}
                            className="w-full py-4 bg-background text-foreground border-2 border-primary font-bold uppercase tracking-widest text-center hover:bg-muted transition-colors"
                        >
                            {t("general.cart.view_cart")}
                        </Link>
                    </div>
                </div>
            </div>
        </SideDrawer>
    );
}
