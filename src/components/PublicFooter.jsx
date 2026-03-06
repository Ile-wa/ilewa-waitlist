import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import IlewaLogo from "@assets/ilewa-logo.svg";

const PublicFooter = ({ hideCta = false }) => {
  const year = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Sitemap", href: "#" },
  ];

  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img
              src={IlewaLogo}
              alt="Ilewa"
              className="h-8 mb-6 brightness-0 invert"
            />
            <p className="text-blue-50/80 text-sm leading-relaxed mb-6">
              Ilewa is revolutionizing property rental in Lagos with verified
              listings, direct connections, and secure transactions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-50/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-50/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-50/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-blue-50/60 text-xs">
              &copy; {year} Ilewa. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white/70 hover:text-white"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white/70 hover:text-white"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white/70 hover:text-white"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white/70 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
