import { request } from 'utils/request';

export function getTalentPool(params) {
  return request({
    method: 'GET',
    url: '/api/talent',
    params,
  });
}

export function createTalent(data) {
  return request({
    method: 'POST',
    url: '/api/talent/create',
    data,
  });
}

export function toggleFavorite(data) {
  return request({
    method: 'PUT',
    url: '/api/talent/toggleFavorite',
    data,
  });
}

export function getTalentContactList(data) {
  return request({
    method: 'POST',
    url: '/api/talent/contactList',
    data,
  });
}
