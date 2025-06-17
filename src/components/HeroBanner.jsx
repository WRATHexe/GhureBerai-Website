// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full min-h-[65vh] flex flex-col items-center justify-center text-center relative overflow-hidden
      bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-50
      dark:from-emerald-900 dark:via-emerald-950 dark:to-emerald-950"
      style={{
        backgroundImage:
          "linear-gradient(rgba(16,185,129,0.45),rgba(6,95,70,0.55)), url('https://i.postimg.cc/59m3h4d0/Tour-Buzz-Banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative leaf SVGs */}
      <svg
        className="absolute left-0 top-0 w-40 h-40 opacity-15 -z-0"
        viewBox="0 0 100 100"
      >
        <ellipse cx="50" cy="50" rx="40" ry="20" fill="#bbf7d0" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-40 h-40 opacity-10 -z-0"
        viewBox="0 0 100 100"
      >
        <ellipse cx="50" cy="50" rx="40" ry="20" fill="#34d399" />
      </svg>
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg merinda tracking-wide"
        >
          Embark on Your Next Jungle Adventure
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl text-emerald-100 mb-8 font-medium merinda"
        >
          Discover breathtaking destinations, guided by local experts.
          <br />
          Book your dream tour and experience the wild like never before!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={() => navigate("/packages")}
          className="px-10 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-lg shadow-xl transition-all duration-200 border-2 border-emerald-300 merinda"
        >
          Explore All Packages
        </motion.button>
      </div>
    </section>
  );
};

export default HeroBanner;
