import React from 'react';

export const ImageCard = ({image, clickHandler, index}) => {
  const {title,thumbnailUrl} = image

console.log(image);

const clickEventHandler = () =>{
    clickHandler(index)
}

  return (
    <div className="news-card" onClick={clickEventHandler}>
        <div>{title}</div>
        <img alt={title} src={thumbnailUrl}/>
    </div>
  );
};
