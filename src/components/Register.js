import React from 'react';
import EntryForm from './EntryForm';
import {Link} from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
 
  function handleEmailChange (e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(
      password,
      email
    )
  }

  return (
    <EntryForm name='register' title='Регистрация'  
                   onSubmit={handleSubmit}>    
      <input className="popup__input popup__input_for_entry popup__input_type_email" type="Email" name="email" id="email" 
             value={email || ''} placeholder="Email" minLength="2" maxLength="40" required 
             onChange={handleEmailChange} />
      <span className="popup__input-error popup__input-error_active" id="email-error"></span>
      <input className="popup__input popup__input_for_entry popup__input_type_password" type="password" name="password" id="password" 
             value={password || ''} placeholder="Пароль" minLength="6" maxLength="20" required
             onChange={handlePasswordChange} />
      <span className="popup__input-error popup__input-error_active" id="password-error"></span>
      <button className="popup__button-save popup__button-save_for_entry" type="submit">Зарегистрироваться</button>
      <p className={"popup__span-text"}>Уже зарегистрированы? 
        <Link to={'sign-in'} className={"popup__span-link"}> Войти</Link>
      </p>
    </EntryForm>
  )  
}

export default Register;