import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ location }) {
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

export default withRouter(ScrollToTop);
