import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';

export default function Blog({ blogs }) {
  return (
    <section id="blogs" className="py-12 lg:py-24 relative">
      <div className="space-y-2 mb-12 text-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-widest">// publication_feed</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Latest Publications
        </h2>
      </div>

      {/* Mobile/Tablet Horizontal Carousel */}
      <div className="flex md:hidden overflow-x-auto gap-6 snap-x snap-mandatory pb-6 scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch] -mx-6 px-6">
        {blogs.slice(0, 6).map((blog, i) => (
          blog?.cover_image && (
            <div key={i} className="w-[80vw] xs:w-[320px] shrink-0 snap-center flex">
              <BlogCard blog={blog} />
            </div>
          )
        ))}
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.slice(0, 6).map((blog, i) => (
          blog?.cover_image && (
            <BlogCard blog={blog} key={i} />
          )
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/blog" className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-full blur opacity-45 group-hover:opacity-100 transition duration-300"></div>
          <button className="relative px-8 py-3.5 bg-bg-base hover:bg-bg-base/80 rounded-full text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition duration-200 cursor-pointer">
            <span>View More</span>
            <FaArrowRight size={14} className="text-primary" />
          </button>
        </Link>
      </div>
    </section>
  );
}