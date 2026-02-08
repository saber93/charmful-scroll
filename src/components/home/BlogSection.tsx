import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    id: 1,
    title: "10 Sustainable Fashion Trends to Watch in 2024",
    excerpt: "Discover how eco-conscious choices are shaping the future of fashion and style.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
    category: "Fashion",
    date: "Feb 5, 2024",
    author: "Emma Wilson",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Smart Home Devices",
    excerpt: "Transform your living space with the latest in home automation technology.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
    category: "Tech",
    date: "Feb 3, 2024",
    author: "James Miller",
  },
  {
    id: 3,
    title: "Minimalist Living: Less is More",
    excerpt: "How decluttering your space can lead to a more peaceful and productive life.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&q=80",
    category: "Lifestyle",
    date: "Feb 1, 2024",
    author: "Sophie Clark",
  },
];

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

export default function BlogSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest News & Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our experts
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Read More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-medium group/link"
              >
                <span className="relative">
                  Read More
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
