import Featured from "../components/featured";
import HeroBanner from "../components/HeroBanner";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Featured />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
