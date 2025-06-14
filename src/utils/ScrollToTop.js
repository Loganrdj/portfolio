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
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default withRouter(ScrollToTop);
