import React from 'react';

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__button-close popup__button-close_type_img-card" 
                onClick={props.onClose}></button>
        <img className="popup__img popup__img_tooltip" src={props.img} alt='Значок результата операции'/>
        <h2 className={`popup__name-form popup__name-form${props.name}`}>{props.text}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;