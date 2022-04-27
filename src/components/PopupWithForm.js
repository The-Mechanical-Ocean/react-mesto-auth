import React from 'react';

function PopupWithForm(props) {
  const name = props.name;
  const title = props.title; 
  const buttonText = props.buttonText;
  const children = props.children;
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__button-close" 
                onClick={onClose}></button>
        <h2 className={`popup__name-form popup__name-form${props.name}`}>{title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={name} onSubmit={props.onSubmit}>
          {children}
        <button className="popup__button-save" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;