import styles from './scroll-to-next.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function ({ scrollToNext }) {
  return (
    <div className={styles.scrollFlag} onClick={scrollToNext}>
      <span>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </span>
      <span>scroll down</span>
    </div>
  );
}
