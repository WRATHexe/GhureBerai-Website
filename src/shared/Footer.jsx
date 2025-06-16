import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Address */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
              alt="GhureBerai Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-xl">TourBuzz</span>
          </div>
          <p>
            123, Gulshan Avenue
            <br />
            Dhaka, Bangladesh
          </p>
        </div>
        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul>
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
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-base-300">
        &copy; {new Date().getFullYear()} GhureBerai. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
