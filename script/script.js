let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup_type_person');
let popupCloseButton = formElement.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


function popupToggle() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const template = document.querySelector('#cards').content;
const likeButton = document.querySelector('.card__like');
const popupImg = document.querySelector('.popup_type_img');
const popupPlace = document.querySelector('.popup_type_place');
const popupAddButton = document.querySelector('.profile__add-button');
const formPlace = document.querySelector('.popup_type_place');

function render() {
  initialCards.forEach(renderCard);
}

function cardLike(event) {
  event.preventDefault();
  event.target.classList.toggle('card__like_active');
}

function cardDelete(event) {
  event.target.closest('.card').remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupImg(item) {
  document.querySelector('.popup__img-title').innerText = item.name;
  document.querySelector('.popup__img').src = item.link;
  openPopup(popupImg);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupAddButton.addEventListener('click', () => openPopup(popupPlace));
popupPlace.querySelector('.popup__close-button_type_mesto').addEventListener('click', () => closePopup(popupPlace));

function renderCard(element) {
  const newCard = createCard(element)
  elements.appendChild(newCard);
}

function createCard(item) {
  const newCard = template.querySelector('.card').cloneNode(true);
  const newCardText = newCard.querySelector('.card__photo-info');
  const newCardImg = newCard.querySelector('.card__photo');

  newCardText.innerText = item.name;
  newCardImg.src = item.link;

  newCard.querySelector('.card__like').addEventListener('click', cardLike);
  newCard.querySelector('.card__trash').addEventListener('click', cardDelete);
  newCard.querySelector('.card__photo').addEventListener('click', () => openPopupImg(item));
  popupImg.querySelector('.popup__close-button_type_img').addEventListener('click', () => closePopup(popupImg));
  formPlace.addEventListener('submit', addCard);

  return newCard;
}

const inputMesto = formPlace.querySelector('.popup__input_type_mesto');
const inputLink = formPlace.querySelector('.popup__input_type_link');

function addCard(event) {
  event.preventDefault();
  elements.prepend(createCard({ name: inputMesto.value, link: inputLink.value }));
  closePopup(popupPlace);
}

render();