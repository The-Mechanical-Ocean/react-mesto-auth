import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm title='Вы уверены?' name='form-delete-confirm' buttonText='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}  
      onSubmit={handleSubmit}>
    </PopupWithForm>    
  )  
}

export default  DeleteConfirmPopup;