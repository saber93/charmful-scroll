import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function DealOfTheDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  const timeLeft = useCountdown(endDate);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with RTL Flip Support */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${isRTL ? 'scale-x-[-1]' : ''}`}
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/al-khalede.firebasestorage.app/o/1_01ff0cb0-b607-4fb7-8bbf-1cf0573a766a.jpg?alt=media&token=2549f4d4-7629-4c57-ad27-0b338d6e39f9')",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        {/* Content on the left side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
          >
            ⚡ {t('dealOfDay.badge')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('dealOfDay.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mb-6"
          >
            {t('dealOfDay.description')}
          </motion.p>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-xl">★</span>
              ))}
            </div>
            <span className="text-gray-500">{t('dealOfDay.reviews_text', { rating: 4.9, count: 2847 })}</span>
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-baseline gap-4 mb-8"
          >
            <span className="text-4xl font-bold text-primary">$299</span>
            <span className="text-2xl text-gray-400 line-through">$499</span>
            <Badge variant="destructive" className="text-sm">{t('dealOfDay.save', { amount: 200 })}</Badge>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-gray-600 mb-3">{t('dealOfDay.hurry')}</p>
            <div className="flex gap-3">
              {[
                { label: t('dealOfDay.timer.days'), value: timeLeft.days },
                { label: t('dealOfDay.timer.hours'), value: timeLeft.hours },
                { label: t('dealOfDay.timer.mins'), value: timeLeft.minutes },
                { label: t('dealOfDay.timer.secs'), value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-primary text-primary-foreground px-4 py-3 rounded-xl text-center min-w-[70px]"
                >
                  <div className="text-2xl font-bold">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs opacity-80">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t('common.addToCart')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
