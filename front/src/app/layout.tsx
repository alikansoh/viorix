import './globals.css';
import Navbar from './Components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' ,  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
