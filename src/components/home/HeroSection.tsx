import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// Direction-aware slide animation variants
const getSlideFromSide = (isRTL: boolean) => ({
  hidden: { opacity: 0, x: isRTL ? 2000 : -2000 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
});

const getSlideFromSideNoFade = (isRTL: boolean) => ({
  hidden: { opacity: 1, x: isRTL ? 2000 : -2000 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
});

const slideInDown = {
  hidden: { opacity: 0, y: -80 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 2.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="relative isolate h-[280px] md:h-[400px] lg:h-[700px] overflow-visible pt-4 lg:pt-12 bg-transparent">
      <div className="absolute inset-0 z-0 bg-cream pointer-events-none opacity-0" />

      {/* 
        STACKING ORDER:
        1. Background Texture (z-[1])
        2. Wash Layer (z-[5]) - Prevents PNGs from looking "dirty"
        3. Decorative Patterns (z-[10])
        4. Hero Content/Images (z-[20])
      */}

      {/* BACKGROUND IMAGE (Texture Overlay) */}
      <div
        className="absolute inset-0 z-[1] opacity-100 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/al-khalede.firebasestorage.app/o/fesho_sl_bg1_1944x.jpg?alt=media&token=3e2b8aaa-194f-4491-8ee6-5cb67ef60aba')",
        }}
      />



      {/* Top Decorative Image - fesho-pattern-1 (Left/Center) */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/al-khalede.firebasestorage.app/o/fesho-pattern-1.png?alt=media&token=86cb4f8d-7c85-458b-90e4-ca677936a281"
        alt=""
        className="absolute left-0 top-0 w-full h-[120px] lg:h-[160px] object-cover object-top z-[10] pointer-events-none opacity-100"
      />



      <div className="container mx-auto px-4 h-full relative z-[20]">
        <div className="flex flex-row items-center justify-between h-full pt-10 pb-0 lg:pt-32 lg:pb-0 -translate-y-48 lg:-translate-y-[160px]">
          <motion.div
            initial="hidden"
            animate="visible"
            style={{ y: 150 }}
            className={`w-1/2 lg:w-1/2 z-[20] ${isRTL ? "text-right" : "text-left"} mb-12 lg:mb-0 relative top-8 lg:top-[-80px]`}
          >
            {/* Product Image 3 (Accent Badge) - slides from TOP above text */}
            <motion.div
              variants={slideInDown}
              custom={0.2}
              className="lg:mb-10 inline-block mt-6 lg:mt-0 lg:-translate-x-[100px] lg:-translate-y-[24px]"
            >
              <img
                src="https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/silde-down.avif"
                alt={t("hero.alt.organicBadge")}
                className="w-12 h-12 lg:w-32 lg:h-32 object-contain"
              />
            </motion.div>

            <motion.span
              variants={getSlideFromSide(isRTL)}
              custom={0.4}
              className="block text-primary font-medium text-xs md:text-base lg:text-xl mb-1 lg:mb-4 italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("hero.slide1.badge")}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              variants={getSlideFromSide(isRTL)}
              custom={0.6}
              className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-primary mb-3 lg:mb-6 whitespace-pre-line leading-tight lg:!leading-[1.35]"
            >
              {t("hero.slide1.title")}
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              variants={getSlideFromSide(isRTL)}
              custom={0.8}
              className={`inline-flex items-center gap-4 ${isRTL ? "float-right" : ""}`}
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 py-2 text-xs md:px-6 md:py-4 md:text-sm lg:px-8 lg:py-6 lg:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t("hero.slide1.cta")}
              </Button>

              {/* Curved Arrow (static, no animation) */}
              <div className="hidden lg:block text-primary">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-primary">
                  <path d="M5 35 Q30 5 55 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M48 15 L55 20 L48 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Product Images */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="w-1/2 lg:w-1/2 relative z-[20] h-[250px] md:h-[350px] lg:h-[500px] xl:h-[600px] translate-y-28 lg:translate-y-0 lg:-translate-x-[100px]"
          >
            {/* Main Product Image 1 - slides from FAR LEFT NO FADE */}
            <motion.div
              variants={getSlideFromSideNoFade(isRTL)}
              custom={0.5}
              className="absolute right-[-30%] lg:right-[-20%] top-1/3 lg:top-[20%] w-[263px] h-[263px] md:w-[350px] md:h-[350px] lg:w-[640px] lg:h-[640px] z-[20]"
            >
              <img
                src="https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/main.avif"
                alt={t("hero.alt.vegetables")}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Product Image 2 (Bottle) - Moved DOWN for mobile */}
            <motion.div
              variants={getSlideFromSide(isRTL)}
              custom={0.7}
              style={{ y: 100 }}
              className="absolute left-[2%] top-[10%] lg:left-[16%] lg:top-[15%] z-[20]"
            >
              <img
                src="https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/bottle.avif"
                alt={t("hero.alt.bottle")}
                className="w-[44px] h-[160px] lg:w-[110px] lg:h-[370px] object-cover"
              />
            </motion.div>

            {/* Additional product images - Bottom Image */}
            <motion.div
              variants={getSlideFromSide(isRTL)}
              custom={0.9}
              style={{ y: 150 }}
              className="absolute right-[30%] top-[36%] lg:left-[5%] lg:bottom-[16%] lg:top-auto z-[20]"
            >
              <img
                src="https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/bottom.avif"
                alt={t("hero.alt.flowers")}
                className="w-[144px] h-[70px] lg:w-[320px] lg:h-[140px] object-cover"
              />
            </motion.div>

            {/* Coffee (Backwards) */}
            <motion.div
              variants={getSlideFromSideNoFade(isRTL)}
              custom={1.0}
              className="absolute left-[15.5%] top-[55%] lg:left-[25%] lg:top-[36%] z-[10]"
            >
              <img
                src="https://vkwslyojzssrpnbjoavw.supabase.co/storage/v1/object/public/media/coffee.avif"
                alt={t("hero.alt.coffee")}
                className="w-[76px] h-[133px] lg:w-[193px] lg:h-[308px] object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-20 z-[2] pointer-events-none">
        <svg viewBox="0 0 1440 70" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,70 L1440,70 L1440,40 C1200,10 900,0 720,20 C540,40 240,10 0,30 L0,70 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] hidden lg:block">
        <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
