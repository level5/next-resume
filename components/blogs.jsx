import styles from './blogs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function () {
  return (
    <div className={styles.main}>
      <div className={styles.eclipse}></div>
      <div className={styles.articleContainer}>
        <div className={styles.moreArticles}>
          <h2 className={styles.moreArticlesTitle}>My Blogs</h2>
          <h4 className={styles.moreArticlesSubTitle}>
            More Blogs
            <a href="#" className={styles.moreIcon}>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </h4>
        </div>

        <div>blog 1</div>
        <div>blog 2</div>
        <div>blog 3</div>
      </div>
    </div>
  );
}
