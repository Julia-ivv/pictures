import "./style.css";

import {Api} from "./js/api.js";
import {FormValidator} from "./js/formValidator.js";
import {UserInfo} from "./js/userInfo.js";
import {Popup} from "./js/popup.js";
import {CardList} from "./js/cardList.js";
import {Card} from "./js/card.js";
//import "./js/initialCards.js";

(function () {
    
    /* Переменные */
  
    const textError = {
      validLength: 'Должно быть от 2 до 30 символов',
      validLink: 'Здесь должна быть ссылка',
      validInput: 'Это обязательное поле'
    };
  
    const api = new Api({
      baseUrl: 'https://praktikum.tk/cohort10/',
      headers: {
        authorization: '34026b16-5c88-47b4-844e-005df83aee71',
        'Content-Type': 'application/json'
      }
    });
  
    const addButton = document.querySelector('.user-info__button');
    const editInfoButton = document.querySelector('.user-info__edit-button');
    const placesList = document.querySelector('.places-list');
  
    const formNewElement = document.querySelector('#new');
    const formEditElement = document.querySelector('#edit');
    const formAvatarElement = document.querySelector('#avatar');
  
    const popupEdit = document.querySelector('#popup-edit');
    const popupNew = document.querySelector('#popup-add');
    const popupOpen = document.querySelector('#popup-open');
    const popupAvatar = document.querySelector('#popup-avatar');
  
    const closeEditButton = popupEdit.querySelector('.popup__close');
    const closeNewButton = popupNew.querySelector('.popup__close');
    const closeOpenButton = popupOpen.querySelector('.popup__close');
    const closeAvatarButton = popupAvatar.querySelector('.popup__close');
  
    const popupNewClass = new Popup(popupNew);
    const popupEditClass = new Popup(popupEdit);
    const popupOpenClass = new Popup(popupOpen);
    const popupAvatarClass = new Popup(popupAvatar);
    
    const userNameElement = document.querySelector('.user-info__name');
    const userJobElement = document.querySelector('.user-info__job');
    const userPhotoElement = document.querySelector('.user-info__photo');
    const newNameElement = popupEdit.querySelector('.popup__input_type_name');
    const newJobElement = popupEdit.querySelector('.popup__input_type_job');
    
    const validEdit = new FormValidator(popupEdit, textError);
    const validNew = new FormValidator(popupNew, textError);
    const validAvatar = new FormValidator(popupAvatar, textError);
    const apiError = (err) => console.log(err);
  
    const userCard = (card, userId, requests) => new Card().create(card, userId, api);
    const list = new CardList(placesList, userCard);
    const userInformationClass = new UserInfo(newNameElement, newJobElement, userNameElement, userJobElement, userPhotoElement);  
  
    /* Функции */
  
    // Меняет название кнопки при загрузке данных
    function changeBtnTitle(btn, newTitle) {
      btn.textContent = newTitle;
    }
  
    // Добавление новой карточки
    function addNewCard(event) {
      event.preventDefault();
      const name = popupNew.querySelector('.popup__input_type_name').value;
      const link = popupNew.querySelector('.popup__input_type_link-url').value;
      const btn = formNewElement.querySelector('.button');
      changeBtnTitle(btn, 'Загрузка...');
      api.addNewCard({name, link})
        .then(result => {
          const newCard = new Card(name, link);
          list.addCard(newCard.create(result, userInformationClass.id, api));
          formNewElement.reset();
          popupNewClass.close();
        })
        .catch(apiError)
        .finally(changeBtnTitle(btn, '+'));
    };
  
    // Открытие попапа с картинкой
    function openCard(event) {
      if (event.target.classList.contains('place-card__image')) {
        popupOpen.querySelector('.popup__picture').setAttribute('src', event.target.style.backgroundImage.slice(5, -2));
        popupOpenClass.open();
      }
    }
  
    // Запись измененной информации на страницу
    function setInfo(event) {
      event.preventDefault();
      const btn = formEditElement.querySelector('.button');
      changeBtnTitle(btn, 'Загрузка...');
      api.setUserInfo(userInformationClass.inputName.value, userInformationClass.inputJob.value)
        .then(result => {
          userInformationClass.updateUserInfo(result.name, result.about);
          userInformationClass.setUserInfo(result.name, result.about);
          formEditElement.reset();
          popupEditClass.close(popupEdit);
        })
        .catch(apiError)
        .finally(changeBtnTitle(btn, 'Сохранить'));
    }
  
    // Сохраняет новый аватар
    function setNewAvatar(event) {
      event.preventDefault();
      api.changeAvatar(formAvatarElement.querySelector('.popup__input_type_link-url').value)
      .then(result => {
        userInformationClass.updateUserInfo(null, null, result.avatar);
        formAvatarElement.reset();
        popupAvatarClass.close();
      })
      .catch(apiError);
    }
    
    // Открывает окно редактирования информации о пользователе
    function openEdit() {
      popupEdit.querySelector('.popup__input_type_name').value = userInformationClass.name;
      popupEdit.querySelector('.popup__input_type_job').value = userInformationClass.job;
      popupEditClass.open();
    }
  
    // Закрывает окно редактирования информации о пользователе
    function closeEdit() {
      formEditElement.reset();
      const errorMessages = formEditElement.querySelectorAll('.error-message');
      errorMessages.forEach((elem) => validEdit.hideError(elem));
      popupEditClass.close();
    }
  
    // Закрывает окно добавления карточки
    function closeNew() {
      formNewElement.reset();
      const errorMessages = formNewElement.querySelectorAll('.error-message');
      errorMessages.forEach((elem) => validNew.hideError(elem));
      popupNewClass.close();
    }
  
    // Закрывает окно обновления аватара
    function closeAvatar() {
      formAvatarElement.reset();
      const errorMessages = formAvatarElement.querySelectorAll('.error-message');
      errorMessages.forEach((elem) => validAvatar.hideError(elem));
      popupAvatarClass.close();
    }
  
    /* Слушатели событий */
  
    addButton.addEventListener('click', () => {
      popupNewClass.open();
      validNew.removeActivityBtn(popupNew.querySelector('.button'));
    });
    editInfoButton.addEventListener('click', openEdit);
    placesList.addEventListener('click', openCard);
    userPhotoElement.addEventListener('click', () => {
      popupAvatarClass.open();
      validAvatar.removeActivityBtn(popupAvatar.querySelector('.button'));
    });
    closeEditButton.addEventListener('click', closeEdit);
    closeNewButton.addEventListener('click', closeNew);
    closeOpenButton.addEventListener('click', () => popupOpenClass.close());
    closeAvatarButton.addEventListener('click', closeAvatar);
    formNewElement.addEventListener('submit', addNewCard);
    formEditElement.addEventListener('submit', setInfo);
    formAvatarElement.addEventListener('submit', setNewAvatar);
    validEdit.setEventListeners();
    validNew.setEventListeners();
    validAvatar.setEventListeners();
  
    /* Вызовы функций */  
    
    api.getUserInfo()
      .then(result => {
        userInformationClass.updateUserInfo(result.name, result.about, result.avatar);
        userInformationClass.setUserInfo(result.name, result.about, result._id);
      })
      .then(() => api.getInitialCards())
      .then(result => {
        list.render(result, userInformationClass.id);
      })
      .catch(apiError);
    
  })();  