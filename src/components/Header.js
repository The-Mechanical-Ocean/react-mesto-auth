import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  const email = props.email;
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route exact path='/'>
        <nav className="header__auth">
          <p className="header__text">{email}</p>
          <Link className="header__link" type="button" onClick={props.onOut}>Выйти</Link>
        </nav>
        </Route>
        <Route path='/sign-in'>
        <Link className="header__link" to='sign-up' >Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
        <Link className="header__link" to='sign-in' >Войти</Link>
        </Route>
      </Switch>
    </header>
  )
}

export default Header; 