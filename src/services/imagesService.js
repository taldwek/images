import axios from 'axios';

export const fetchImages = async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/photos'
    );
    const imagesParsed = response.data.map((image) => {
      return { title: image.title, thumbnailUrl: image.thumbnailUrl };
    });
    return imagesParsed;
  } catch (error) {
    console.log(error);
  }
};
