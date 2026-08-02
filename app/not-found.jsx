import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-12 md:py-24">
      {/* Visual Glitch Container */}
      <div className="relative mb-6">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-secondary via-cyan-400 to-primary select-none font-heading">
          404
        </h1>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-8xl md:text-9xl font-extrabold tracking-widest text-white/5 select-none font-heading blur-sm animate-pulse">
          404
        </div>
      </div>
      
      <p className="text-xl md:text-2xl font-bold text-white font-heading">
        SYSTEM_ERROR: ROUTE_UNRESOLVED
      </p>
      
      <p className="mt-3 text-sm md:text-base text-muted font-mono max-w-md mx-auto leading-relaxed">
        The requested address was not found on this server. Check your parameters or return to base.
      </p>
      
      <Link 
        href="/"
        className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-secondary/80 to-primary/80 text-white text-xs md:text-sm font-mono tracking-wider uppercase border border-white/10 hover:border-primary shadow-md shadow-primary-glow/10 hover:shadow-primary-glow/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        // return_to_base
      </Link>
    </div>
  );
}

export default NotFound;