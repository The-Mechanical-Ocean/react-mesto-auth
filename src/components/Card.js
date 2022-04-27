import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`cards__button-del ${!isOwn && 'cards__button-del_hiden'}`);
  const cardLikeButtonClassName = (`cards__button-like ${isLiked && 'cards__button-like_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  return (
    <li className="cards__item">
      <button className={cardDeleteButtonClassName} type="button" 
              onClick={handleDeleteClick} >

      </button>
      <img className="cards__img" alt={props.card.name} src={props.card.link} 
           onClick={handleClick} />
      <div className="cards__description">
        <h2 className="cards__text">{props.card.name}</h2>
        <div className="cards__button-like-container">
          <button className={cardLikeButtonClassName} type="button"  
                  onClick={handleLikeClick}></button>
          <span className="cards__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>            
  )
}

export default Card;