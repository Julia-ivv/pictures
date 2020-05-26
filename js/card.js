class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.card = undefined;
  }

  like(event, setLike, removeLike) {
    const likeElement = event.target;
    const likeCountElement = this.card.querySelector('.place-card__like-count');
    if (likeElement.classList.contains('place-card__like-icon_liked')) {
      // убрать лайк
      removeLike(this.card.dataset.id)
        .then(result => {
          likeCountElement.textContent = result.likes.length;
          likeElement.classList.remove('place-card__like-icon_liked');
        })
        .catch((err) => console.log(err));
    } else {
      // поставить лайк
      setLike(this.card.dataset.id)
        .then(result => {
          likeCountElement.textContent = result.likes.length;
          likeElement.classList.add('place-card__like-icon_liked');
        })
        .catch((err) => console.log(err));
    }
  }

  remove(event, deleteCard) {
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      deleteCard(event.target.closest('.place-card').dataset.id)
        .then(() => {
          event.target.removeEventListener('click', this.remove);
          this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
          this.card.remove();
        })
        .catch((err) => console.log(err));
    }    
  }

  create(card, userId, api) {
    let template = `<div class="place-card__image" style="background-image: url(${card.link})">`;
    if (userId === card.owner._id) template = template + `<button class="place-card__delete-icon"></button>`;
    template = template + `</div>
                          <div class="place-card__description">
                              <h3 class="place-card__name">${card.name}</h3>
                              <div class="place-card__like-container">`;
    if (card.likes.some(elem => elem._id === userId)) template = template + `<button class="place-card__like-icon place-card__like-icon_liked"></button>`
    else template = template + `<button class="place-card__like-icon"></button>`;
    template = template + `<p class="place-card__like-count">${card.likes.length}</p>
                              </div>
                          </div>`;
    
    this.card = document.createElement('div');
    this.card.setAttribute('data-id', card._id);
    this.card.classList.add('place-card');
    this.card.insertAdjacentHTML('beforeend', template);
    this.setEventListeners(userId === card.owner._id, api);
    return this.card;
  }

  setEventListeners(removable, api) {
    this.card.querySelector('.place-card__like-icon').addEventListener('click', (event) => this.like(event, api.setLike.bind(api), api.removeLike.bind(api)));
    if (removable) this.card.querySelector('.place-card__delete-icon').addEventListener('click', (event) => this.remove(event, api.deleteCard.bind(api)));// this.remove.bind(this));
  }
}