const WhyChooseUs = () => (
  <section className="py-14 bg-green-800 bg-opacity-90">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-extrabold text-green-100 mb-6 merinda">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-green-900 rounded-xl p-6 text-green-100 shadow-lg">
          <span className="text-4xl mb-2 block">🌿</span>
          <h3 className="font-bold text-xl mb-2">Expert Local Guides</h3>
          <p>Our guides are experienced locals who know the jungle inside out, ensuring your safety and adventure.</p>
        </div>
        <div className="bg-green-900 rounded-xl p-6 text-green-100 shadow-lg">
          <span className="text-4xl mb-2 block">🚌</span>
          <h3 className="font-bold text-xl mb-2">Comfortable Journeys</h3>
          <p>Travel in comfort with our well-organized tours, modern transport, and carefully selected accommodations.</p>
        </div>
        <div className="bg-green-900 rounded-xl p-6 text-green-100 shadow-lg">
          <span className="text-4xl mb-2 block">🌎</span>
          <h3 className="font-bold text-xl mb-2">Eco-Friendly Adventures</h3>
          <p>We are committed to sustainable tourism, preserving nature and supporting local communities.</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;