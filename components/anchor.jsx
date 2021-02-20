import styles from './anchor.module.scss';
import { useCallback } from 'react';
import classname from 'classname';

export default function ({ menuOpened, toggleMenu, scrollTo }) {
  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      scrollTo(event.target.name);
      toggleMenu(!menuOpened);
    },
    [menuOpened]
  );

  return (
    <div
      className={classname({
        [styles.anchorContainer]: true,
        [styles.shown]: menuOpened,
      })}
    >
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <a
            href="#"
            name="aboutme"
            className={styles.link}
            onClick={onClick}
            data-profile="About me"
          >
            About me
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="#"
            name="skills"
            className={styles.link}
            onClick={onClick}
            data-profile="Skills"
          >
            Skills
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="#"
            name="career"
            className={styles.link}
            onClick={onClick}
            data-profile="Experiences"
          >
            Experiences
          </a>
        </li>
        <li className={styles.item}>
          <a
            href="#"
            name="blogs"
            className={styles.link}
            onClick={onClick}
            data-profile="Blogs"
          >
            Blogs
          </a>
        </li>
      </ul>
      <div className={styles.contact}>
        <div className={styles.email}>
          <span>contact me:</span>
          <a href="mailto:huang.shifeng@outlook.com">
            huang.shifeng@outlook.com
          </a>
        </div>
      </div>
    </div>
  );
}
