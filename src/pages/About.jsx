const About = () => {
  return (
    <section className="min-h-[60vh] py-16 px-4 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-emerald-950/80 rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <h2 className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-4 tracking-tight merinda">
          About GhureBerai
        </h2>
        <p className="text-lg text-emerald-800 dark:text-emerald-100 mb-4">
          GhureBerai is your trusted travel companion for discovering the
          wonders of Bangladesh and beyond. Our mission is to connect travelers
          with unforgettable experiences, expert guides, and seamless
          adventures.
        </p>
        <p className="text-md text-emerald-700 dark:text-emerald-200 mb-4">
          Whether you crave the thrill of the jungle, the serenity of the sea,
          or the culture of the cities, our curated packages and passionate team
          ensure every journey is safe, memorable, and inspiring.
        </p>
        <p className="text-md text-emerald-700 dark:text-emerald-200">
          Join us and explore with confidence. Your adventure starts here!
        </p>
      </div>
    </section>
  );
};

export default About;
