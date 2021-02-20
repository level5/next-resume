import styles from './blogs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useViewPercentage } from '../hooks/custom-hook';
import React from 'react';
import Lines from './lines';

export default React.forwardRef(({}, ref) => {
  const yPercentage = useViewPercentage(ref);
  console.log(`${100 - yPercentage}%`);
  return (
    <div ref={ref} className={styles.main}>
      <Lines />
      <div className={styles.eclipse}></div>
      <h1
        className={styles.blogsTitle}
        style={{
          right: `${yPercentage}%`,
          transform: `translateX(${100 - yPercentage}%)`,
        }}
      >
        My Blogs
      </h1>
      <div className={styles.articleContainer}>
        <div className={styles.moreArticles}>
          <h2 className={styles.moreArticlesTitle}>My Blogs</h2>
          <h4 className={styles.moreArticlesSubTitle}>
            More Blogs
            <a href="/posts" target="_blank" className={styles.moreIcon}>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </h4>
        </div>

        <div>整理中...</div>
      </div>
    </div>
  );
});
