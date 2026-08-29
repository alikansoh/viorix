"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

/* WhatsApp Icon Component (inline SVG) */
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function FloatingButtons() {
  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 floating-btn-group">
        {/* Get Free Quote Button — links to the Start Your Project page */}
        <div className="floating-btn-wrapper relative group">
          <Link href="/web-quote">
            <button
              className="relative inline-flex items-center gap-2 bg-gradient-to-r cursor-pointer from-[#00BFFF] via-[#0EA5E9] to-[#1B365D] text-white font-semibold px-3 py-2 rounded-full shadow-[0_6px_20px_rgba(0,191,255,0.2)] hover:shadow-[0_10px_28px_rgba(0,191,255,0.3)] transition-all duration-200 hover:scale-103 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/25 overflow-hidden border border-white/15 backdrop-blur-sm gradient-animate group"
              aria-label="Start your project"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-[#0EA5E9] to-[#1B365D] opacity-0 group-hover:opacity-70 blur-lg transition-all duration-200" />
              <div className="shimmer-effect" aria-hidden />
              <div className="relative flex items-center justify-center w-7 h-7 bg-white/12 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-all duration-150 group-hover:rotate-4">
                <FileText className="w-3.5 h-3.5 drop-shadow-sm" />
              </div>

              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            </button>
          </Link>

          <div className="floating-btn-tooltip absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap tooltip-md">
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-lg border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Start your project
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 bg-gradient-to-br from-gray-900 to-gray-800 border-r border-t border-white/10" />
            </div>
          </div>
        </div>

        {/* WhatsApp Button (notification dot removed and smaller) */}
        <div className="floating-btn-wrapper relative group">
          <a
            href="https://wa.me/447464485026"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#25D366] via-[#20C65A] to-[#128C7E] text-white rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.32)] transition-all duration-200 hover:scale-103 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/25 border-2 border-white/15 overflow-hidden float-animation group gradient-animate"
            aria-label="Contact us on WhatsApp"
          >
            <div className="pulse-animation absolute inset-0 rounded-full" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-85 blur-xl transition-all duration-200 scale-120" />
            <WhatsAppIcon className="relative w-5 h-5 z-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)] group-hover:scale-104 transition-transform duration-150" />
            {/* shimmer kept */}
            <div className="shimmer-effect" aria-hidden />
            <div className="absolute inset-0 rounded-full border-2 border-white/12 group-hover:border-white/25 transition-all duration-150" />
          </a>

          <div className="floating-btn-tooltip absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap tooltip-md">
            <div className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg border border-white/20">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Chat with us now!</span>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] border-r border-t border-white/20" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Smaller / more compact styles */

        @keyframes pulse-ring {
          0% { transform: scale(0.97); box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          50% { transform: scale(1); box-shadow: 0 0 0 6px rgba(37,211,102,0); }
          100% { transform: scale(0.97); box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 0.85; }
          100% { transform: translateX(200%) rotate(45deg); opacity: 0; }
        }
        @keyframes gradient-shift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .pulse-animation { animation: pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite; }
        .float-animation { animation: float 3s ease-in-out infinite; }
        .gradient-animate { background-size: 200% 200%; animation: gradient-shift 4s ease infinite; }

        .floating-btn-group { transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1); }
        .floating-btn-tooltip {
          opacity: 0;
          transform: translateX(6px);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .floating-btn-wrapper:hover .floating-btn-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        .shimmer-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          transform: rotate(45deg) translateX(-120%);
          animation: shimmer 2.2s infinite;
          pointer-events: none;
        }

        /* Tooltips visible on md and up */
        .tooltip-md { display: none; }
        @media (min-width: 768px) {
          .tooltip-md { display: block; }
        }

        /* Mobile / small screens: stack at bottom-right but even smaller spacing */
        @media (max-width: 640px) {
          .floating-btn-group {
            bottom: 0.6rem;
            right: 0.6rem;
            gap: 0.4rem;
          }
          .floating-btn-group a { width: 2.75rem; height: 2.75rem; }
          .floating-btn-group button { padding: 0.45rem 0.6rem; font-size: 0.75rem; gap: 0.4rem; }
          .tooltip-md { display: none !important; }
        }

        @media (max-width: 420px) {
          .floating-btn-group { right: 0.4rem; bottom: 0.4rem; gap: 0.3rem; }
        }
      `}</style>
    </>
  );
}