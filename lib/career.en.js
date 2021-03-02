export default [
  {
    key: 'No',
    companyName: '',
    from: new Date(2020, 7).toUTCString(),
    desc:
      'Participate in a startup project as a full stack engineer. <p/> <a target="_blank" href="https://doxauto.com">https://doxauto.com</a>',
    projects: [
      {
        key: 'No project-1',
        name: 'DoxAuto',
        tech: ['SpringBoot', 'MongoDB', 'React', 'Material UI'],
        desc:
          'VC contract is very complex, the format is different in different condition. ' +
          'Many risk points need to be checked in the contract. It needs an experienced lawyer to prepare the VC contract with the customers, ' +
          'and it is easy to make mistake.\n' +
          'Lawyer can define a survey and a word template with predefine syntax in DoxAuto, ' +
          'DoxAuto can generate the contract with the answer of the customer and warn the risk in contract.',
        responsibilities:
          'Develop the whole project include both frontend and backend.\n' +
          'Iterate several web page theme.',
      },
    ],
  },
  {
    key: 'Huawei',
    companyName: 'Huawei',
    title: 'SE',
    from: new Date(2018, 5).toUTCString(),
    to: new Date(2020, 6).toUTCString(),
    duration: '25 months',
    desc:
      'Take responsibility for the architecture of frontend, setup and improve the frontend build process. develop the core features in frontend.\n' +
      'Work as one of the architecture owner of the backend, take responsibility for some design works and develop works in backend.\n' +
      'Using Golang, Mysql, mongoDB, kafka, k8s/docker, angluarjs, react',
    projects: [
      {
        key: 'Huawei project-1',
        name: 'Kupeng Performance Tuning Tool - Java Performance',
        tech: [
          'SpringBoot',
          'Java Instrument',
          'JFR',
          'SQLite',
          'React',
          'Material UI',
        ],
        desc:
          "The Kunpeng performance Tuning tool suit, as part of Huawei's Kunpeng server ecosystem, is used to\n" +
          'help developers to find and optimize the performance issues. ' +
          'Java performance tool is used for performance monitoring and tuning of the Java programs. It has two ways to monitoring the Java programs: pro\n' +
          'filing and sampling.',
        responsibilities:
          'Chose the technology stack of the frontend, and setup the frontend build process.\n' +
          'Analysis the user scenario and design the pages with UCD team.\n' +
          'Develop the basic function with react, material-ui, echart and d3js.\n' +
          'Discuss and decide the backend architecture with other SEs.\n' +
          'Develop the server management and alert event service in backend.\n' +
          'Security problem fix after security scan.\n' +
          'Write design and production document.',
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
          "The expert from the Shanghai SE team analyzed the composition of Huawei's customers and the products " +
          'of other vendors and proposed the FusionDirector online.',
        responsibilities:
          'Chose the technology stack of the frontend, and setup the frontend build process.\n' +
          'Analysis the user scenario and design the pages with UCD team.\n' +
          'Develop the basic function with react and material-ui.\n' +
          'Discuss and decide the backend architecture with other SEs.\n' +
          'Develop the server management and alert event service in backend.',
      },
      {
        key: 'Huawei project-3',
        name: 'FusionDirector',
        tech: ['Beego', 'GaussDB', 'RabbitMQ', 'Redis', 'Angularjs'],
        desc:
          "The expert from the Shanghai SE team analyzed the composition of Huawei's customers and the products " +
          'of other vendors and proposed the FusionDirector online',
        responsibilities:
          'Visualize the network configuration of Enclosure server with angularjs and jsplumb.\n' +
          'Improve the frontend build process, include remove mock data from production code; introduce proxy ' +
          'server to help debug in test environment, standardize the restful API. Introduce swagger to document restful ' +
          'API to improve the communicate between frontend and backend developers.\n' +
          'Work as the designer of fundamental architecture, response for the design of Scope based Access Control.',
      },
    ],
  },
  {
    key: 'HPE',
    companyName: 'Hewlett Packard Enterprise',
    title: 'Specialist',
    from: new Date(2015, 4).toUTCString(),
    to: new Date(2018, 4).toUTCString(),
    duration: '36 months',
    desc:
      'Work as the architecture owner of scrum team. response for some design works and develop work in both frontend and backend.\n' +
      'Using java, Nodejs, PostgreSQL, Elasticsearch, jQuery, react.',
    projects: [
      {
        key: 'HPE project-1',
        name: 'OneView Global Dashboard',
        tech: ['expressjs', 'ElasticSearch', 'React', 'Grommet'],
        desc:
          'Due to OneView performance limitations, OneView Global Dashboard is used to manage multiple OneViews.\n' +
          "It is based on HPE's Atlas(a customized VM image), using express, react and elastic search for this project.",
        responsibilities:
          'Frontend development with react and grommet;\n' +
          'Backend development with expressJS and Elasticsearch;\n' +
          'Problem fixes after security scan.\n' +
          'Pre-search the UI automation test framework; automation the main business workflow with selenium webdriverIO.\n' +
          'Code refine and improve, using typescript instead of javascript; removing deprecated library with babel travels',
      },
      {
        key: 'HPE project-2',
        name: 'OneView',
        tech: ['Spring', 'PostgreSQL', 'Jquery', 'requirejs'],
        desc:
          'HP OneView is a management system which is used to manage the Server hardware produced by HP.\n' +
          'The frontend was developed with JQuery, the backend was developed with Spring MVC, PostgreSQL.',
        responsibilities:
          'Develop and maintain the Server microservice in frontend and backend.',
      },
    ],
  },
  {
    key: 'Ericsson',
    companyName: 'Ericsson',
    title: 'Senior Engineer',
    from: new Date(2014, 7).toUTCString(),
    to: new Date(2015, 4).toUTCString(),
    duration: '9 months',
    desc:
      'Take responsibility for developing and maintaining the multimedia broadcasting management system.\n' +
      'Using OSGI, PostgreSQL, backboneJs.',
    projects: [
      {
        key: 'Ericsson project-1',
        name: 'Broadcast Multimedia Management System',
        desc: 'Broadcast management system to manage the broadcast centers.',
        responsibilities:
          'Develop the web page to display broadcast center on the map with backbone and an opensource GIS map library. ' +
          'Develop the rest API to manage the broadcast center with OSGI.',
      },
      {
        key: 'Ericsson project-2',
        name: 'IODT',
        desc: 'Integrate various STBs into Ericsson IPTV solutions',
        responsibilities:
          'Develop the Device module library to adapt the media player related js API to a uniform API defined by\n' +
          'Ericsson, so that the Ericsson html portal can run across different STB without compatible problem.\n' +
          'Doing integration test on these STBs. then debugging and analyzing the issues found in integration test,\n' +
          'finding out the reason and assigning it to related teams or STB vendors.\n' +
          'Get knowledge of new things during this period, technologies like git, jenkins, testlink, docker. workflow like scrum and CI.',
      },
    ],
  },
  {
    key: 'CIEnet',
    companyName: 'CIEnet',
    title: 'Senior Engineer',
    from: new Date(2011, 10).toUTCString(),
    to: new Date(2014, 4).toUTCString(),
    duration: '30 months',
    desc:
      'Work as a consultant in Ericsson IPTV department.\n' +
      'Take responsibility for developing the javascript library for browser of different STB provided by many vendors. ' +
      'Make Ericsson html portal can run across these browser without compatible problem.',
    projects: [
      {
        key: 'CIEnet project-1',
        name: 'IODT',
        desc: 'Integrate various STBs into Ericsson IPTV solutions',
        responsibilities:
          'Develop the Device module library to adapt the media player related js API to a uniform API defined by\n' +
          'Ericsson, so that the Ericsson html portal can run across different STB without compatible problem.\n' +
          'Doing integration test on these STBs. then debugging and analyzing the issues found in integration test,\n' +
          'finding out the reason and assigning it to related teams or STB vendors.\n' +
          'Get knowledge of new things during this period, technologies like git, jenkins, testlink, docker. workflow like scrum and CI.',
      },
    ],
  },
  {
    key: 'ZTE Soft',
    companyName: 'ZTE Soft',
    title: 'Java Engineer',
    from: new Date(2010, 7).toUTCString(),
    to: new Date(2011, 9).toUTCString(),
    duration: '14 months',
    desc:
      'Work as java developer in the Shanghai Unicom project team. response for developing and maintaining\n' +
      'OSS system and report system.\n' +
      'Using SSH framework, oracle, SQL server, jQuery.',
    projects: [],
  },
  {
    key: 'Synnex',
    companyName: 'Synnex',
    title: 'Java Engineer',
    from: new Date(2008, 7).toUTCString(),
    to: new Date(2010, 7).toUTCString(),
    duration: '24 months',
    desc:
      'Work as java developer to develop the ERP system used internally.\n' +
      'Using SSH framework, oracle, jquery.',
    projects: [],
  },
];
