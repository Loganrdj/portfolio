import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ location }) {
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        // Use instant scrolling so CSS scroll-snap can immediately
        // position the section without leaving the user stuck waiting
        // for a smooth scroll animation to finish.
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } else {
      // Jump instantly to the top when navigating between pages so the user
      // can immediately scroll. Explicitly set behavior to 'auto' to override
      // the global CSS smooth scroll setting.
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default withRouter(ScrollToTop);
