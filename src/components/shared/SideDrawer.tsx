import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    side?: "start" | "end" | "left" | "right";
}

export default function SideDrawer({
    isOpen,
    onClose,
    title,
    children,
    side = "end",
}: SideDrawerProps) {
    const { i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Determine physical side and translation
    const getPhysSide = () => {
        if (side === "start") return isRtl ? "right" : "left";
        if (side === "end") return isRtl ? "left" : "right";
        return side as "left" | "right";
    };

    const physSide = getPhysSide();
    const xTranslation = physSide === "right" ? "100%" : "-100%";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] cursor-pointer"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: xTranslation }}
                        animate={{ x: 0 }}
                        exit={{ x: xTranslation }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`fixed top-0 ${physSide === "right" ? "right-0" : "left-0"
                            } h-full w-[90%] max-w-[450px] bg-background shadow-2xl z-[70] flex flex-col`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h3 className="text-xl font-bold uppercase tracking-wider">{title}</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="hover:rotate-90 transition-transform duration-300"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 component-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
