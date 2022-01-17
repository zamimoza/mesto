let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-button');
let popupAddButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__cross');
let popupSaveButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function popupToggle() {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.toggle('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    } else {
        popup.classList.remove('popup_opened');
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupAddButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);