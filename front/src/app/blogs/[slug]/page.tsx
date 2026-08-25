import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS } from "../posts";
import Image from "next/image";
import Script from "next/script";
import { Metadata } from "next";

const BASE_URL = "https://viorix.co.uk";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // ✅ must await

  const post = POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Blog Not Found" };
  }

  const url = `${BASE_URL}/blogs/${post.slug}`;

  return {
    title: `${post.title} | Viorix Blogs`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: "Viorix Digital Solutions",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${BASE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${BASE_URL}${post.image}`],
    },
  };
}

// ✅ Fixed interface - params should be a Promise in Next.js 15
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // ✅ Await the params Promise
  const { slug } = await params;

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  // Get related posts (excluding current post)
  const relatedPosts = POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blogs/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blogs/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Viorix Digital Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-GB",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${BASE_URL}/blogs` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blogs/${post.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 relative overflow-hidden">
      {/* BlogPosting Schema - JSON-LD */}
      <Script
        id="ld-json-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb Schema - JSON-LD */}
      <Script
        id="ld-json-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20"></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
          <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-l from-[#1B365D] to-[#00BFFF] rounded-full blur-2xl animate-bounce" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-4xl mx-auto px-4 pt-8 pb-4" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#00BFFF] transition-colors duration-300"
            >
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href="/blogs"
              className="hover:text-[#00BFFF] transition-colors duration-300"
            >
              Blogs
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1B365D] font-medium">Current Article</span>
          </div>
        </nav>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-blue-100/50 overflow-hidden">
            {/* Article Header */}
            <header className="relative">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/40 via-transparent to-transparent z-10"></div>
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={600}
                />
                
                {/* Article Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-blue-100/50">
                    <span className="text-sm font-medium text-[#1B365D]">
                      Article
                    </span>
                  </div>
                </div>

                {/* Reading Time Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00BFFF]/90 to-[#1B365D]/90 backdrop-blur-sm rounded-full text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{post.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Title and Meta */}
              <div className="p-8 lg:p-12 pb-6">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{post.author}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1B365D] leading-tight mb-4">
                  {post.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              </div>
            </header>

            {/* Article Body */}
            <div className="px-8 lg:px-12 pb-12">
              {/* Content */}
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:text-[#1B365D] prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[#00BFFF] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#1B365D] prose-strong:font-bold
                  prose-ul:my-6 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-[#00BFFF] prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg
                  prose-code:bg-blue-50 prose-code:text-[#1B365D] prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-[#1B365D] prose-pre:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags Section */}
              <div className="mt-12 pt-8 border-t border-blue-100/50">
                <h3 className="text-lg font-bold text-[#1B365D] mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] font-medium rounded-full border border-blue-200/50 hover:from-[#00BFFF]/20 hover:to-[#1B365D]/20 transition-all duration-300 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Call-to-Action Section */}
          <section className="mt-16 mb-8">
            <div className="bg-gradient-to-r from-[#00BFFF]/5 via-white/50 to-[#1B365D]/5 rounded-3xl border border-blue-100/50 backdrop-blur-sm p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1B365D] mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Get expert digital solutions tailored to your business needs. 
                Let&apos;s discuss how we can drive your growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.942 8.942 0 01-4.666-1.308L3 21l2.308-5.334A8.942 8.942 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  <span>Get Free Consultation</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00BFFF] text-[#1B365D] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white hover:border-transparent transition-all duration-500 backdrop-blur-sm bg-white/50"
                >
                  <span>Read More Articles</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1B365D] mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blogs/${relatedPost.slug}`}
                    className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100/50 hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/20 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500 mb-2 block">
                        {new Date(relatedPost.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <h3 className="font-bold text-[#1B365D] group-hover:text-[#00BFFF] transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}