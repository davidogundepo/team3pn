import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setIsTransitioning(true);
      // Short exit phase, then swap content and enter
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        prevPathRef.current = location.pathname;
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <div
      className="page-transition-wrapper"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
