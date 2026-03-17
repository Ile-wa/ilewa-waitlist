import { ArrowUp } from "lucide-react";
import IlewaLogo from "@assets/ilewa-logo.svg";

const PublicFooter = ({ hideCta = false }) => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <img
              src={IlewaLogo}
              alt="Ilewa"
              className="h-6 brightness-0 invert"
            />
            <p className="text-blue-50/60 text-xs">
              &copy; {year} Ilewa. All rights reserved.
            </p>
            <a href="https://maps.google.com/?q=37+Aba+Johnson+Street,+Ikeja,+Lagos" target="_blank" rel="noopener noreferrer" className="text-blue-50/60 text-xs mt-1 hover:text-white transition-colors">
              37 Aba Johnson Street, Ikeja, Lagos
            </a>
            <a href="tel:+2348038277316" className="text-blue-50/60 text-xs mt-1 hover:text-white transition-colors">
              +2348038277316
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-blue-50/70 hover:text-white transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
