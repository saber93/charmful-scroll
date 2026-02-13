import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Nike", logo: "✓" },
  { name: "Samsung", logo: "S" },
  { name: "Adidas", logo: "⚡" },
  { name: "Sony", logo: "🎵" },
  { name: "Puma", logo: "🐆" },
  { name: "LG", logo: "📺" },
  { name: "Canon", logo: "📷" },
  { name: "Dell", logo: "💻" },
  { name: "HP", logo: "🖨️" },
];

export default function BrandsCarousel() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t('brands.badge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('brands.title')}
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % brands.length) * 0.05 }}
              className="flex-shrink-0 mx-8 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-background rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0">
                <span className="text-4xl md:text-5xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {brand.logo}
                </span>
              </div>
              <p className="text-center mt-2 text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
