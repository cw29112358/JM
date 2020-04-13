export const getTalentPoolAction = (data, callback) => ({
  type: 'talent/getTalentPool',
  payload: data,
  callback,
});

export const getTalentListAction = (data, callback) => ({
  type: 'talent/getTalentList',
  payload: data,
  callback,
});

export const createTalentAction = data => ({
  type: 'talent/createTalent',
  payload: data,
});

export const toggleFavoriteAction = (id, favorite) => ({
  type: 'talent/toggleFavorite',
  payload: {
    id,
    favorite,
  },
});

export const getTalentContactListAction = (data, callback) => ({
  type: 'talent/getTalentContactList',
  payload: data,
  callback,
});
