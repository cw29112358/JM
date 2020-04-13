export const jobDemandForm = {
  basic: [
    {
      label: '标题',
      value: 'title',
    },
    {
      label: '申请人',
      value: 'applicant',
    },
    {
      label: '编号',
      value: 'code',
    },
    {
      label: '申请部门',
      value: 'department',
    },
    {
      label: '申请日期',
      value: 'date',
      component: 'datePicker',
    },
    {
      label: '增补岗位名称',
      value: 'jobName',
    },
    {
      label: '岗位序列',
      value: 'jobSequence',
    },
    {
      label: '需求人数',
      value: 'demand',
    },
    {
      label: '增补理由',
      value: 'reasons',
    },
    {
      label: '用工来源',
      value: 'source',
    },
    {
      label: '工作性质',
      value: 'jobNature',
    },
    {
      label: '岗位职责',
      value: 'jobResponsibilities',
      component: 'textArea',
    },
  ],
  recruitmentNeeds: [
    {
      label: '学历',
      value: 'education',
    },
    {
      label: '工作经验',
      value: 'experience',
    },
    {
      label: '工作地点',
      value: 'address',
    },
    {
      label: '年龄下限',
      value: 'minimumAge',
    },
    {
      label: '年龄上限',
      value: 'maximumAge',
    },
    {
      label: '薪资下限',
      value: 'minimumSalary',
    },
    {
      label: '薪资上限',
      value: 'maximumSalary',
    },
    {
      label: '专业',
      value: 'profession',
    },
    {
      label: '英语等级',
      value: 'englishLevel',
    },
    {
      label: '其他',
      value: 'other',
    },
  ],
  attachmentInfo: [
    {
      label: '相关附件',
      value: 'attachmentInfo',
      component: 'upload',
    },
  ],
};

export const jobStatusMapping = {
  unpublished: '未发布',
  published: '已发布',
};

export const jobListMapping = {
  title: '标题',
  applicant: '申请人',
  code: '编码',
  department: '申请部门',
  date: '申请日期',
  jobName: '增补岗位名称',
  jobSequence: '岗位序列',
  demand: '需求人数',
  reasons: '增补理由',
  source: '用工来源',
  jobNature: '工作性质',
  jobResponsibilities: '岗位职责',
  education: '学历',
  experience: '工作经验',
  address: '工作地点',
  minimumAge: '年龄下限',
  maximumAge: '年龄上限',
  minimumSalary: '薪资下限',
  maximumSalary: '薪资上限',
  profession: '专业',
  englishLevel: '英语等级',
  jobStatus: '岗位状态',
  other: '其他',
};
