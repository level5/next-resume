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

const titles = ['Web developer', 'Java developer', 'Gamer'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ({ scrollToNext }) {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [adding, setAdding] = useState(false);

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
    <div className={styles.heroContainer}>
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
            <h1>Huang Shifeng</h1>
            <h2>
              <span>I am a {title}</span>
            </h2>
          </div>
          <ul className={styles.descList}>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faCalendarDay} />
              </span>
              <span>Birthday:</span>
              <span>03.09.1983</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faPager} />
              </span>
              <span>Age:</span>
              <span>{new Date().getFullYear() - 1983}</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faMapMarkedAlt} />
              </span>
              <span>Location:</span>
              <span>Pudong, Shanghai</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faGamepad} />
              </span>
              <span>Interests:</span>
              <span>Game, Reading</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faUniversity} />
              </span>
              <span>Study:</span>
              <span>Central South University</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faUserGraduate} />
              </span>
              <span>Degree:</span>
              <span>Master</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faAt} />
              </span>
              <span>Email:</span>
              <span>huang.shifeng@outlook.com</span>
            </li>
            <li className={styles.descItem}>
              <span>
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
              <span>Phone:</span>
              <span>13636523358</span>
            </li>
          </ul>
          <div className={styles.cvDownload}>
            <span>Download Resume</span>
            <span>
              <a href="/resources/huangshifeng-resume.pdf" download>
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
              </a>
            </span>
          </div>
        </div>
      </div>
      <ScrollToNext scrollToNext={scrollToNext} />
    </div>
  );
}
