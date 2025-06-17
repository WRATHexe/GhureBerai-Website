const Testimonials = () => (
  <section className="py-16 bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 dark:from-[#152422] dark:via-[#184a4e] dark:to-[#1b2c28] transition-colors duration-300">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-10 merinda">
        What Our Travelers Say
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Testimonial 1 */}
        <div className="relative bg-white/90 dark:bg-emerald-950/80 rounded-2xl p-8 text-emerald-900 dark:text-emerald-100 shadow-2xl border-2 border-emerald-300 dark:border-emerald-800 flex flex-col items-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Ayesha Rahman"
            className="w-20 h-20 rounded-full border-4 border-emerald-400 dark:border-emerald-600 object-cover mb-4 shadow-lg"
          />
          <svg
            className="absolute top-6 left-6 w-8 h-8 text-emerald-300 dark:text-emerald-700 opacity-40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.17 6.17A7 7 0 0 0 2 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-2.83-5.83ZM19.17 6.17A7 7 0 0 0 14 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-2.83-5.83Z" />
          </svg>
          <p className="italic mb-4 text-lg leading-relaxed">
            "The jungle tour was a life-changing experience! Our guide was
            knowledgeable and made us feel safe throughout."
          </p>
          <div className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
            Ayesha Rahman
          </div>
          <div className="text-emerald-500 dark:text-emerald-400 text-sm">
            Dhaka, Bangladesh
          </div>
        </div>
        {/* Testimonial 2 */}
        <div className="relative bg-white/90 dark:bg-emerald-950/80 rounded-2xl p-8 text-emerald-900 dark:text-emerald-100 shadow-2xl border-2 border-emerald-300 dark:border-emerald-800 flex flex-col items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Tanvir Alam"
            className="w-20 h-20 rounded-full border-4 border-emerald-400 dark:border-emerald-600 object-cover mb-4 shadow-lg"
          />
          <svg
            className="absolute top-6 left-6 w-8 h-8 text-emerald-300 dark:text-emerald-700 opacity-40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.17 6.17A7 7 0 0 0 2 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-2.83-5.83ZM19.17 6.17A7 7 0 0 0 14 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-2.83-5.83Z" />
          </svg>
          <p className="italic mb-4 text-lg leading-relaxed">
            "Loved every moment! The team took care of everything, and the
            scenery was breathtaking. Highly recommended."
          </p>
          <div className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
            Tanvir Alam
          </div>
          <div className="text-emerald-500 dark:text-emerald-400 text-sm">
            Chattogram, Bangladesh
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
