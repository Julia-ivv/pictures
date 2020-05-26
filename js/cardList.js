class CardList {
    constructor(container, userCard) {
        this.container = container;
        this.userCard = userCard;
    }

    addCard(newCard) {
        this.container.appendChild(newCard);
    }

    render(cards, userId) {
        for (let elem of cards) {
            this.addCard(this.userCard(elem, userId));
        }
    }
}