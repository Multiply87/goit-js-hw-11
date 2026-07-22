import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const galleryContainer = document.querySelector(".gallery");
const loaderElement = document.querySelector(".loader");

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="gallery-caption">
          <ul class="gallery-caption-list">
            <li class="gallery-caption-item"><span class="caption-label">Likes</span><span>${likes}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Views</span><span>${views}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Comments</span><span>${comments}</span></li>
            <li class="gallery-caption-item"><span class="caption-label">Downloads</span><span>${downloads}</span></li>
          </ul>
        </div>
      </li>
    `
    )
    .join("");

  galleryContainer.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  if (loaderElement) {
    loaderElement.classList.add("active");
  }
}

export function hideLoader() {
  if (loaderElement) {
    loaderElement.classList.remove("active");
  }
}