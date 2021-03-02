import Lines from './lines';
import styles from './skills.module.scss';
import classname from 'classname';
import React from 'react';
import ScrollToNext from './scroll-to-next';
import { useTranslation } from 'next-i18next';
const skills = [
  {
    key: 'Java',
    title: 'Java',
    content: 'Spring boot, JPA, PostgreSQL, MongoDB',
  },
  {
    key: 'HTML, CSS',
    title: 'HTML, CSS, JavaScript',
    content: 'CSS2, CSS3, Vanilla JavaScript, Http/Https, Restful,  ',
  },
  {
    key: 'Reactjs',
    title: 'Reactjs',
    content: 'React, Redux, React-Router, MaterialUI, NextJs',
  },
  {
    key: 'Nodejs',
    title: 'Nodejs',
    content: 'Expressjs',
  },
  {
    key: 'other',
    title: 'Others',
    content: 'Linux, Docker, Git, Maven/Gradle, Webpack, Scrum',
  },
];

export default React.forwardRef(({ scrollToNext }, ref) => {
  const { t } = useTranslation('resume');
  return (
    <section className={styles.skillMain} ref={ref}>
      <Lines />
      <div className={styles.balloon}>
        <div></div>
      </div>
      <div className={styles.skillContainer}>
        <h1 data-aos="fade-up" className={styles.skillTitle}>
          {t('my-skills')}
        </h1>
        <div className={styles.skillContent}>
          <span className={styles.verticalLine}></span>
          {skills.map((skill, index) => (
            <div
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              className={classname({
                [styles.skill]: true,
                [styles.left]: index % 2 === 0,
                [styles.right]: index % 2 === 1,
              })}
              key={skill.key}
            >
              <div className={styles.skillCircle}></div>
              <div className={styles.skillCircleTail}></div>
              <h2 className={styles.nameOfSkill}>
                <span>{skill.title}</span>
                <span></span>
              </h2>
              <span className={styles.descOfSkill}>{skill.content}</span>
            </div>
          ))}
        </div>
      </div>
      <ScrollToNext scrollToNext={scrollToNext} />
    </section>
  );
});
