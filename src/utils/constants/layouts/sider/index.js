export const menu = [
  {
    title: '员工自助平台',
    path: '/JM/home',
    icon: 'home',
  },
  {
    title: '招聘管理',
    path: '/JM/recruitment',
    icon: 'home',
    children: [
      {
        title: '岗位需求',
        path: '/JM/recruitment/jobDemand',
      },
      {
        title: '人才管理',
        path: '/JM/recruitment/talent',
        children: [
          {
            title: '人才库',
            path: '/JM/recruitment/talent/talentPool',
          },
          {
            title: '我的关注',
            path: '/JM/recruitment/talent/myFocus',
          },
          {
            title: '联系提醒',
            path: '/JM/recruitment/talent/remind',
          },
        ],
      },
    ],
  },
];
