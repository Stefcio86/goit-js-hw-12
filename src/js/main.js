import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '45042225-41fd9f6f9757e1f3272f741dc';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let gallery = new SimpleLightbox('.gallery a');

const form = document.getElementById('search-form');
const galleryDiv = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

form.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value.trim();
  currentPage = 1;
  totalHits = 0;
  galleryDiv.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  fetchImages();
});

loadMoreBtn.addEventListener('click', fetchImages);

async function fetchImages() {
  if (!searchQuery) return;
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    totalHits = response.data.totalHits;

    if (response.data.hits.length === 0 && currentPage === 1) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderImages(response.data.hits);
    gallery.refresh();
    currentPage += 1;

    if (galleryDiv.children.length < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function renderImages(images) {
  const markup = images
    .map(image => {
      return `<a href="${image.largeImageURL}" class="gallery-item">
                    <img src="${image.webformatURL}" alt="${image.tags}" />
                    <div class="info">
                        <p><b>Likes</b>: ${image.likes}</p>
                        <p><b>Views</b>: ${image.views}</p>
                        <p><b>Comments</b>: ${image.comments}</p>
                        <p><b>Downloads</b>: ${image.downloads}</p>
                    </div>
                </a>`;
    })
    .join('');
  galleryDiv.insertAdjacentHTML('beforeend', markup);

  const { height: cardHeight } =
    galleryDiv.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
