export const getJobsAction = (data, callback) => ({
  type: 'job/getJobs',
  payload: data,
  callback,
});

export const createJobAction = data => ({
  type: 'job/createJob',
  payload: data,
});

export const getJobDetailAction = _id => ({
  type: 'job/getJobDetail',
  payload: { _id },
});

export const deleteJobAction = _id => ({
  type: 'job/deleteJob',
  payload: { _id },
});
