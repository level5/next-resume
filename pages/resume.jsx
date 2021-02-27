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

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import careersInEn from '../lib/career.en';
import careersInZh from '../lib/career.zh';

function Resume({ careers }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const careerRef = useRef(null);
  const skillRef = useRef(null);
  const resumeRef = useRef(null);
  const blogsRef = useRef(null);

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
      case 'blogs':
        ref = blogsRef;
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
      <div className={styles.hintForSmallScreen}>
        <span>还没有时间进行适配，请在桌面浏览器打开 </span>
      </div>
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
          careerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      />
      <Careers
        ref={careerRef}
        careers={careers}
        scrollToNext={() => {
          skillRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      />
      <Skills
        scrollToNext={() => {
          blogsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
        ref={skillRef}
      />
      <Blogs ref={blogsRef} />
    </div>
  );
}

export default Resume;

export async function getStaticProps({ locale }) {
  const careers = locale === 'en' ? careersInEn : careersInZh;
  console.log('gg', locale === 'en', locale);
  return {
    props: {
      careers,
      ...(await serverSideTranslations(locale, ['resume'])),
    },
  };
}
