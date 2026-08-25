"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { POSTS } from "./posts";
import Image from "next/image";
const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(POSTS.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = POSTS.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of posts section
    document.getElementById('posts-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <main className="min-h-screen bg-white relative">

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Enhanced Hero Section */}
        <section className="text-center mb-20">
          <div className="space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#1B365D] mb-6">
              <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
              <span>Latest Insights & Updates</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              <span className="block text-[#1B365D] mb-2">Viorix</span>
              <span className="block bg-gradient-to-r from-[#00BFFF] via-[#0099CC] to-[#1B365D] bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <strong className="font-bold text-[#1B365D]">
                Expert insights
              </strong>
              , tutorials, and updates from{" "}
              <strong className="text-[#00BFFF]">Viorix Digital Solutions</strong>. 
              Explore the latest in web development, design, and technology trends 
              that drive business success.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              {[
                "Web Development",
                "Digital Marketing", 
                "UI/UX Design",
                "Technology Trends"
              ].map((topic) => (
                <div
                  key={topic}
                  className="px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <span className="text-sm font-medium text-[#1B365D]">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Counter */}
        <section id="posts-section" className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">
                Showing {startIndex + 1}-{Math.min(endIndex, POSTS.length)} of {POSTS.length} articles
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </section>

        {/* Enhanced Blog Cards */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100/50 flex flex-col hover:-translate-y-2"
              >
                {/* Image Container with Gradient Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/20 via-transparent to-transparent z-10"></div>
                  <Image
                    src={post.image}
                    width={600}
                    height={400}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-blue-100/50">
                      <span className="text-xs font-medium text-[#1B365D]">
                        Article
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-grow space-y-4">
                  {/* Date and Reading Time */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>5 min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl lg:text-2xl font-bold text-[#1B365D] leading-tight group-hover:text-[#00BFFF] transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {post.description}
                  </p>

                  {/* Read More Button */}
                  <div className="pt-4">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 hover:from-[#00BFFF] hover:to-[#1B365D] text-[#1B365D] hover:text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg border border-blue-200/50 hover:border-transparent"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className="h-1 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="mt-16">
            <div className="flex justify-center items-center">
              <nav className="flex items-center gap-2" aria-label="Pagination">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1B365D] bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-[#1B365D] shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:block">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers.map((page, index) => (
                    page === 'ellipsis' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#1B365D]">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white'
                            : 'text-[#1B365D] bg-white/80 backdrop-blur-sm border border-blue-100/50 hover:bg-gradient-to-r hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1B365D] bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-[#1B365D] shadow-sm hover:shadow-md"
                >
                  <span className="hidden sm:block">Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>

            {/* Pagination Info */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-[#1B365D]">{startIndex + 1}</span> to{' '}
                <span className="font-medium text-[#1B365D]">{Math.min(endIndex, POSTS.length)}</span> of{' '}
                <span className="font-medium text-[#1B365D]">{POSTS.length}</span> results
              </p>
            </div>
          </section>
        )}

        {/* Call-to-Action Section */}
        <section className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 lg:p-12 bg-gradient-to-r from-[#00BFFF]/5 via-white/50 to-[#1B365D]/5 rounded-3xl border border-blue-100/50 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B365D] mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get expert insights tailored to your business needs. Let&apos;s discuss 
              how our digital solutions can drive your growth.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Get Free Consultation</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}