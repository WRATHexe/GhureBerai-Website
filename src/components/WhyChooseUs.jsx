// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: "spring" },
  }),
};

const WhyChooseUs = () => (
  <section className="py-16 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-800 transition-colors duration-300">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 dark:text-emerald-100 mb-10">
        Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "🌿",
            title: "Expert Local Guides",
            desc: "Our guides are experienced locals who know the jungle inside out, ensuring your safety and adventure.",
          },
          {
            icon: "🚌",
            title: "Comfortable Journeys",
            desc: "Travel in comfort with our well-organized tours, modern transport, and carefully selected accommodations.",
          },
          {
            icon: "🌎",
            title: "Eco-Friendly Adventures",
            desc: "We are committed to sustainable tourism, preserving nature and supporting local communities.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white bg-opacity-90 dark:bg-emerald-950 dark:bg-opacity-80 rounded-2xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-800 flex flex-col items-center hover:shadow-emerald-300 dark:hover:shadow-emerald-900 transition"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
            variants={cardVariants}
          >
            <span className="text-5xl mb-4">{item.icon}</span>
            <h3 className="font-bold text-xl text-emerald-800 dark:text-emerald-100 mb-2">
              {item.title}
            </h3>
            <p className="text-emerald-700 dark:text-emerald-200">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
