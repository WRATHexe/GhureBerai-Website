import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Theme"
      className={`
        ml-2 p-2 rounded-full border-2
        ${
          theme === "light"
            ? "border-black text-black hover:bg-black hover:text-white"
            : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-yellow-900"
        }
        transition-colors duration-200 shadow flex items-center justify-center
      `}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
