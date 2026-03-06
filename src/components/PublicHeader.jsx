import { useState, useEffect } from "react";
import Logo from "@assets/v1logo.svg";
import WhiteLogo from "@assets/v1whitelogo.svg";
import { Menu, X } from "lucide-react";

const PublicHeader = ({ transparent = false, minimal = false, cta = null }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isTransparent = transparent && !scrolled;

  return (
    <header
      className={`${transparent ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white border-b border-border-light"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src={isTransparent ? WhiteLogo : Logo}
            alt="Ilewa Logo"
            className="h-[22px] sm:h-[26px]"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {minimal && cta ? (
            <a
              href={cta.href || "#"}
              onClick={cta.onClick}
              className={`px-5 py-2.5 rounded-[8px] font-medium text-sm transition-all ${
                isTransparent
                  ? "bg-white/15 backdrop-blur-[10px] text-white border border-white/30 hover:bg-white/25"
                  : "bg-brand-blue hover:bg-[#4a6dcc] text-white border border-gray-300/50"
              }`}
            >
              {cta.label}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
