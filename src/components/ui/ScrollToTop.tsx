"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Nach oben scrollen"
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/80 text-white backdrop-blur-sm transition-all duration-300 hover:border-[#B91C1C] hover:text-[#B91C1C] md:h-12 md:w-12 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
    </button>
  );
}
