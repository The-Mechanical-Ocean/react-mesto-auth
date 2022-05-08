import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import okImg from '../images/infotooltip__ok-auth.svg';
import errorImg from '../images/infotooltip__error-auth.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import '../index.css'
import Header from './Header';
import Main from './Main'
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from "./InfoTooltip";
import {register, authorize, checkToken} from '../utils/auth';
import {api} from '../utils/api.js';

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(null);

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

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisDeleteConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }
  
  React.useEffect(() => {
    handleCheckToken();
    if (loggedIn) {
      history.push('/');
      Promise.all([api.getInitialCards(), api.getProfile()])
        .then(([cards, resUser]) => {
          setCards(cards);
          setCurrentUser(resUser);
        })
        .catch((err) =>{console.log(`Ошибка: ${err}`)})        
    }
  }, [loggedIn])

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
  
  function handleOnRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setInfoTooltipOpen(true)
          setStatusMessage(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
        })
      .finally(() => setInfoTooltipOpen(true))        
  }

  function handleOnLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        if (res) {
          setEmail(email);
          localStorage.setItem('jwt', res.token);
          handleLoggedIn()
          history.push('/');
        }
      })
      .catch(() => {
        setInfoTooltipOpen(true);  
        setStatusMessage(false);    
      })
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      checkToken(jwt)
      .then((res) => {
        if (res) {
          setEmail({email: res.data.email});
          handleLoggedIn();
        }
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)})
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} 
                onOut={handleLogout}
        />
        <Switch>
        <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn} 
          component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          onDeleteClick={handleCardDelete} 
          onDeleteCard={handleCardDelete}>
        </ProtectedRoute>         
        
        <Route path='/sign-in'>
          <Login 
            onLogin={handleOnLogin} 
          />
        </Route>
        <Route path='/sign-up'>
          <Register 
          onRegister={handleOnRegister}
          />
        </Route>
        <Route path='*'>
          {loggedIn ?   <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
        </Switch>
        <InfoTooltip
        name={'info-tool'}
        onClose={closeAllPopups} 
        isOpen={infoTooltipOpen} 
        img={statusMessage ? okImg : errorImg} 
        text={statusMessage ? 'Вы успешно зарегистрировались!'
                            : 'Что-то пошло не так! Попробуйте ещё раз.'}    
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser} /> 
        <DeleteConfirmPopup 
                            isOpen={isDeleteConfirmPopupOpen} 
                            onClose={closeAllPopups}
                            onDeleteCard={handleCardDelete} />
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