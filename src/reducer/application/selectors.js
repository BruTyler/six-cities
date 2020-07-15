import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.APPLICATION;

export const getCityId = (state) => {
  return state[NAME_SPACE].cityId;
};

export const getSortType = (state) => {
  return state[NAME_SPACE].sortType;
};
