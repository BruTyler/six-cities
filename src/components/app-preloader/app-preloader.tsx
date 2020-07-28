import * as React from 'react';
import {connect} from 'react-redux';
import {getLoadingStatus, getOfflineStatus} from '../../reducer/application/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {getCity, getCities} from '../../reducer/data/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';
import {Operation as UserOperation} from '../../reducer/user/user';
import OfflineScreen from '../offline-screen/offline-screen';
import App from '../app/app';
import {ErrorStatus} from '../../api';
import {City} from '../../types';

interface ErrorCatcher {
    (error: Error): void;
}

interface Props {
  handleFetchingAuth: (onErrorCatch: ErrorCatcher) => void;
  handleFetchingHotels: (onErrorCatch: ErrorCatcher) => void;
  handleLoadingStatus: (newLoadingStatus: boolean) => void;
  isLoading: boolean;
  isOffline: boolean;
  cityList: Array<City>;
  activeCity?: City;
  handleFirstCity: (cityList: Array<City>) => void;
  handleOfflineStatus: () => void;
}

class AppPreloader extends React.PureComponent<Props> {
  constructor(props: Props) {
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
