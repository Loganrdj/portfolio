import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ location }) {
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
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
