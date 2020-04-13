export const sourceChannelMap = {
  boss: 'BOSS',
  liepin: '猎聘',
  lagou: '拉钩',
  58: '58同城',
  qcwy: '前程无忧',
};

function validatePhoneNumber(rule, value, callback) {
  if (!/^[1][3-8][0-9]{9}$/.test(value)) {
    callback('手机号码不符合规范!');
  } else {
    callback();
  }
}

export const talentPoolForm = {
  basic: [
    {
      label: '姓名',
      value: 'name',
      rules: [{ required: true, message: '请填写姓名' }],
    },
    {
      label: '负责人',
      value: 'principal',
      rules: [{ required: true, message: '请填写负责人' }],
    },
    {
      label: '手机号码',
      value: 'phoneNumber',
      rules: [{ required: true, message: '请填写手机号码' }, { validator: validatePhoneNumber }],
    },
    {
      label: '电子邮箱',
      value: 'email',
      rules: [
        { required: true, message: '请填写电子邮箱' },
        {
          type: 'email',
          message: '电子邮箱格式不对',
        },
      ],
    },
    {
      label: '微信',
      value: 'wechart',
    },
    {
      label: '公司',
      value: 'company',
    },
    {
      label: '居住地址',
      value: 'address',
    },
    {
      label: '最高学历',
      value: 'education',
      component: 'select',
      options: [
        {
          label: '小学及以下',
          value: 'primarySchool',
        },
        {
          label: '初中',
          value: 'juniorHighSchool',
        },
        {
          label: '高中',
          value: 'highSchool',
        },
        {
          label: '本科',
          value: 'university',
        },
        {
          label: '研究生',
          value: 'postgraduate',
        },
        {
          label: '博士及以上',
          value: 'PhD',
        },
      ],
    },
    {
      label: '匹配岗位',
      value: 'matchingPositions',
    },
    {
      label: '所学专业',
      value: 'major',
    },
    {
      label: '来源渠道',
      value: 'sourceChannel',
      component: 'select',
      options: [
        {
          label: 'BOSS',
          value: 'boss',
        },
        {
          label: '猎聘',
          value: 'liepin',
        },
        {
          label: '拉钩',
          value: 'lagou',
        },
        {
          label: '58同城',
          value: '58',
        },
        {
          label: '前程无忧',
          value: 'qcwy',
        },
        {
          label: '同事介绍',
          value: 'introduction',
        },
        {
          label: '其他',
          value: 'other',
        },
      ],
    },
  ],
  classified: [
    {
      label: '可跟进性分析',
      value: 'followAnalysis',
      component: 'select',
      options: [
        {
          label: '重点跟进对象',
          value: 'emphasis',
        },
        {
          label: '非重点跟进对象',
          value: 'untemphasis',
        },
        {
          label: '不合适',
          value: 'unsuitable',
        },
        {
          label: '已经入职其他公司',
          value: 'other',
        },
      ],
    },
    {
      label: '人才级别',
      value: 'talentLevel',
      component: 'select',
      options: [
        {
          label: '紧跟A类',
          value: 'follow',
        },
        {
          label: '意向B类',
          value: 'intention',
        },
        {
          label: '培育C类',
          value: 'train',
        },
        {
          label: '基础D类',
          value: 'basic',
        },
      ],
    },
    {
      label: '人才漏斗分析',
      value: 'funnelAnalysis',
      component: 'select',
      options: [
        {
          label: '跟进阶段',
          value: 'follow',
        },
        {
          label: '意向确认阶段',
          value: 'intention',
        },
        {
          label: '部门面试阶段',
          value: 'departmentInterview',
        },
        {
          label: 'HR面试',
          value: 'HRInterview',
        },
        {
          label: '入职阶段',
          value: 'onboarding',
        },
        {
          label: '已转正',
          value: 'normalized',
        },
      ],
    },
  ],
  resume: [
    {
      label: '简历描述',
      value: 'description',
      component: 'textArea',
    },
    {
      label: '人员简历',
      value: 'resume',
      component: 'upload',
    },
  ],
  interview: [
    {
      label: '面试时间',
      value: 'interviewDate',
      component: 'datePicker',
    },
    {
      label: '面试人员',
      value: 'interviewPerson',
      component: 'select',
      options: [],
    },
    {
      label: '面试形式',
      value: 'interviewForm',
      component: 'select',
      options: [
        {
          label: '现场面试',
          value: 'onSiteInterview',
        },
        {
          label: '电话面试',
          value: 'phoneInterview',
        },
        {
          label: '视频面试',
          value: 'videoInterview',
        },
        {
          label: '复试',
          value: 'retest',
        },
        {
          label: '入职前沟通',
          value: 'preEmployment',
        },
      ],
    },
    {
      label: '面试结果',
      value: 'interviewResult',
      component: 'select',
      options: [
        {
          label: '待考察',
          value: 'toBeInvestigated',
        },
        {
          label: '通过',
          value: 'pass',
        },
        {
          label: '未通过',
          value: 'unPass',
        },
        {
          label: '其他',
          value: 'other',
        },
      ],
    },
    {
      label: '面试记录',
      value: 'interviewRecord',
      component: 'textArea',
    },
  ],
};
