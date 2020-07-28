import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as application} from './application/application';
import {reducer as user} from './user/user';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APPLICATION]: application,
  [NameSpace.USER]: user,
});
