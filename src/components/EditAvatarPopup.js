import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef('');

  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  function handleAvatarChange (e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' buttonText='Сохранить' 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}> 
      <input className="popup__input popup__input_type_avatar" type="url" name="link-avatar" id="avatar" 
             value={avatar} ref={avatarRef} placeholder="Ссылка на картинку" required  
             onChange={handleAvatarChange} />
      <span className="popup__input-error popup__input-error_active" id="avatar-error"></span>
    </PopupWithForm>    
  )  
}

export default EditAvatarPopup;