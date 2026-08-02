import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

const placeholderImage = '/png/placeholder.png';

export default function BlogCard({ blog, priority = false }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden bg-black/40 border border-white/5 group hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="h-44 lg:h-52 w-full cursor-pointer overflow-hidden relative">
          <Image
            src={blog?.cover_image || placeholderImage}
            height={400}
            width={600}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={blog.title}
            priority={priority}
          />
        </div>
        
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-primary">
            <p>{timeConverter(blog.published_at)}</p>
            <div className="flex items-center gap-3">
              <p className="flex items-center gap-1">
                <BsHeartFill size={10} />
                <span>{blog.public_reactions_count}</span>
              </p>
              {blog.comments_count > 0 && (
                <p className="flex items-center gap-1">
                  <FaCommentAlt size={10} />
                  <span>{blog.comments_count}</span>
                </p>
              )}
            </div>
          </div>

          <Link target="_blank" href={blog.url} className="block group-hover:text-primary transition-colors">
            <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
              {blog.title}
            </h3>
          </Link>

          <p className="text-[10px] font-mono text-slate-500">
            {`${blog.reading_time_minutes} Min Read`}
          </p>

          <p className="text-xs text-muted leading-relaxed line-clamp-3">
            {blog.description}
          </p>
        </div>
      </div>
      
      <div className="px-5 pb-5 pt-2">
        <Link 
          target="_blank" 
          href={blog.url}
          className="inline-block text-xs font-mono text-secondary hover:text-white transition duration-200"
        >
          Read Article &rarr;
        </Link>
      </div>
    </div>
  );
}