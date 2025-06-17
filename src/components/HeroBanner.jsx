import { useNavigate } from "react-router";


const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center relative bg-gradient-to-br from-green-900 via-green-800 to-green-700"
      style={{
        backgroundImage:
          "linear-gradient(rgba(27,58,27,0.85),rgba(27,58,27,0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-100 mb-6 drop-shadow-lg merinda">
          Embark on Your Next Jungle Adventure
        </h1>
        <p className="text-lg md:text-xl text-green-200 mb-8 font-medium merinda">
          Discover breathtaking destinations, guided by local experts. Book your
          dream tour and experience the wild like never before!
        </p>
        <button
          onClick={() => navigate("/packages")}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-green-900 font-bold text-lg shadow-lg transition-all duration-200 border-2 border-green-300 merinda"
        >
          Explore All Packages
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
