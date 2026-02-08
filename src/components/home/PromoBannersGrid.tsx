import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BannerItem {
    id: number;
    badge: string;
    title: string;
    buttonText: string;
    link: string;
    image: string;
    bgColor: string;
    circleColor: string;
    textColor: string;
}

const banners: BannerItem[] = [
    {
        id: 1,
        badge: "100% Organic",
        title: "Quality Organic\nFood Store",
        buttonText: "SHOP NOW",
        link: "/about",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
        bgColor: "#E5C849", // Yellow
        circleColor: "rgba(17, 17, 17, 0.05)",
        textColor: "#164333",
    },
    {
        id: 2,
        badge: "100% Organic",
        title: "Healthy Products\nEveryday",
        buttonText: "SHOP NOW",
        link: "/products",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
        bgColor: "#43aa5c", // Green
        circleColor: "rgba(17, 17, 17, 0.1)",
        textColor: "#ffffff",
    },
    {
        id: 3,
        badge: "100% Organic",
        title: "Pure Natural\nProducts",
        buttonText: "SHOP NOW",
        link: "/categories",
        image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80",
        bgColor: "#164333", // Dark teal
        circleColor: "rgba(255, 255, 255, 0.05)",
        textColor: "#ffffff",
    },
];

export default function PromoBannersGrid() {
    return (
        <section className="py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banners.map((banner, index) => (
                        <motion.div
                            key={banner.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group cursor-pointer"
                        >
                            <div
                                className="relative overflow-hidden rounded-xl"
                                style={{ backgroundColor: banner.bgColor }}
                            >
                                {/* Animated circle decoration on hover */}
                                <div
                                    className="absolute -left-10 -top-14 w-44 h-44 rounded-full transition-transform duration-500 ease-out group-hover:scale-150"
                                    style={{ backgroundColor: banner.circleColor }}
                                />

                                {/* Content wrapper */}
                                <div className="relative z-10 p-10 min-h-[200px] md:min-h-[240px] flex flex-col justify-center">
                                    {/* Badge */}
                                    <span
                                        className="text-sm font-bold mb-3"
                                        style={{ color: banner.textColor }}
                                    >
                                        {banner.badge}
                                    </span>

                                    {/* Title */}
                                    <h3
                                        className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight whitespace-pre-line mb-4"
                                        style={{
                                            color: banner.textColor,
                                            fontFamily: "'Caveat', cursive",
                                        }}
                                    >
                                        {banner.title}
                                    </h3>

                                    {/* Button with fill animation */}
                                    <div className="mt-2">
                                        <Button
                                            variant="secondary"
                                            className="relative overflow-hidden bg-white text-gray-800 font-semibold px-8 py-3 h-auto rounded-lg border-0 transition-all duration-300 group/btn"
                                            style={{
                                                "--btn-hover-bg": banner.id === 2 ? "#E5C849" : "#43aa5c",
                                            } as React.CSSProperties}
                                        >
                                            {/* Button background fill animation */}
                                            <span
                                                className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover/btn:w-full"
                                                style={{
                                                    backgroundColor: banner.id === 2 ? "#E5C849" : "#43aa5c",
                                                }}
                                            />
                                            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                                                {banner.buttonText}
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Background image with shine effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {/* Image with zoom on hover */}
                                    <div className="absolute right-0 top-0 bottom-0 w-3/5 overflow-hidden">
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Shine effect overlay */}
                                    <div
                                        className="absolute inset-0 -left-[75%] w-1/2 h-full z-20 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-shine"
                                        style={{
                                            background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)",
                                            transform: "skewX(-25deg)",
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Add shine animation keyframes */}
            <style>{`
        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
        .group:hover .group-hover\\:animate-shine {
          animation: shine 0.75s ease-in-out forwards;
        }
      `}</style>
        </section>
    );
}
