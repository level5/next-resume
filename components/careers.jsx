import React, { useCallback, useEffect, useRef, useState } from 'react';
import classname from 'classname';
import styles from './careers.module.scss';
import Lines from './lines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import throttle from 'lodash/throttle';
import { useViewPercentage } from '../hooks/custom-hook';
import ScrollToNext from './scroll-to-next';

const companies = [
  {
    key: 'No',
    companyName: '参与创业项目开发',
    from: new Date(2020, 7),
    desc: '参与创业项目开发DoxAuto的POC开发。',
    projects: [
      {
        key: 'No project-1',
        name: 'DoxAuto',
        tech: ['SpringBoot', 'MongoDB', 'React', 'Material UI'],
        desc:
          '法律文档自动生成系统。 <a target="_blank" href="https://doxauto.com">https://doxauto.com</a>',
        responsibilities: '独自完成产品POC前后端的开发。',
      },
    ],
  },
  {
    key: 'Huawei',
    companyName: 'Huawei',
    title: 'SE',
    from: new Date(2018, 5),
    to: new Date(2020, 6),
    duration: '25 months',
    desc:
      '在项目担任SE职位，职责是负责特性的设计工作，并确保开发特性交付， 同时会做一些前后端核心特性的开发工作。',
    projects: [
      {
        key: 'Huawei project-1',
        name: '鲲鹏性能优化工具Java性能',
        tech: [
          'SpringBoot',
          'Java Instrument',
          'JFR',
          'SQLite',
          'React',
          'Material UI',
        ],
        desc:
          '鲲鹏性能优化工具作为华为鲲鹏服务器生态系统的一部分，帮助开发者发现和优化性能问题。' +
          '其中Java性能工具用于对Java程序进行性能监控和调优。主要包含对JVM事实监控的Profiling和录制Sampling两种监控方式。' +
          '项目由上海SE团队专家提出，并由上海SE团队进行原型开发，最终实现产品化。',
        responsibilities:
          'POC阶段，参与项目需求确认，UI选型和UCD设计，架构设计，前后端功能开发。\n' +
          '产品化阶段，基于POC，完成和系统工具的整合，补全相关文档，API规范化，安全测试。\n' +
          '完成产品化后，主要职责需求分析和设计，并确保开发能够按计划按时交付。\n',
      },
      {
        key: 'Huawei project-2',
        name: 'MAAS',
        tech: [
          'SpringCloud',
          'MongoDB',
          'Kafka',
          'K8s',
          'React',
          'Material UI',
        ],
        desc:
          'FusionDirector的云化。上海SE团队专家通过分析华为客户构成和友商产品，提出该产品方案，并由上海SE团队，进行原型开发。',
        responsibilities:
          '参与项目需求确认，关键痛点分析，并针对痛点提出方案。并对相关技术难点进行验证。代码部分主要负责的是UI和后台业务开发。',
      },
      {
        key: 'Huawei project-3',
        name: 'FusionDirector',
        tech: ['Beego', 'GaussDB', 'RabbitMQ', 'Redis', 'Angularjs'],
        desc:
          'FusionDirector为参考友商相关产品提出的服务器管理软件。用于管理华为生产的服务器产品及边缘设备。',
        responsibilities:
          '作为前端加入团队，负责核心功能开发。并对前端存在问题提出改进方案。后续作为基础服务的SE，参与基础服务的设计讨论。并负责分权分域特性的设计。',
      },
    ],
  },
  {
    key: 'HPE',
    companyName: 'Hewlett Packard Enterprise',
    title: 'Specialist',
    from: new Date(2015, 4),
    to: new Date(2018, 4),
    duration: '36 months',
    desc:
      '在Scrum Team担任Architecture Owner。负责本小组业务的架构，技术预研，以及相关业务前后端的开发工作。',
    projects: [
      {
        key: 'HPE project-1',
        name: 'OneView Global Dashboard',
        tech: ['expressjs', 'ElasticSearch', 'React', 'Grommet'],
        desc:
          'OneView Global Dashboard作为多个OneView的统一管理入口。来解决OneView在超大型数据中心场景下的性能限制。项目由美国团队完成了技术的选型和基本功能。',
        responsibilities:
          '初期主要工作是对POC的产品化，主要负责前端UI和后端管理OneView的功能的开发。\n' +
          '项目后期主要负责后端的开发，以及项目技术的演进及自动化测试的引入和覆盖率的提升。同时完成小组向全功能团队的转型。\n',
      },
      {
        key: 'HPE project-2',
        name: 'OneView',
        tech: ['Spring', 'PostgreSQL', 'Jquery', 'requirejs'],
        desc: 'OneView为HP的服务器管理软件，用于管理HP生产的刀片和机框服务器。',
        responsibilities: '主要负责Server微服务的开发和维护工作。',
      },
    ],
  },
  {
    key: 'Ericsson',
    companyName: 'Ericsson',
    title: '高级软件工程师',
    from: new Date(2014, 7),
    to: new Date(2015, 4),
    duration: '9 months',
    desc: '多媒体广播管理系统开发和维护。',
    projects: [
      {
        key: 'Ericsson project-1',
        name: 'Broadcast管理系统',
        desc:
          'Broadcast多媒体管理系统的开发。前端采用Backbone开发的框架，后台采用Jersey提供Restful接口，采用技术OpenJPA，Postgres。服务器采用Jetty。',
        responsibilities:
          'POC阶段，担任前端的开发，主要负责地图部分的开发；\n' +
          '产品化后，负责后台Restful接口的开发。\n',
      },
      {
        key: 'Ericsson project-2',
        name: 'IODT',
        responsibilities:
          ' 使用JavaScript开发Device Module，适配机顶盒API和爱立信MSDK接口;测试，验收厂商机顶盒的FW。',
      },
    ],
  },
  {
    key: 'CIEnet',
    companyName: 'CIEnet',
    title: '高级软件工程师',
    from: new Date(2011, 10),
    to: new Date(2014, 4),
    duration: '30 months',
    desc:
      '外派上海爱立信多媒体部门，主要基于爱立信IPTV系统的MSDK（JavaScript）的开发，将各厂商机顶盒集成到爱立信IPTV的解决方案。',
    projects: [
      {
        key: 'CIEnet project-1',
        name: 'IODT',
        responsibilities:
          ' 使用JavaScript开发Device Module，适配机顶盒API和爱立信MSDK接口;测试，验收厂商机顶盒的FW。',
      },
    ],
  },
  {
    key: 'ZTE Soft',
    companyName: 'ZTE Soft',
    title: 'Specialist',
    from: new Date(2010, 7),
    to: new Date(2011, 9),
    duration: '14 months',
    desc: '上海联通项目组，负责现场需求，报表的分析和开发，维护工作。',
    projects: [],
  },
  {
    key: 'Synnex',
    companyName: 'Synnex',
    title: 'Specialist',
    from: new Date(2008, 7),
    to: new Date(2010, 7),
    duration: '24 months',
    desc: '公司内部ERP系统的开发维护。',
    projects: [],
  },
];

export default React.forwardRef(({ scrollToNext }, ref) => {
  const [currentCompany, setCurrentCompany] = useState(0);
  const titleTranslateY = useViewPercentage(ref);

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
        Working Period
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
                  {company.from.getUTCFullYear()}.{company.from.getMonth()} -{' '}
                  {company.to ? company.to.getUTCFullYear() + '.' : 'now'}
                  {company.to && company.to.getMonth()}
                  &nbsp;&nbsp; {company.duration}
                </div>
                <div className={styles.companyTitle}>SE</div>
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
                        <span className={styles.projectDescTitle}>描述</span>
                        <p
                          dangerouslySetInnerHTML={{ __html: project.desc }}
                        ></p>
                      </div>
                      <div className={styles.projectResp}>
                        <span className={styles.projectRespTitle}>职责</span>
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
