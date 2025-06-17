import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 w-full">
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo & Address */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <img
              src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
              alt="TourBuzz Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-xl">TourBuzz</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-emerald-200">
            123, Gulshan Avenue
            <br />
            Dhaka, Bangladesh
          </p>
        </div>
        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="flex flex-col gap-1 items-center md:items-start">
            <li>
              <a href="/terms" className="link link-hover">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="link link-hover">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/about" className="link link-hover">
                About Us
              </a>
            </li>
          </ul>
        </div>
        {/* Social */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-5 justify-center md:justify-end">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#1877f3] transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#1da1f2] transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#e4405f] transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-base-300 text-sm">
        &copy; {new Date().getFullYear()} GhureBerai. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
