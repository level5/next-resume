import '../styles.scss';
import { useEffect } from 'react';
import debounce from 'lodash/debounce';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const updateScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
};
const debounceUpdateScroll = debounce(updateScroll, 200);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();

    window.addEventListener('scroll', debounceUpdateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return <Component {...pageProps} />;
}
