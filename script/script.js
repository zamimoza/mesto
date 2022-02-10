const popupPerson = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup_type_person');
const popupCloseButton = formElement.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');
const template = document.querySelector('#cards').content;
const likeButton = document.querySelector('.card__like');
const popupImg = document.querySelector('.popup_type_img');
const popupPlace = document.querySelector('.popup_type_place');
const popupAddButton = document.querySelector('.profile__add-button');
const formPlace = popupPlace.querySelector('.popup__form');
const inputMesto = formPlace.querySelector('.popup__input_type_mesto');
const inputLink = formPlace.querySelector('.popup__input_type_link');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupPerson() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupPerson);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupPerson);
}

popupEditButton.addEventListener('click', openPopupPerson);
popupCloseButton.addEventListener('click', () => closePopup(popupPerson));
popupPerson.addEventListener('submit', formSubmitHandler);

function openPopupImg(item) {
  document.querySelector('.popup__img-title').textContent = item.name;
  document.querySelector('.popup__img').src = item.link;
  document.querySelector('.popup__img').alt = item.name;
  openPopup(popupImg);
}

popupAddButton.addEventListener('click', () => openPopup(popupPlace));
popupPlace.querySelector('.popup__close-button_type_mesto').addEventListener('click', () => closePopup(popupPlace));

function cardLike(event) {
  event.preventDefault();
  event.target.classList.toggle('card__like_active');
}

function cardDelete(event) {
  event.target.closest('.card').remove();
}

popupImg.querySelector('.popup__close-button_type_img').addEventListener('click', () => closePopup(popupImg));
formPlace.addEventListener('submit', addCard);

function addCard(event) {
  event.preventDefault();
  elements.prepend(createCard({ name: inputMesto.value, link: inputLink.value }));
  formPlace.reset()
  closePopup(popupPlace);
}

function render() {
  initialCards.forEach(renderCard);
}

function renderCard(element) {
  const newCard = createCard(element)
  elements.appendChild(newCard);
}

function createCard(item) {
  const newCard = template.querySelector('.card').cloneNode(true);
  const newCardText = newCard.querySelector('.card__photo-info');
  const newCardImg = newCard.querySelector('.card__photo');

  newCardText.textContent = item.name;
  newCardImg.src = item.link;
  newCardImg.alt = item.name;

  newCard.querySelector('.card__like').addEventListener('click', cardLike);
  newCard.querySelector('.card__trash').addEventListener('click', cardDelete);
  newCard.querySelector('.card__photo').addEventListener('click', () => openPopupImg(item));

  return newCard;
}

render();