import { useEffect, useState } from 'react';
import classname from 'classname';
import styles from './hero.module.scss';
import Lines from './lines';
import ScrollToNext from './scroll-to-next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudDownloadAlt,
  faMapMarkedAlt,
  faUniversity,
  faMobileAlt,
  faAt,
  faUserGraduate,
  faGamepad,
  faPager,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const titles = ['Web developer', 'Java developer', 'Gamer'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ({ scrollToNext }) {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [adding, setAdding] = useState(false);

  const { t } = useTranslation('resume');
  const router = useRouter();
  useEffect(() => {
    let stop = false;

    (async () => {
      let index = 0;
      while (!stop) {
        const newTitle = titles[index];
        for (let i = 0; i < newTitle.length; i++) {
          await sleep(20);
          setTitle(newTitle.substr(0, i + 1));
        }
        await sleep(1200);
        for (let i = 0; i < newTitle.length; i++) {
          await sleep(20);
          setTitle(newTitle.substr(0, newTitle.length - i - 1));
        }
        await sleep(700);
        index = (index + 1) % titles.length;
      }
    })();

    return () => {
      stop = true;
    };
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className={styles.heroContainer}>
      <Lines />
      <div
        className={classname({
          [styles.contentContainer]: true,
          [styles.animationStart]: loaded,
        })}
      >
        <div className={styles.heroImg}></div>
        <div
          className={styles.heroContent}
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className={styles.heroInfo}>
            <h1>{t('huang-shifeng')}</h1>
            <h2>
              <span>I am a {title}</span>
            </h2>
          </div>
          <ul className={styles.descList}>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faCalendarDay} />
              </span>
              <span>{t('birthday')}:</span>
              <span>
                {new Intl.DateTimeFormat(router.locale, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(1983, 2, 9))}
              </span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faPager} />
              </span>
              <span>{t('age')}:</span>
              <span>{new Date().getFullYear() - 1983}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faMapMarkedAlt} />
              </span>
              <span>{t('location')}:</span>
              <span>{t('my-address')}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faGamepad} />
              </span>
              <span>{t('interests')}:</span>
              <span>{t('my-hobbies')}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faUniversity} />
              </span>
              <span>{t('study')}:</span>
              <span>{t('my-college')}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faUserGraduate} />
              </span>
              <span>{t('degree')}:</span>
              <span>{t('my-degree')}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faAt} />
              </span>
              <span>{t('email')}:</span>
              <span>huang.shifeng@outlook.com</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
              <span>{t('phone')}:</span>
              <span>13636523358</span>
            </li>
          </ul>
          <div className={styles.cvDownload}>
            <span>{t('download-resume')}</span>
            <span>
              <a
                href={`/resources/${router.locale}huangshifeng-resume.pdf`}
                download
              >
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
              </a>
            </span>
          </div>
        </div>
      </div>
      <ScrollToNext scrollToNext={scrollToNext} />
    </section>
  );
}
