import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function HotDealProducts() {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      name: t('hotDeals.products.1'),
      price: 79,
      originalPrice: 129,
      rating: 4.8,
      reviews: 1240,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
      discount: 39,
    },
    {
      id: 2,
      name: t('hotDeals.products.2'),
      price: 35,
      originalPrice: 55,
      rating: 4.6,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      discount: 36,
    },
    {
      id: 3,
      name: t('hotDeals.products.3'),
      price: 149,
      originalPrice: 199,
      rating: 4.9,
      reviews: 2103,
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80",
      discount: 25,
    },
    {
      id: 4,
      name: t('hotDeals.products.4'),
      price: 89,
      originalPrice: 150,
      rating: 4.7,
      reviews: 654,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
      discount: 41,
    },
    {
      id: 5,
      name: t('hotDeals.products.5'),
      price: 49,
      originalPrice: 79,
      rating: 4.5,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80",
      discount: 38,
    },
    {
      id: 6,
      name: t('hotDeals.products.6'),
      price: 28,
      originalPrice: 45,
      rating: 4.4,
      reviews: 432,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
      discount: 38,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1 bg-accent/20 text-accent-foreground text-sm font-medium rounded-full mb-4">
              {t('hotDeals.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('hotDeals.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('hotDeals.description')}
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {t('hotDeals.viewAll')}
          </Button>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Shine Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine" />
                </div>

                {/* Discount Badge */}
                <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                  -{product.discount}%
                </Badge>

                {/* Quick Actions - Slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-background rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 text-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 text-accent-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-background rounded-full flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 text-foreground" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-primary">${product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
