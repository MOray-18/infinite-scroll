// Unsplash API
const apiKey = 'fXDRTXcJ_WAvxKK-UQZOWQGHE6hej9CXtSdxlbYvcwE';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from API
const getPhotos = async function () {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
};

getPhotos();
