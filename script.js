// elements to manipulate
const imageContainer = document.querySelector('.image-container');
const spinner = document.querySelector('.loader');

// Unsplash API
const apiKey = 'fXDRTXcJ_WAvxKK-UQZOWQGHE6hej9CXtSdxlbYvcwE';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let totalImages = 0;
let loadedImages = 0;
let isLoaded = false;

// control spinner display
const controlSpinner = function () {
  if (totalImages) return;

  const { hidden } = spinner;
  spinner.hidden = !hidden;
  imageContainer.hidden = hidden;
};

// get photos from API
const getPhotos = async function () {
  try {
    controlSpinner();

    const response = await fetch(apiUrl);
    const data = await response.json();

    controlSpinner();

    renderImages(data);
  } catch (error) {
    console.log(error);
  }
};

const renderImages = function (images) {
  totalImages = images.length;

  images.forEach(img => {
    const { alt_description: alt, links, urls } = img;
    const imageEl = `
      <a href="${links.html}">
        <img src="${urls.regular}" alt="${alt}" title="${alt}" />
      </a>
      `;
    imageContainer.insertAdjacentHTML('beforeend', imageEl);

    const image = imageContainer.querySelectorAll('img');
    image.forEach(i => i.addEventListener('load', imageLoaded));
  });
};

// handler for image loading
const imageLoaded = function () {
  loadedImages++;
  isLoaded = loadedImages === totalImages;
};

// event listener for scrolling
window.addEventListener('scroll', function (event) {
  const { scrollY, innerHeight } = window;
  if (scrollY + innerHeight >= document.body.offsetHeight - 1000 && isLoaded) {
    getPhotos();
    isLoaded = false;
    loadedImages = 0;
  }
});

getPhotos();
