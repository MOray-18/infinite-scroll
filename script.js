// elements to manipulate
const imageContainer = document.querySelector('.image-container');
const spinner = document.querySelector('.loader');

// Unsplash API
const apiKey = 'fXDRTXcJ_WAvxKK-UQZOWQGHE6hej9CXtSdxlbYvcwE';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// control spinner display
const controlSpinner = function () {
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
  images.forEach(img => {
    const { alt_description: alt, links, urls } = img;
    const imageEl = `
      <a href="${links.html}">
        <img src="${urls.regular}" alt="${alt}" title="${alt}" />
      </a>
      `;
    imageContainer.insertAdjacentHTML('beforeend', imageEl);
  });
};

getPhotos();
