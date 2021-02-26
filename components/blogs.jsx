import styles from './blogs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useViewPercentage } from '../hooks/custom-hook';
import React from 'react';
import Lines from './lines';
import { useTranslation } from 'next-i18next';

export default React.forwardRef(({}, ref) => {
  const yPercentage = useViewPercentage(ref);
  const { t } = useTranslation('resume');
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
        {t('my-blogs')}
      </h1>
      <div className={styles.articleContainer}>
        <div className={styles.moreArticles}>
          <h2 className={styles.moreArticlesTitle}>{t('my-blogs')}</h2>
          <h4 className={styles.moreArticlesSubTitle}>
            {t('more-blogs')}
            <a href="/posts" target="_blank" className={styles.moreIcon}>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </h4>
        </div>

        <div className={styles.toBeContinueContainer}>
          <div className={styles.screw}></div>
          <div className={styles.toBeContinue}>{t('in-preparation')}</div>
        </div>
      </div>
    </div>
  );
});
