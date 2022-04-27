import React from 'react';
import '../index.css'
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleDeleteConfirmClick () {
    setisDeleteConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisDeleteConfirmPopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch((err) =>{console.log(`Ошибка: ${err}`)})
  }, [])  

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) =>{console.log(`Ошибка: ${err}`)})
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id) 
      .then(() => {setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})
  }

  React.useEffect(() => {
    api.getProfile()
      .then((res) => {
        setCurrentUser(res)  
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})
  }, [])  
 
  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})   
  }

  function handleUpdateAvatar(user) {
    api.setAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})   
  }

  function handleUpdateCard(card) {
    api.addCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})   
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
              onDeleteClick={handleDeleteConfirmClick} 
              onDeleteCard={handleCardDelete} 
              />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser} /> 
        <DeleteConfirmPopup 
                            isOpen={isDeleteConfirmPopupOpen} 
                            onClose={closeAllPopups}
                            onDeleteCard={handleCardDelete}
                            />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} 
                       onClose={closeAllPopups}
                       onUpdateCard={handleUpdateCard} />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;