import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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

export default function PromoBannersGrid() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const banners: BannerItem[] = [
        {
            id: 1,
            badge: t('promoBanners.banner1.badge'),
            title: t('promoBanners.banner1.title'),
            buttonText: t('common.shopNow'),
            link: "/about",
            image: "https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/coffee-card.avif",
            bgColor: "#E5C849",
            circleColor: "rgba(17, 17, 17, 0.05)",
            textColor: "#164333",
        },
        {
            id: 2,
            badge: t('promoBanners.banner2.badge'),
            title: t('promoBanners.banner2.title'),
            buttonText: t('common.shopNow'),
            link: "/products",
            image: "https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/s%20(11).avif",
            bgColor: "#43aa5c",
            circleColor: "rgba(17, 17, 17, 0.1)",
            textColor: "#ffffff",
        },
        {
            id: 3,
            badge: t('promoBanners.banner3.badge'),
            title: t('promoBanners.banner3.title'),
            buttonText: t('common.shopNow'),
            link: "/categories",
            image: "https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/s%20(24).png",
            bgColor: "#164333",
            circleColor: "rgba(255, 255, 255, 0.05)",
            textColor: "#ffffff",
        },
    ];

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
                                    className={`absolute -top-14 w-44 h-44 rounded-full transition-transform duration-500 ease-out group-hover:scale-150 ${isRTL ? '-right-10' : '-left-10'
                                        }`}
                                    style={{ backgroundColor: banner.circleColor }}
                                />

                                {/* Content wrapper */}
                                <div className={`relative z-10 p-10 min-h-[200px] md:min-h-[240px] flex flex-col justify-center ${isRTL ? '-mr-6' : '-ml-6'
                                    }`}>
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
                                    <div className={`absolute top-[-20px] bottom-[-20px] w-[75%] overflow-hidden ${isRTL ? 'left-[-24px]' : 'right-[-24px]'
                                        }`}>
                                        <div className={`w-full h-full ${isRTL ? 'scale-x-[-1]' : ''}`}>
                                            <img
                                                src={banner.image}
                                                alt={banner.title}
                                                className={`w-full h-full object-cover transition-transform duration-500 ease-out scale-90 group-hover:scale-100 object-right`}
                                            /* Note: object-right is used for both because when flipped (scale-x-[-1]), 
                                               the 'visual' right side of the image (which is the original left) 
                                               is what we want to align to the 'visual' right of the container?? 
                                               No. 
                                               LTR: Image has product on the Right. object-right keeps product in view.
                                               RTL: We flip the image. Product is now on the Left.
                                                    The container is on the Left.
                                                    Inside the container, we want to anchor to the Left (where the product is).
                                                    BUT we flipped the container's coordinate system with scale-x-[-1]?
                                                    If we wrap with scale-x-[-1], 'right' inside becomes 'left' visually.
                                                    So sticking to 'object-right' inside a flipped container anchors to the visual Left?
                                                    Let's trace:
                                                    Normal: [ ... Product ] (Aligned Right)
                                                    Flipped: [ Product ... ] (Visual Left)
                                                    Inside Flipped Container:
                                                       Coordinate system is flipped X.
                                                       'right' is x-max. In inverted system, x-max is visual Left.
                                                       So 'object-right' should anchor to visual Left.
                                                       So keeping 'object-right' might be correct if we want to show the product part.
                                            */
                                            />
                                        </div>
                                    </div>

                                    {/* Shine effect overlay */}
                                    <div
                                        className={`absolute inset-0 w-1/2 h-full z-20 pointer-events-none opacity-0 group-hover:opacity-100 ${isRTL ? 'rtl-shine' : 'ltr-shine'
                                            }`}
                                        style={{
                                            background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)",
                                            transform: isRTL ? "skewX(25deg)" : "skewX(-25deg)",
                                            [isRTL ? 'right' : 'left']: '-75%',
                                            // Animation is handled by CSS classes below
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
          0% { left: -75%; }
          100% { left: 125%; }
        }
        @keyframes shine-rtl {
          0% { right: -75%; }
          100% { right: 125%; }
        }
        
        .group:hover .ltr-shine {
          animation: shine 0.75s ease-in-out forwards;
        }
        
        .group:hover .rtl-shine {
          animation: shine-rtl 0.75s ease-in-out forwards;
        }
      `}</style>
        </section>
    );
}
