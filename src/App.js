import React, { useState, useEffect } from 'react';

import { fetchImages } from './services/imagesService';
import { ImageCard } from './imageCard';

import logo from './logo.svg';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    };
    getImages();
  }, []);

  const renderImages = (selected) => {
    if (selected === 'all') {
      const sliceFrom = page * 10 - 10;
      const sliceTo = page * 10;
      const imagesToRender = images.slice(sliceFrom, sliceTo);

      return imagesToRender.map((image, i) => {
        return (
          <ImageCard
            key={i}
            index={i}
            image={image}
            clickHandler={clickHandler}
          />
        );
      });
    } else {
      return <ImageCard image={selectedImage[0]} />;
    }
  };

  const clickHandler = (index) => {
    const imageToRender = images.splice(index, 1);
    setSelectedImage(imageToRender);
  };

  const renderPagination = () => {
    return (
      <section className="pagination">
        <button
          disabled={page === 1}
          value="previous"
          onClick={handlePageChange}
        >
          previous
        </button>
        <button
          disabled={isOnLastPage()}
          value="next"
          onClick={handlePageChange}
        >
          next
        </button>
      </section>
    );
  };

  const numOfPages = () => {
    const numOfImagesTotal = images.length;
    if (numOfImagesTotal) {
      return Math.ceil(numOfImagesTotal / 10);
    }
  };

  const isOnLastPage = () => {
    return page === numOfPages();
  };

  const handlePageChange = (e) => {
    const action = e.target.value;
    if (action === 'previous') {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };

  const handleReset = () => {
    setSelectedImage([]);
  };

  const renderResetSelected = () => {
    return (
      <section className="reset">
        <button onClick={handleReset}>Reset</button>
      </section>
    );
  };

  return (
    <div className="App">
      {!!images.length && !selectedImage.length && renderImages('all')}
      {!!selectedImage.length && renderImages('single')}
      {!selectedImage.length ? renderPagination() : renderResetSelected()}
    </div>
  );
}

export default App;
