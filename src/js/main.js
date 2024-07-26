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

const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('button.hidden');
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

  try {
    const images = await fetchImages(query, page);
    if (images.length === 0) {
      iziToast.error({
        title: 'Sorry',
        message: 'No images found. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(images);
      loadMoreButton.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const images = await fetchImages(query, page);
    renderImages(images);

    const totalPages = Math.ceil(images.totalHits / PER_PAGE);
    if (page >= totalPages) {
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
      top: cardHeight * 2,
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
  return response.data.hits;
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
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </div>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}
