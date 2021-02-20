import { useRef, useState } from 'react';

import Header from '../components/header';
import Anchor from '../components/anchor';
import Hero from '../components/hero';
import Careers from '../components/careers';
import Skills from '../components/skills';
import Blogs from '../components/blogs';
import styles from './resume.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function Resume() {
  const [menuOpened, setMenuOpened] = useState(false);
  const careerRef = useRef(null);
  const skillRef = useRef(null);
  const resumeRef = useRef(null);
  const scrollTo = (name) => {
    let ref = null;
    switch (name) {
      case 'aboutme':
        ref = resumeRef;
        break;
      case 'skills':
        ref = skillRef;
        break;
      case 'career':
        ref = careerRef;
        break;
      default:
        ref = resumeRef;
    }
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <div className={styles.main} ref={resumeRef}>
      <div
        className={styles.up}
        onClick={() => {
          resumeRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <Header
        menuOpened={menuOpened}
        toggleMenu={(opened) => setMenuOpened(opened)}
      />
      <Anchor
        scrollTo={scrollTo}
        menuOpened={menuOpened}
        toggleMenu={(opened) => setMenuOpened(opened)}
      />
      <Hero
        scrollToNext={() => {
          skillRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      />
      <Skills
        scrollToNext={() => {
          careerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
        ref={skillRef}
      />
      <Careers ref={careerRef} />
      <Blogs />
    </div>
  );
}

export default Resume;
