import React, { useCallback, useEffect, useRef, useState } from 'react';
import classname from 'classname';
import styles from './careers.module.scss';
import Lines from './lines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import throttle from 'lodash/throttle';
import { useViewPercentage } from '../hooks/custom-hook';
import ScrollToNext from './scroll-to-next';
import { useTranslation } from 'next-i18next';

export default React.forwardRef(({ scrollToNext, careers: companies }, ref) => {
  const [currentCompany, setCurrentCompany] = useState(0);
  const titleTranslateY = useViewPercentage(ref);
  const { t } = useTranslation('resume');
  const slideToLeft = useCallback(
    throttle((position) => {
      const current = (position + companies.length - 1) % companies.length;
      setCurrentCompany(current);
    }, 1100),
    []
  );
  const slideToRight = useCallback(
    throttle((position) => {
      setCurrentCompany((position + 1) % companies.length);
    }, 1100),
    []
  );

  const companiesInView = [
    companies[(currentCompany + companies.length - 1) % companies.length],
    companies[currentCompany],
    companies[(currentCompany + 1) % companies.length],
  ];

  return (
    <div ref={ref} className={styles.careerContainer}>
      <Lines />
      <div
        style={{
          transform: `translateY(-${100 - titleTranslateY}%)`,
          top: `${titleTranslateY}%`,
        }}
        className={styles.careerWorkingPeriod}
      >
        {t('working-period')}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.companyContainer}>
          <div className={styles.slideController}>
            <a
              href="#"
              className={styles.buttonLeft}
              onClick={(event) => {
                event.preventDefault();
                slideToLeft(currentCompany);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
            <a
              href="#"
              className={styles.buttonRight}
              onClick={(event) => {
                event.preventDefault();
                slideToRight(currentCompany);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <span>
              {currentCompany + 1}/{companies.length}
            </span>
          </div>
          <div className={styles.companyArea}>
            {companiesInView.map((company, index) => (
              <div
                className={classname({
                  [styles.company]: true,
                  [styles.companyPre]: index === 0,
                  [styles.companyNext]: index === 2,
                })}
                key={company.key}
              >
                <div className={styles.companyHeader}>
                  {company.companyName}
                </div>
                <div className={styles.companyHeaderSub}>
                  {new Date(company.from).getUTCFullYear()}.
                  {new Date(company.from).getMonth()} -{' '}
                  {company.to
                    ? new Date(company.to).getUTCFullYear() + '.'
                    : 'now'}
                  {company.to && new Date(company.to).getMonth()}
                  &nbsp;&nbsp; {company.duration}
                </div>
                <div className={styles.companyTitle}>{company.title}</div>
                <div className={styles.companyDesc}>{company.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.projectsContainer}>
            {companiesInView.map((company, index) => {
              return (
                <div
                  key={company.key}
                  className={classname({
                    [styles.projects]: true,
                    [styles.projectsPre]: index === 0 || index === 2,
                  })}
                >
                  {company.projects.map((project) => (
                    <div
                      className={styles.project}
                      key={project.key}
                      onClick={(event) => {}}
                    >
                      <h2 className={styles.projectTitle}>{project.name}</h2>
                      <div className={styles.projectTagContainer}>
                        {(project.tech || []).map((tech) => (
                          <span className={styles.projectTechTag}>{tech}</span>
                        ))}
                      </div>
                      <div className={styles.projectDesc}>
                        <span className={styles.projectDescTitle}>
                          {t('description')}
                        </span>
                        <p
                          dangerouslySetInnerHTML={{ __html: project.desc }}
                        ></p>
                      </div>
                      <div className={styles.projectResp}>
                        <span className={styles.projectRespTitle}>
                          {t('responsibilities')}
                        </span>
                        <p>{project.responsibilities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.boat}></div>
      <ScrollToNext scrollToNext={scrollToNext} />
    </div>
  );
});
