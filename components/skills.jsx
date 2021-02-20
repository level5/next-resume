import Lines from './lines';
import styles from './skills.module.scss';
import classname from 'classname';
import React from 'react';
import ScrollToNext from './scroll-to-next';
const skills = [
  {
    key: 'Java',
    title: 'Java',
    content: 'Springboot, JPA, PostgreSQL, MongoDB',
  },
  {
    key: 'HTML, CSS',
    title: 'HTML, CSS, JavaScript',
    content: 'CSS2, CSS3, Vanilla JavaScript ',
  },
  {
    key: 'Reactjs',
    title: 'Reactjs',
    content: 'React, Redux, React-Router, MaterialUI, NextJs',
  },
  {
    key: 'Nodejs',
    title: 'Nodejs',
    content: 'express',
  },
];

export default React.forwardRef(({ scrollToNext }, ref) => {
  return (
    <div className={styles.skillMain} ref={ref}>
      <Lines />
      <div className={styles.balloon}>
        <div></div>
      </div>
      <div className={styles.skillContainer}>
        <h1 data-aos="fade-up" className={styles.skillTitle}>
          My Skills
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
    </div>
  );
});
