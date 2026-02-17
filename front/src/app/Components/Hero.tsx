"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Award,
  Headphones,
  Star,
  Code,
  Smartphone,
  TrendingUp,
  Zap,
  CheckCircle,
  Globe,
  Briefcase,
} from "lucide-react";

/* Dynamically import TypeAnimation so it isn't in the initial bundle */
const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  { ssr: false }
);

/* AnimatedNumber: safe requestAnimationFrame usage with cleanup + formatting */
const AnimatedNumber = ({
  target,
  suffix = "",
  duration = 2000,
  shouldStart = false,
  ariaLabel,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  shouldStart?: boolean;
  ariaLabel?: string;
}) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Cancel any running animation when dependencies change
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    }

    if (!shouldStart) {
      setDisplayNumber(0);
      return;
    }

    const animate = (currentTime: number) => {
      if (startRef.current == null) startRef.current = currentTime;
      const progress = Math.min(
        (currentTime - (startRef.current ?? currentTime)) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setDisplayNumber(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        startRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
    };
  }, [target, duration, shouldStart]);

  const formatted =
    displayNumber >= 1000
      ? new Intl.NumberFormat().format(displayNumber)
      : String(displayNumber);

  return (
    <span aria-label={ariaLabel ?? `${target}${suffix}`}>
      {formatted}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const statsRef = useRef<HTMLElement | null>(null);
  // Fixed: use 'amount' (framer-motion's current option name) instead of 'threshold'
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Track whether we should render the "mobile" or "desktop" image to prevent both images from mounting
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(max-width: 1024px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 1024px)");
    const onChange = () => setIsMobileViewport(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const features = useMemo(
    () => [
      { icon: Code, text: "Custom Development" },
      { icon: Smartphone, text: "Mobile-First Design" },
      { icon: TrendingUp, text: "SEO Optimized" },
      { icon: Zap, text: "Lightning Fast" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      {
        icon: Briefcase,
        target: 50,
        suffix: "+",
        label: "Projects",
        sublabel: "Completed",
        ariaLabel: "Over 50 projects completed",
      },
      {
        icon: Award,
        target: 99,
        suffix: "%",
        label: "Success Rate",
        sublabel: "Project Delivery",
        ariaLabel: "99 percent success rate in project delivery",
      },
      {
        icon: Headphones,
        target: 24,
        suffix: "/7",
        label: "Support",
        sublabel: "Always Available",
        ariaLabel: "24/7 support always available",
      },
      {
        icon: null,
        target: 5,
        suffix: ".0",
        label: "Rating",
        sublabel: "Client Reviews",
        ariaLabel: "5.0 star rating from client reviews",
      },
    ],
    []
  );

  // Motion props helper -- if reduced motion is requested, avoid repeating transforms/animations
  const motionOrStatic = (props: MotionProps): Partial<MotionProps> =>
    prefersReducedMotion ? { initial: undefined, animate: undefined } : props;

  return (
    <>
      <main
        className="relative min-h-screen flex items-center mt-2 md:mt-18 px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto overflow-hidden"
        itemScope
        itemType="https://schema.org/WebPage"
        role="main"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20" />

          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-l from-[#1B365D] to-[#00BFFF] rounded-full blur-2xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#00BFFF] rounded-full blur-xl"
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  aria-hidden="true"
                />
              </>
            )}
          </div>

          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            <section className="text-center lg:text-left flex-1 max-w-3xl">
              <motion.div
                {...motionOrStatic({
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8 },
                })}
                className="space-y-8"
              >
                <motion.div
                  {...motionOrStatic({
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.6, delay: 0.2 },
                  })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#1B365D]"
                  role="banner"
                  aria-label="Trust indicator"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" aria-hidden />
                  <span>Trusted by UK Businesses</span>
                </motion.div>

                <header>
                  <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] sm:leading-[1.15]"
                    itemProp="headline"
                  >
                    <span className="block text-[#1B365D] mb-2">Professional</span>

                    <span
                      className="block min-h-[1.4em]"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="bg-gradient-to-r from-[#00BFFF] via-[#0099CC] to-[#1B365D] bg-clip-text text-transparent">
                        <TypeAnimation
                          sequence={[
                            "Web Development",
                            2000,
                            "Mobile Apps",
                            2000,
                            "E-commerce",
                            2000,
                            "Digital Marketing",
                            2000,
                            "Custom Software",
                            2000,
                            "SEO Solutions",
                            2000,
                            "UI/UX Design",
                            2000,
                          ]}
                          wrapper="span"
                          repeat={Infinity}
                        />
                      </span>
                    </span>

                    <span className="block text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 font-bold">
                      That Scale Your Business
                    </span>
                  </h1>
                </header>

                <div
                  className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl space-y-4 leading-relaxed"
                  itemProp="description"
                  role="region"
                  aria-labelledby="company-description"
                >
                  <h2 id="company-description" className="sr-only">
                    Company Description
                  </h2>
                  <p>
                    <strong className="font-bold text-[#1B365D]">
                      Viorix Digital Solutions
                    </strong>{" "}
                    is a leading digital agency specializing in{" "}
                    <strong>responsive web development</strong>,{" "}
                    <strong>cross-platform mobile app development</strong>,{" "}
                    <strong>e-commerce website design</strong>, and{" "}
                    <strong>result-driven digital marketing strategies</strong>.
                  </p>
                  <p className="hidden sm:block">
                    Transform your business with our <strong>custom software solutions</strong>, <strong>SEO optimization services</strong>, and{" "}
                    <strong>conversion-focused web design</strong> that drive measurable results and boost your online presence.
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-3 justify-center lg:justify-start"
                  role="list"
                  aria-label="Key features"
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.text}
                        {...motionOrStatic({
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.5, delay: 0.1 * index },
                        })}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                        role="listitem"
                      >
                        <Icon className="w-4 h-4 text-[#00BFFF]" aria-hidden />
                        <span className="text-sm font-medium text-[#1B365D]">
                          {feature.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <nav
                  className="flex flex-col sm:flex-row items-center gap-4 pt-4"
                  role="navigation"
                  aria-label="Primary actions"
                >
                  <Link
                    href="/contact"
                    className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 focus:ring-4 focus:ring-blue-300/50 relative overflow-hidden focus:outline-none"
                    aria-label="Get free consultation for web development services"
                  >
                    <motion.div
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: 1.02,
                              boxShadow:
                                "0 25px 50px -12px rgba(0, 191, 255, 0.25)",
                            }
                      }
                      whileTap={{ scale: 0.98 }}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative flex items-center justify-center gap-2"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"
                        aria-hidden="true"
                      />
                      <Rocket className="w-5 h-5" aria-hidden />
                      <span>Get Free Consultation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden />
                    </motion.div>
                  </Link>

                  <Link
                    href="/about"
                    className="group w-full sm:w-auto px-8 py-4 border-2 border-[#00BFFF] text-[#1B365D] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white hover:border-transparent transition-all duration-500 focus:ring-4 focus:ring-blue-300/50 backdrop-blur-sm bg-white/50 focus:outline-none"
                    aria-label="View our digital services and solutions"
                  >
                    <motion.div
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { scale: 1.02, boxShadow: "0 20px 40px -12px rgba(27, 54, 93, 0.15)" }
                      }
                      whileTap={{ scale: 0.98 }}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>About Us</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden />
                    </motion.div>
                  </Link>
                </nav>
              </motion.div>
            </section>

            <figure
              className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none"
              role="img"
              aria-labelledby="hero-image-description"
            >
              <figcaption id="hero-image-description" className="sr-only">
                Professional web development team image
              </figcaption>

              <motion.div
                {...motionOrStatic({
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.8, delay: 0.3 },
                })}
                className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[420px] xl:max-w-[480px]"
              >
                {/* Conditional rendering: only mount the image relevant to the viewport size.
                    This prevents Next/Image from preloading both versions and hurting LCP. */}
                {isMobileViewport ? (
                  <div className="aspect-[4/5] w-full relative lg:hidden">
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#00BFFF]/5 to-[#1B365D]/5 p-2">
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src="/hero.webp"
                          alt="Professional web development team at Viorix Digital Solutions creating responsive websites, mobile apps, and e-commerce platforms for business growth"
                          width={480}
                          height={600}
                          className="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-700"
                          priority // keep priority for the one mountable hero image
                          sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 480px"
                          itemProp="image"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:block aspect-square w-full relative">
                    <div className="w-full h-full relative">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-[#1B365D]/10 shadow-2xl"
                        style={{
                          clipPath:
                            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                          filter: "blur(1px)",
                        }}
                        aria-hidden="true"
                      />

                      <div
                        className="relative w-full h-full overflow-hidden shadow-2xl"
                        style={{
                          clipPath:
                            "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                        }}
                      >
                        <Image
                          src="/hero.webp"
                          alt="Professional web development team at Viorix Digital Solutions creating responsive websites, mobile apps, and e-commerce platforms for business growth"
                          width={480}
                          height={480}
                          className="object-cover object-center w-full h-full hover:scale-110 transition-transform duration-700"
                          // desktop image NOT marked priority to avoid preloading both variants
                          sizes="(max-width: 1024px) 420px, 480px"
                          itemProp="image"
                        />
                      </div>

                      {!prefersReducedMotion && (
                        <>
                          <motion.div
                            className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full shadow-lg flex items-center justify-center"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            aria-hidden="true"
                          >
                            <Code className="w-6 h-6 text-white" aria-hidden />
                          </motion.div>

                          <motion.div
                            className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-[#1B365D] to-[#00BFFF] rounded-full shadow-lg flex items-center justify-center"
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1,
                            }}
                            aria-hidden="true"
                          >
                            <Smartphone className="w-5 h-5 text-white" aria-hidden />
                          </motion.div>

                          <motion.div
                            className="absolute top-1/3 -left-6 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border-2 border-[#00BFFF]"
                            animate={{ x: [0, -5, 0], scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 2,
                            }}
                            aria-hidden="true"
                          >
                            <Globe className="w-4 h-4 text-[#00BFFF]" aria-hidden />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </figure>
          </div>

          <section
            ref={statsRef}
            className="mt-16 lg:mt-24"
            aria-labelledby="trust-indicators"
            role="region"
          >
            <motion.div
              {...motionOrStatic({
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.6 },
              })}
            >
              <header className="flex items-center justify-center mb-12">
                <div
                  className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  aria-hidden="true"
                />
                <h2 id="trust-indicators" className="px-6 text-sm font-medium text-gray-500 bg-white">
                  Our Track Record
                </h2>
                <div
                  className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  aria-hidden="true"
                />
              </header>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="list" aria-label="Company statistics">
                {stats.map((stat, index) => (
                  <article
                    key={stat.label}
                    className="text-center group cursor-pointer p-4 rounded-2xl hover:bg-white/50 hover:shadow-lg transition-all duration-300"
                    role="listitem"
                  >
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -5 }}
                      {...motionOrStatic({
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.1 * index },
                      })}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-2xl group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                          {stat.icon ? (
                            <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B365D]" aria-hidden />
                          ) : (
                            <div className="flex" role="img" aria-label="5 star rating">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" aria-hidden />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-2xl sm:text-3xl font-bold text-[#1B365D] mb-1">
                        <AnimatedNumber
                          target={stat.target}
                          suffix={stat.suffix}
                          duration={2000 + index * 200}
                          shouldStart={isStatsInView}
                          ariaLabel={stat.ariaLabel}
                        />
                      </div>

                      <div className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.sublabel}</div>
                    </motion.div>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mt-12 lg:mt-16 text-center" aria-labelledby="seo-content" role="region">
            <motion.div {...motionOrStatic({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 0.8 } })}>
              <h2 id="seo-content" className="sr-only">Our Comprehensive Digital Services</h2>
              <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-gray-50/50 to-blue-50/30 rounded-3xl border border-gray-100/50 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  <strong className="text-[#1B365D]">Viorix Digital Solutions</strong> specializes in <em className="text-[#00BFFF] font-medium">responsive web design</em>, <em className="text-[#00BFFF] font-medium">mobile app development</em>, <em className="text-[#00BFFF] font-medium">e-commerce platform development</em>, <em className="text-[#00BFFF] font-medium">search engine optimization (SEO)</em>, <em className="text-[#00BFFF] font-medium">digital marketing strategies</em>, <em className="text-[#00BFFF] font-medium">custom software development</em>, <em className="text-[#00BFFF] font-medium">API integration</em>, <em className="text-[#00BFFF] font-medium">cloud solutions</em>, and <em className="text-[#00BFFF] font-medium">UI/UX design services</em>. We serve businesses of all sizes with cutting-edge technology solutions that drive growth and enhance online presence.
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Hero;