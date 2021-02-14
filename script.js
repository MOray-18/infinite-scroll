// elements to manipulate
const imageContainer = document.querySelector('.image-container');

// Unsplash API
const apiKey = 'fXDRTXcJ_WAvxKK-UQZOWQGHE6hej9CXtSdxlbYvcwE';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from API
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

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
