import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Header from '../header/header';
import {AppRoute} from '../../const';
import history from '../../history';

class AuthScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onLoginSubmit} = this.props;
    evt.preventDefault();
    const login = this.loginRef.current.value;
    const password = this.passwordRef.current.value;

    onLoginSubmit({login, password})
      .then(history.push(AppRoute.ROOT));
  }

  render() {
    const {authInfo, activeCity} = this.props;

    return <div className="page page--gray page--login">
      <Header
        authInfo={authInfo}
      />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={this.handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={this.loginRef} autoComplete="email" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={this.passwordRef} autoComplete="current-password" />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.ROOT}
              >
                <span>{activeCity.id}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>;
  }
}

AuthScreen.propTypes = {
  authInfo: PropTypes.shape(),
  onLoginSubmit: PropTypes.func.isRequired,
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
};

export default AuthScreen;