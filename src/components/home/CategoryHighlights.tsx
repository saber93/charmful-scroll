import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function CategoryHighlights() {
  const { t } = useTranslation();

  const highlights = [
    {
      id: 1,
      title: t('categoryHighlights.title1'),
      subtitle: t('categoryHighlights.subtitle1'),
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    },
    {
      id: 2,
      title: t('categoryHighlights.title2'),
      subtitle: t('categoryHighlights.subtitle2'),
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    },
    {
      id: 3,
      title: t('categoryHighlights.title3'),
      subtitle: t('categoryHighlights.subtitle3'),
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.h3
                  className="text-2xl font-bold text-primary-foreground mb-1"
                >
                  {item.title}
                </motion.h3>
                <p className="text-primary-foreground/80 mb-4">{item.subtitle}</p>
                <Button
                  variant="secondary"
                  className="w-fit group/btn bg-background/90 hover:bg-background text-foreground"
                >
                  {t('common.shopNow')}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
