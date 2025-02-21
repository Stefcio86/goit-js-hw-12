import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const API_KEY = '45042225-41fd9f6f9757e1f3272f741dc';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

let query = '';
let page = 1;
let totalHits = 0;

const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');

const simpleLightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreButton.classList.add('hidden');
  totalHits = 0;

  try {
    const response = await fetchImages(query, page);
    totalHits = response.totalHits;

    if (response.hits.length === 0) {
      iziToast.error({
        title: 'Sorry',
        message: 'No images found. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(response.hits);
      if (response.hits.length >= PER_PAGE) {
        loadMoreButton.classList.remove('hidden');
      }
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const response = await fetchImages(query, page);
    renderImages(response.hits);

    if (page * PER_PAGE >= totalHits || response.hits.length < PER_PAGE) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        title: 'End',
        message: 'You have reached the end of search results.',
        position: 'topRight',
      });
    }

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 3, // Increase the scroll value for a larger scroll
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
}

async function fetchImages(query, page) {
  loader.classList.remove('hidden');
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });
  loader.classList.add('hidden');
  return response.data;
}

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" class="gallery-item__image"/>
      </a>
      <div class="info">
        <div class="info-column">
          <p class="label">Likes</p>
          <p class="value">${likes}</p>
        </div>
        <div class="info-column">
          <p class="label">Views</p>
          <p class="value">${views}</p>
        </div>
        <div class="info-column">
          <p class="label">Comments</p>
          <p class="value">${comments}</p>
        </div>
        <div class="info-column">
          <p class="label">Downloads</p>
          <p class="value">${downloads}</p>
        </div>
      </div>
    </div>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}
