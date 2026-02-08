import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Vegetables",
    description: "When nothing prevents our to we like best be.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    bgColor: "#43aa5c",
  },
  {
    id: 2,
    name: "Fresh Fruits",
    description: "When nothing prevents our to we like best be.",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80",
    bgColor: "#c23a4f",
  },
  {
    id: 3,
    name: "Spices",
    description: "When nothing prevents our to we like best be.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    bgColor: "#e5b848",
  },
  {
    id: 4,
    name: "Dried Products",
    description: "When nothing prevents our to we like best be.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
    bgColor: "#9e7b5a",
  },
];

export default function CategoryGrid() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background pattern (left side decorative) */}
      <img
        src="/images/category-bg-pattern.png"
        alt=""
        className="absolute left-0 top-0 h-full w-auto pointer-events-none opacity-20"
      />

      {/* Dark green bottom bar */}
      <div className="absolute left-0 bottom-0 h-[300px] w-full bg-[#1b4332] z-0" />

      {/* Wave overlay at bottom */}
      <img
        src="/images/category-wave.png"
        alt=""
        className="absolute left-0 -bottom-8 w-full h-16 object-cover z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <span
            className="text-[#43aa5c] text-xl italic"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Our Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What we're offering
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href="#"
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group"
            >
              {/* Card with hover lift effect - overflow-hidden clips the brush stroke at top */}
              <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] p-8 pt-10 text-center transition-all duration-300 group-hover:-translate-y-5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] overflow-hidden">
                {/* Image container - positioned relative for brush stroke positioning */}
                <div className="relative w-[180px] h-[180px] mx-auto mb-6">
                  {/* Brush stroke PNG background - positioned to extend above and be clipped by card */}
                  <img
                    src={`/images/category-brush-${category.id}.png`}
                    alt=""
                    className="absolute left-1/2 -translate-x-1/2 w-[180px] h-auto pointer-events-none"
                    style={{ bottom: '24px', maxHeight: '250px' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Fallback colored circle */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${category.bgColor} 0%, ${category.bgColor}dd 100%)`,
                    }}
                  />

                  {/* Circular image with hover rotate+zoom */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-[1.2]"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Google Fonts for Caveat */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}
