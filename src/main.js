import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchQuery = event.target.elements["search-text"].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }
  
  clearGallery();
  showLoader();

  getImagesByQuery(searchQuery)
    .then((data) => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          title: "Error",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch((error) => {
      console.error(error);
      iziToast.error({
        title: "Error",
        message: "An error occurred while fetching images. Please try again later.",
        position: "topRight",
      });
    })
    .finally(() => {
      hideLoader();
      event.target.reset();
    });
});