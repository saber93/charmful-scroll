import { motion } from "framer-motion";
import { useState } from "react";
import { Play, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureBlock {
    title: string;
    description: string;
}

const features: FeatureBlock[] = [
    {
        title: "The Best Farmers",
        description: "Lorem ipsum dolor sited amet consectetur notted.",
    },
    {
        title: "The Best Coder",
        description: "Lorem ipsum dolor sited amet consectetur notted.",
    },
];

export default function WelcomeSection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const videoId = "Qyd6ZDPWPbw";

    return (
        <>
            <section className="relative py-16 lg:py-24 overflow-x-clip">
                {/* Right decorative background shape */}
                <img
                    src="/images/welcome-right-bg-shape.png"
                    alt="Decorative background"
                    className="absolute right-0 top-[300px] w-[695px] h-[893px] pointer-events-none opacity-30 object-contain object-right"
                />

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Images */}
                        <div className="relative pl-8 md:pl-12 lg:pl-0">
                            <div className="relative pb-16 pr-12 lg:pr-16">
                                {/* Decorative green background shape */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute -left-14 md:-left-8 lg:-left-20 bottom-8 w-[300px] md:w-[350px] lg:w-[400px] h-[300px] md:h-[350px] lg:h-[400px] pointer-events-none z-0"
                                >
                                    {/* Replace the src below with your own PNG image */}
                                    <img
                                        src="/images/welcome-bg-shape.png"
                                        alt="Decorative background shape"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>

                                {/* Large Circular Image */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="relative z-10"
                                >
                                    <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                                            alt="Woman with fresh vegetables"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Yellow Play Button */}
                                    <motion.button
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        onClick={() => setIsVideoOpen(true)}
                                        className="absolute -left-3 lg:-left-2 top-[calc(20%+16px)] z-20 group"
                                    >
                                        <div className="relative w-24 h-20 lg:w-32 lg:h-28 bg-[#E5C849] rounded-[10px] rounded-bl-none flex items-center justify-center shadow-lg hover:bg-[#d4b83a] transition-colors cursor-pointer">
                                            <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white fill-white" />
                                            {/* Triangle decoration */}
                                            <div
                                                className="absolute left-0 -bottom-3 w-0 h-0"
                                                style={{
                                                    borderLeft: "15px solid transparent",
                                                    borderTop: "15px solid #E5C849",
                                                }}
                                            />
                                        </div>
                                    </motion.button>

                                    {/* Small Circular Image - overlapping bottom-right of big circle */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.3 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="absolute -right-2 -bottom-2 lg:-right-4 lg:-bottom-4 z-20"
                                    >
                                        <div className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                            <img
                                                src="https://images.unsplash.com/photo-1546548970-71785318a17b?w=300&q=80"
                                                alt="Fresh fruit smoothie"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="lg:pl-8"
                        >
                            {/* Subtitle */}
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-[#43aa5c] font-medium text-lg italic"
                                style={{ fontFamily: "'Caveat', cursive" }}
                            >
                                Welcome to Fesho
                            </motion.span>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mt-2 leading-tight"
                            >
                                Be healthy & eat only pure organic food
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-gray-600 mt-6 leading-relaxed"
                            >
                                Kalathemes is a dedicated team of designers and developers providing top-notch
                                Shopify themes for e-commerce businesses. Their user-friendly designs and
                                cutting-edge features help store owners easily set up and customize their online stores
                            </motion.p>

                            {/* Feature Blocks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                                        className="flex flex-col"
                                    >
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#E5C849]" />
                                            <h5 className="font-bold text-gray-900">{feature.title}</h5>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-10"
                            >
                                <Button
                                    className="bg-[#E5C849] hover:bg-[#d4b83a] text-gray-900 font-semibold px-8 py-6 text-base uppercase tracking-wide rounded-md"
                                >
                                    Discover More
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Video Popup Modal */}
            {isVideoOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setIsVideoOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title="Video"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Google Fonts for Caveat */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
      `}</style>
        </>
    );
}
