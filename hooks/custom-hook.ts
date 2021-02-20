import { ForwardedRef, MutableRefObject, useEffect, useState } from 'react';

export function useViewPercentage(ref: ForwardedRef<any>) {
  const [titleTranslateY, setTitleTranslateY] = useState(0);
  useEffect(() => {
    const updateY = () => {
      if (!ref.current) {
        return;
      }
      const top = ref.current.getBoundingClientRect().top;
      const height = ref.current.getBoundingClientRect().height;
      // the range of top should in [window.innerHeight, 0, -height]
      if (top < -height) {
        // go to bottom
        setTitleTranslateY(100);
      } else if (top > window.innerHeight) {
        // go to top
        setTitleTranslateY(0);
      } else {
        setTitleTranslateY(
          (((window.innerHeight - top) / (window.innerHeight + height)) * 100) |
            0
        );
      }
    };

    window.addEventListener('scroll', updateY);
    return () => {
      window.removeEventListener('scroll', updateY);
    };
  }, []);

  return titleTranslateY;
}
