import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header(props) {
  // const location = useLocation();
  const email = props.email;
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route exact path = '/'>
      <nav className="header__auth">
        <p className="header__text">{email}123</p>
        <Link className="header__button" type="button" onClick={props.onOut}>Выйти</Link>
      </nav>
      </Route>
      <Route path = '/sign-in'>
      <Link to = '/sign-up' className="header__button" type="button" onClick={props.onOut}>Зарегистрироваться</Link>
      </Route>
      <Route path = '/sign-up'>
      <Link to = '/sign-in' className="header__button" type="button" onClick={props.onOut}>Войти</Link>
      </Route>
      </Switch>
    </header>

  )
}

export default Header;