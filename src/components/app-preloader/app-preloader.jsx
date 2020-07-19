import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLoadingStatus, getOfflineStatus} from '../../reducer/application/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {getCity, getCities} from '../../reducer/data/selectors.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import OfflineScreen from '../offline-screen/offline-screen.jsx';
import App from '../app/app.jsx';

class AppPreloader extends PureComponent {
  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    const {handleFetchingHotels, handleFetchingAuth, handleLoadingStatus, handleOfflineStatus} = this.props;
    handleLoadingStatus(true);
    const loadTasks = [
      handleFetchingAuth(),
      handleFetchingHotels(),
    ];

    Promise.all(loadTasks)
      .catch(handleOfflineStatus);
  }

  componentDidUpdate() {
    const {isLoading, cityList, handleFirstCity, handleLoadingStatus} = this.props;
    if (isLoading && cityList.length > 0) {
      handleFirstCity(cityList);
      handleLoadingStatus(false);
    }
  }

  render() {
    const {isLoading, isOffline, activeCity} = this.props;

    if (isOffline) {
      return <OfflineScreen />;
    }

    if (isLoading || activeCity === undefined) {
      return null;
    }

    return <App />;
  }
}

AppPreloader.propTypes = {
  handleFetchingAuth: PropTypes.func.isRequired,
  handleFetchingHotels: PropTypes.func.isRequired,
  handleLoadingStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOffline: PropTypes.bool.isRequired,
  cityList: PropTypes.array.isRequired,
  activeCity: PropTypes.shape(),
  handleFirstCity: PropTypes.func.isRequired,
  handleOfflineStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cityList: getCities(state),
    activeCity: getCity(state),
    isLoading: getLoadingStatus(state),
    isOffline: getOfflineStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleFetchingHotels() {
    return dispatch(DataOperation.loadCitiesWithApartments());
  },
  handleFetchingAuth() {
    return dispatch(UserOperation.checkAuthorization());
  },
  handleLoadingStatus(newLoadingStatus) {
    dispatch(ActionCreator.changeLoadingStatus(newLoadingStatus));
  },
  handleFirstCity(cityList) {
    dispatch(ActionCreator.changeCity(cityList[0].id));
  },
  handleOfflineStatus() {
    dispatch(ActionCreator.setOffline());
  },
});

export {AppPreloader};
export default connect(mapStateToProps, mapDispatchToProps)(AppPreloader);
