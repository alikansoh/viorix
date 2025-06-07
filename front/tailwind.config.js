// tailwind.config.js
const config = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      // Make sure to add any other directories where you use Tailwind classes
    ],
    theme: {
      extend: {
        fontFamily: {
          // Renamed to 'inter' for common convention, but 'Intere' works too.
          // Ensure you have '--font-inter' CSS variable defined or import the font.
          inter: ['var(--font-inter)', 'sans-serif'],
        },
        screens: {
          // Defining a custom breakpoint with a 'max-width'.
          // This means `mobile:` utility classes will apply *only* when the screen width
          // is 639px or less.
          //
          // Important Note on Tailwind's Mobile-First Approach:
          // By default, Tailwind uses `min-width` breakpoints (e.g., `sm:`, `md:`).
          // This means styles without a breakpoint apply to all screen sizes,
          // and styles with `sm:` apply from 640px upwards.
          //
          // While defining a `max-width` breakpoint like 'mobile' is valid,
          // it's less common for core responsive design in Tailwind. Often, for mobile-only
          // styles, you'd apply the style without a breakpoint and then override it
          // for larger screens (e.g., `text-sm md:text-base`).
          'mobile': { 'max': '639px' },
          // Example of a typical min-width custom screen if you want one:
          // 'tablet': '768px',
        },
      },
    },
    
    plugins: [],
  };
  
  export default config;