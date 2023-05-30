import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

hideSelect();

fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      showSelect();

      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);

      // console.log(option);
      hideLoader();
    });
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(() => {
    showError();
  });

refs.breedSelect.addEventListener('change', onSelect);

function onSelect(event) {
  event.preventDefault();

  const selectedBreedId = event.target.value;
  hideSelect();
  showLoader();
  hideCatinfo();

  if (selectedBreedId) {
    return fetchCatByBreed(selectedBreedId)
      .then(data => {
        console.log(data);
        hideLoader();
        showSelect();
        renderMarkup(data);
        showCatinfo();
      })
      .catch(() => {
        showError();
      });
  }
}

function renderMarkup(catData) {
  const [destCatData] = catData;
  const { url, breeds } = destCatData;
  /* Я пробовал вставить в параметр функции { url, breeds }, чтобы деструктуризировать сразу там, но почему-то breeds[0] не получалось прочитать
   */
  console.log(breeds);

  const breed = breeds[0];

  const markup = `<div class="catCard">
      <img src="${url}" width="300">
      <div class="text-part">
        <h2 class="name">${breed.name}</h2>
        <p class="descr">${breed.description}</p>
        <p class="temperament"><b>Temperament:</b> ${breed.temperament}</p>
      </div>
    </div>
  `;

  refs.catInfo.innerHTML = markup;
}

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

function showError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  hideLoader();
  hideSelect();
}

function hideSelect() {
  refs.breedSelect.classList.add('is-hidden');
}

function showSelect() {
  refs.breedSelect.classList.remove('is-hidden');
}

function hideCatinfo() {
  refs.catInfo.classList.add('is-hidden');
}

function showCatinfo() {
  refs.catInfo.classList.remove('is-hidden');
}
