import Featured from "../components/featured";
import HeroBanner from "../components/HeroBanner";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => (
  <div className="bg-emerald-50 dark:bg-emerald-950 transition-colors duration-300 w-full">
    <HeroBanner />
    <Featured />
    <WhyChooseUs />
    <Testimonials />
  </div>
);

export default Home;
