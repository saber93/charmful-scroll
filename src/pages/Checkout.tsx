import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CreditCard,
    Shield,
    Lock,
    Truck,
    ChevronRight,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { products } from "@/data/mockData";

export default function Checkout() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Form state
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("US");
    const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
        "standard"
    );

    const steps = [
        { num: 1, label: t("checkout.information") },
        { num: 2, label: t("checkout.shipping") },
        { num: 3, label: t("checkout.payment") },
    ];

    // ─── Order Summary Data ───
    const orderItems = useMemo(() => [
        { product: products[0], quantity: 2, size: "M", color: "Rose Pink" },
        { product: products[2], quantity: 1, size: "L", color: "Black" },
    ], []);

    const subtotal = orderItems.reduce(
        (s, i) => s + i.product.price * i.quantity,
        0
    );
    const shippingPrice = shippingMethod === "express" ? 12.99 : 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = subtotal + shippingPrice + tax;

    const inputClass =
        "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

    return (
        <div className="min-h-screen bg-background text-start" dir={i18n.dir()}>
            <Header />

            <main>
                <div className="container mx-auto px-4">
                    <Breadcrumb
                        items={[
                            { label: t("cart.title"), href: "/cart" },
                            { label: t("checkout.title") },
                        ]}
                    />
                </div>

                <div className="container mx-auto px-4 pb-16">
                    {/* ── Step Indicator ── */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        {steps.map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <button
                                    onClick={() => {
                                        if (s.num < step) setStep(s.num as 1 | 2 | 3);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === s.num
                                        ? "bg-primary text-primary-foreground"
                                        : step > s.num
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {step > s.num ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <span>{s.num}</span>
                                    )}
                                    <span className="hidden sm:inline">{s.label}</span>
                                </button>
                                {i < steps.length - 1 && (
                                    <ChevronRight className={`w-4 h-4 mx-2 text-muted-foreground/50 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* ── Left: Form ── */}
                        <div className="lg:col-span-3">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Step 1: Contact + Address */}
                                {step === 1 && (
                                    <div className="space-y-8">
                                        {/* Contact */}
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                                {t("checkout.contact_info")}
                                            </h2>
                                            <div className="space-y-4">
                                                <input
                                                    type="email"
                                                    placeholder={t("checkout.email_placeholder")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={inputClass}
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder={t("checkout.phone_placeholder")}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                                {t("checkout.shipping_address")}
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        placeholder={t("checkout.first_name")}
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder={t("checkout.last_name")}
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <input
                                                    placeholder={t("checkout.address")}
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className={inputClass}
                                                />
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <input
                                                        placeholder={t("checkout.city")}
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder={t("checkout.state")}
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder={t("checkout.zip")}
                                                        value={zip}
                                                        onChange={(e) => setZip(e.target.value)}
                                                        className={`${inputClass} col-span-2 md:col-span-1`}
                                                    />
                                                </div>
                                                <select
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    className={inputClass}
                                                >
                                                    <option value="US">{t("countries.US", "United States")}</option>
                                                    <option value="CA">{t("countries.CA", "Canada")}</option>
                                                    <option value="UK">{t("countries.UK", "United Kingdom")}</option>
                                                    <option value="AE">{t("countries.AE", "United Arab Emirates")}</option>
                                                    <option value="SA">{t("countries.SA", "Saudi Arabia")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <Button
                                            size="lg"
                                            className="w-full sm:w-auto"
                                            onClick={() => setStep(2)}
                                        >
                                            {t("checkout.continue_shipping")}
                                        </Button>
                                    </div>
                                )}

                                {/* Step 2: Shipping Method */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-semibold text-foreground mb-4">
                                            {t("checkout.shipping_method.title")}
                                        </h2>

                                        <div className="space-y-3">
                                            {[
                                                {
                                                    id: "standard" as const,
                                                    label: t("checkout.shipping_method.standard"),
                                                    time: t("checkout.shipping_method.standard_time"),
                                                    price: t("cart.free"),
                                                },
                                                {
                                                    id: "express" as const,
                                                    label: t("checkout.shipping_method.express"),
                                                    time: t("checkout.shipping_method.express_time"),
                                                    price: "$12.99",
                                                },
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setShippingMethod(method.id)}
                                                    className={`w-full flex items-center gap-4 p-4 border rounded-xl text-start transition-all ${shippingMethod === method.id
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                        : "border-border hover:border-muted-foreground/30"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${shippingMethod === method.id
                                                            ? "border-primary"
                                                            : "border-border"
                                                            }`}
                                                    >
                                                        {shippingMethod === method.id && (
                                                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                                        )}
                                                    </div>
                                                    <Truck className="w-5 h-5 text-muted-foreground" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-foreground">
                                                            {method.label}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {method.time}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`text-sm font-medium ${method.price === t("cart.free")
                                                            ? "text-green-600"
                                                            : "text-foreground"
                                                            }`}
                                                    >
                                                        {method.price}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setStep(1)}
                                            >
                                                {t("checkout.back")}
                                            </Button>
                                            <Button
                                                size="lg"
                                                onClick={() => setStep(3)}
                                            >
                                                {t("checkout.continue_payment")}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Payment */}
                                {step === 3 && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                                {t("checkout.payment_method.title")}
                                            </h2>
                                            <div className="border border-border rounded-xl p-5 space-y-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                                    <span className="text-sm font-medium text-foreground">
                                                        {t("checkout.payment_method.card")}
                                                    </span>
                                                </div>
                                                <input
                                                    placeholder={t("checkout.payment_method.card_number")}
                                                    className={inputClass}
                                                />
                                                <input
                                                    placeholder={t("checkout.payment_method.card_name")}
                                                    className={inputClass}
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        placeholder={t("checkout.payment_method.expiry")}
                                                        className={inputClass}
                                                    />
                                                    <input
                                                        placeholder={t("checkout.payment_method.cvv")}
                                                        className={inputClass}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trust badges */}
                                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Lock className="w-3.5 h-3.5" /> {t("checkout.ssl_encrypted")}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Shield className="w-3.5 h-3.5" /> {t("checkout.secure_checkout")}
                                            </span>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setStep(2)}
                                            >
                                                {t("checkout.back")}
                                            </Button>
                                            <Button
                                                size="lg"
                                                className="flex-1 text-base gap-2"
                                            >
                                                <Lock className="w-4 h-4" />
                                                {t("checkout.place_order_with_total", "Place Order · ${{total}}", { total: total.toFixed(2) })}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* ── Right: Order Summary ── */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-28 bg-muted/50 rounded-2xl p-6 space-y-5">
                                <h2 className="font-semibold text-lg text-foreground">
                                    {t("cart.order_summary")}
                                </h2>

                                {/* Items */}
                                <div className="space-y-4">
                                    {orderItems.map((item) => (
                                        <div
                                            key={`${item.product.id}-${item.size}`}
                                            className="flex gap-3"
                                        >
                                            <div className="relative shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-14 h-14 rounded-lg object-cover"
                                                />
                                                <span className={`absolute -top-1.5 ${isRtl ? '-left-1.5' : '-right-1.5'} w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium`}>
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.size} / {item.color}
                                                </p>
                                            </div>
                                            <span className="text-sm font-medium text-foreground">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t border-border pt-4 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                                        <span className="text-foreground">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t("cart.shipping")}</span>
                                        <span className="text-green-600 font-medium">
                                            {shippingPrice === 0 ? t("cart.free") : `$${shippingPrice.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t("cart.tax")}</span>
                                        <span className="text-foreground">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <div className="flex justify-between text-lg font-bold text-foreground">
                                        <span>{t("cart.total")}</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
