import React from 'react';

function ImagePopup(props) {
  return(
    <div className={`popup popup_type_image ${props.card.name && 'popup_opened'}`}>
      <div className="popup__card">
        <button type="button" className="popup__button-close popup__button-close_type_img-card" 
                onClick={props.onClose}></button>
        <img className="popup__img" alt={props.card.name} src={props.card.link}/>
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </div>
    </div>
  )
}

export default ImagePopup;