import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [photoName, setPhotoName] = React.useState('');
  const [photoLink, setPhotoLink] = React.useState('');

  React.useEffect(() => {
    setPhotoName('');
    setPhotoLink('');
  }, [props.isOpen]);

  function handleNameInput(e) {
    setPhotoName(e.target.value)
  }

  function handleLinkInput(e) {
    setPhotoLink(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onUpdateCard({
      name: photoName,
      link: photoLink,
    });
  }

  return (
    <PopupWithForm name='form-add-card' title='Новое место' buttonText='Создать' 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleAddPlaceSubmit}>
      <input className="popup__input popup__input_type_name-img" type="text" name="name-img" id="img" 
             value={photoName || ''} placeholder="Название" minLength="2" maxLength="30" required
             onChange={handleNameInput} />
      <span className="popup__input-error popup__input-error_active" id="img-error"></span>
      <input className="popup__input popup__input_type_link" type="url" name="link-img" id="link" 
             value={photoLink || ''} placeholder="Ссылка на картинку" required
             onChange={handleLinkInput} />
      <span className="popup__input-error popup__input-error_active" id="link-error"></span>
    </PopupWithForm>    
  )  
}

export default AddPlacePopup;