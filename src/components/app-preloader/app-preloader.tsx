import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLoadingStatus, getOfflineStatus} from '../../reducer/application/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {getCity, getCities} from '../../reducer/data/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';
import {Operation as UserOperation} from '../../reducer/user/user';
import OfflineScreen from '../offline-screen/offline-screen';
import App from '../app/app';
import {ErrorStatus} from '../../api';

class AppPreloader extends React.PureComponent {
  constructor(props) {
    super(props);
    this._init();
  }

  _init() {
    const {handleFetchingHotels, handleFetchingAuth, handleLoadingStatus, handleOfflineStatus} = this.props;

    const onErrorCatch = (error) => {
      if (error.response.status !== ErrorStatus.UNAUTHORIZED) {
        handleOfflineStatus();
      }
    };

    handleLoadingStatus(true);
    handleFetchingAuth(onErrorCatch);
    handleFetchingHotels(onErrorCatch);
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
  handleFetchingHotels(onErrorCatch) {
    dispatch(DataOperation.loadCitiesWithApartments())
      .catch(onErrorCatch);
  },
  handleFetchingAuth(onErrorCatch) {
    dispatch(UserOperation.checkAuthorization())
      .catch(onErrorCatch);
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
