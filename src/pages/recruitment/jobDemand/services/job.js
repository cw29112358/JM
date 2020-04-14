import { request } from 'utils/request';

export function getJobs(params) {
  return request({
    method: 'GET',
    url: '/api/job',
    params,
  });
}

export function createJob(data) {
  return request({
    method: 'POST',
    url: '/api/job',
    data,
  });
}

export function getJobDetail(params) {
  return request({
    method: 'GET',
    url: '/api/job/detail',
    params,
  });
}

export function deleteJob(data) {
  return request({
    method: 'DELETE',
    url: '/api/job',
    data,
  });
}
