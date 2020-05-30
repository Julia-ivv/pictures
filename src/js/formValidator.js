export class FormValidator {
  constructor(popup, textError) {
    this.popup = popup;
    this.texts = textError;
  }

  showError(elem, text) {
    elem.textContent = text;
    elem.classList.add('error-message_visible');
  }

  hideError(elem) {
    elem.textContent = '';
    elem.classList.remove('error-message_visible');
  }

  checkInputValidity(input, error) {
    if (input.validity.valueMissing) {
      this.showError(error, this.texts.validInput);
    } else if (input.type === 'text' && input.validity.tooShort) {
      this.showError(error, this.texts.validLength);
    } else if (input.type === 'url' && !input.validity.valid) {
      this.showError(error, this.texts.validLink);
    }
    else this.hideError(error);
  }

  removeActivityBtn(btn) {
    btn.classList.remove('popup__button_enabled');
    btn.setAttribute('disabled', true);
  }

  setActivityBtn(btn) {
    btn.classList.add('popup__button_enabled');
    btn.removeAttribute('disabled');
  }

  setSubmitButtonState(btn, inputs) {
    const notValid = Array.from(inputs).some((el) => { if (!el.validity.valid) return el });
    if (notValid) {
      this.removeActivityBtn(btn);
    } else {
      this.setActivityBtn(btn);
    }
  }

  setEventListeners() {
    this.popup.querySelectorAll('.popup__input').forEach((elem) => {
      elem.addEventListener('input', (event) => {
        this.checkInputValidity(event.target, this.popup.querySelector(`#error-${event.target.name}`));
        this.setSubmitButtonState(this.popup.querySelector('.button'), this.popup.querySelectorAll('.popup__input'));
      })
    });
  }
}