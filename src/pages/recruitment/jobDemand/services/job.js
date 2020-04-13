import { request } from 'utils/request';

export function getJobs(params) {
  return request({
    method: 'GET',
    url: '/api/job/jobs',
    params,
  });
}

export function createJob(data) {
  return request({
    method: 'POST',
    url: '/api/job/create',
    data,
  });
}

export function getJobDetail(params) {
  return request({
    method: 'GET',
    url: '/api/job/jobDetail',
    params,
  });
}

export function deleteJob(data) {
  return request({
    method: 'DELETE',
    url: '/api/job/deleteJob',
    data,
  });
}
