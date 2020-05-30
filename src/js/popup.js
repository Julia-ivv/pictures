export class Popup {
  constructor(elem) {
    this.elem = elem;
  }

  open() {
    this.elem.classList.add('popup_is-opened');
  }

  close() {
    this.elem.classList.remove('popup_is-opened');
  }
}