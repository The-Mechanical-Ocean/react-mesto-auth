import React from 'react';
import Card from '../components/Card'
import Footer from '../components/Footer';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <>
    <main className="content">
      <section className="profile">
        <button onClick={props.onEditAvatar} className="profile__button-avatar" aria-label="редактировать аватар" type="button">
          <img alt="аватар" className="profile__avatar" src={currentUser.avatar} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} type="button" className="profile__button-edit"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__button-add"></button>
      </section>
      <section className="cards">
        <ul className="cards__items">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} 
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onDeleteClick={props.onDeleteClick}
              // onDeleteConfirm={props.onDeleteConfirm} 
              />
          ))}
        </ul>
      </section>
    </main>
    <Footer />
    </>
  )    
}

export default Main;