import styles from './scroll-to-next.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';

export default function ({ scrollToNext }) {
  const { t } = useTranslation('resume');
  return (
    <div className={styles.scrollFlag} onClick={scrollToNext}>
      <span>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </span>
      <span>{t('scroll-down')}</span>
    </div>
  );
}
