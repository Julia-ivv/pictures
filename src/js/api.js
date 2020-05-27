export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl; 
        this.headers = options.headers;
    }
  
    getUserInfo() {
        // получить информацию о пользователе с сервера
        return fetch(this.baseUrl + 'users/me', { 
            method: 'GET', 
            headers: {
                authorization: this.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    setUserInfo(name, job) {
        // Сохранить отредактированные данные профиля на сервере
        return fetch(this.baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                 about: job
            })
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
      // Загрузка первоначальных карточек с сервера
        return fetch(this.baseUrl + 'cards', {
            method: 'GET',
            headers: {
                authorization: this.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    addNewCard(newCard) {
        // Добавление новой карточки
        return fetch(this.baseUrl + 'cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(cardId) {
        // Удаление карточки
        return fetch(this.baseUrl + 'cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    setLike(cardId) {
        // Лайкнуть карточку
        return fetch(this.baseUrl + 'cards/like/' + cardId, {
            method: 'PUT',
            headers: {
                authorization: this.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    removeLike(cardId) {
        // Убрать лайк у карточки
        return fetch(this.baseUrl + 'cards/like/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this.headers.authorization
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeAvatar(link) {
        // Изменение аватара
        return fetch(this.baseUrl + 'users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
  }