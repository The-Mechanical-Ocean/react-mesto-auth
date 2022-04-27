import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange (e) {
    setName(e.target.value);
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='form-profile' title='Редактировать профиль' buttonText='Сохранить' 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>    
      <input className="popup__input popup__input_type_name" type="text" name="firstname" id="firstname" 
             value={name || ''} placeholder="Ваше имя" minLength="2" maxLength="40" required 
             onChange={handleNameChange} />
      <span className="popup__input-error popup__input-error_active" id="firstname-error"></span>
      <input className="popup__input popup__input_type_job" type="text" name="description" id="description" 
             value={description || ''} placeholder="Описание" minLength="2" maxLength="200" required
             onChange={handleDescriptionChange} />
      <span className="popup__input-error popup__input-error_active" id="description-error"></span>
    </PopupWithForm>
  )  
}

export default EditProfilePopup;