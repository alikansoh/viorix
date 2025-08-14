import './globals.css';
import Navbar from './Components/Navbar';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.viorix.co.uk'), // <-- Add this
  title: 'Viorix Digital Solutions - Web & Mobile Development',
  description:
    'Viorix Digital Solutions provides professional web development, mobile apps, e-commerce, digital marketing, SEO, and UI/UX design to scale your business.',
  keywords:
    'Web Development, Mobile Apps, E-commerce, Digital Marketing, SEO, UI/UX Design, Software Solutions',
  authors: [{ name: 'Viorix Digital Solutions' }],
  openGraph: {
    title: 'Viorix Digital Solutions - Web & Mobile Development',
    description:
      'Professional solutions in web development, mobile apps, e-commerce, digital marketing, SEO, and UI/UX design.',
    url: '/',
    siteName: 'Viorix Digital Solutions',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Viorix Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viorix Digital Solutions',
    description:
      'Professional solutions in web development, mobile apps, e-commerce, digital marketing, SEO, and UI/UX design.',
    images: ['/og-image.png'],
    site: '@ViorixDigital', // optional
    creator: '@ViorixDigital', // optional
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
