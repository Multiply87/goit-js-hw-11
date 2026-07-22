import axios from "axios";

const API_KEY = "56799357-5764c9f004e69503c7bfa7d57";
const BASE_URL = "https://pixabay.com/api/";

export default function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    })
    .then((response) => response.data);
}