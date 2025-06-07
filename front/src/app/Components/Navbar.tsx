'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      <div className="relative flex items-center justify-between md:justify-end h-30 px-4 md:px-8">
        {/* Logo: Centered absolutely on mobile, static left on desktop */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:ml-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Viorix Logo"
              className="w-25 h-25  md:w-30 md:h-30"
              priority
              width={96}
              height={96}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-[#007bff] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-4 py-2 bg-[#0047AB] text-white rounded hover:bg-[#4A5568] transition"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button - Right aligned */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden text-center px-4 pb-4 bg-white">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-[#007bff] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block mt-2 px-1 py-2 text-center md:tex6 bg-[#0047AB] text-white rounded hover:bg-[#4A5568] transition"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
