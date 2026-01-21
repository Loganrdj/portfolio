import React, { useEffect, useRef, useState } from "react";

export default function LazyThumb({
  src,
  alt,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const wrapperRef = useRef(null);

  // Start loading BEFORE it enters view (this is the "smooth" part)
  useEffect(() => {
    if (eager) return;

    const el = wrapperRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "700px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // Preload via JS Image so it’s decoded before we fade it in
  useEffect(() => {
    if (!shouldLoad) return;

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    if (img.complete) {
      setLoaded(true);
      return;
    }

    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // fail open: don’t leave skeleton forever

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [shouldLoad, src]);

  return (
    <div ref={wrapperRef} className="lazyWrap">
      <div className={`lazySkeleton ${loaded ? "isLoaded" : ""}`} aria-hidden="true" />

      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`${className} lazyImg ${loaded ? "isLoaded" : ""}`}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "auto"}
        />
      )}
    </div>
  );
}
