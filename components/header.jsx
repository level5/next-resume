import styles from './header.module.scss';
import classname from 'classname';
import {
  faGlobeAsia,
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header({ menuOpened, toggleMenu }) {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <Link href="/resume" locale={router.locale === 'en' ? 'zh' : 'en'}>
        <span className={styles.i18n}>
          <FontAwesomeIcon
            icon={router.locale === 'en' ? faGlobeAmericas : faGlobeAsia}
          />
          <span>{router.locale === 'en' ? 'EN' : '中'}</span>
        </span>
      </Link>
      <div className="hire-me"></div>
      <div
        className={classname({
          [styles.menuButton]: true,
          [styles.opened]: menuOpened,
        })}
        onClick={() => {
          toggleMenu(!menuOpened);
        }}
      >
        <span className={classname(styles.menuButtonLine)}></span>
        <span className={classname(styles.menuButtonLine)}></span>
        <span className={classname(styles.menuButtonLine)}></span>
      </div>
    </div>
  );
}
