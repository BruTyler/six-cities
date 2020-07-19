import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.APPLICATION;

export const getCityId = (state) => state[NAME_SPACE].cityId;
export const getSortType = (state) => state[NAME_SPACE].sortType;
export const getLoadingStatus = (state) => state[NAME_SPACE].isLoading;
export const getOfflineStatus = (state) => state[NAME_SPACE].isOffline;
