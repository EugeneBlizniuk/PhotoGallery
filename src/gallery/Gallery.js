import React, { useState, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";
import Photo, { photoPropType } from "./Photo";
import { computeColumnLayout } from "./layouts/columns";
import { computeRowLayout } from "./layouts/justified";
import { findIdealNodeSearch } from "./utils/findIdealNodeSearch";

const Gallery = React.memo(function Gallery({
  photos,
  onClick,
  direction,
  margin,
  limitNodeSearch,
  targetRowHeight,
  columns,
  renderImage,
  Container,
  onAction, 
  isOwner
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const galleryEl = useRef(null);

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      const newWidth = entries[0].contentRect.width;
      if (containerWidth !== newWidth) {
        animationFrameID = window.requestAnimationFrame(() => {
          setContainerWidth(Math.floor(newWidth));
        });
      }
    });
    observer.observe(galleryEl.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  const handleClick = (event, { index }) => {
    onClick(event, {
      index,
      view: photos[index]
    });
  };

  if (!containerWidth) return <div ref={galleryEl}>&nbsp;</div>;
  const width = containerWidth - 1;
  let galleryStyle, thumbs;

  if (direction === "row") {
    if (typeof limitNodeSearch === "function") {
      limitNodeSearch = limitNodeSearch(containerWidth);
    }
    if (typeof targetRowHeight === "function") {
      targetRowHeight = targetRowHeight(containerWidth);
    }
    
    if (limitNodeSearch === undefined) {
      limitNodeSearch = 2;
      if (containerWidth >= 450) {
        limitNodeSearch = findIdealNodeSearch({
          containerWidth,
          targetRowHeight
        });
      }
    }

    galleryStyle = { display: "flex", flexWrap: "wrap", flexDirection: "row" };
    thumbs = computeRowLayout({
      containerWidth: width,
      limitNodeSearch,
      targetRowHeight,
      margin,
      photos
    });
  }
  
  if (direction === "column") {

    if (typeof columns === "function") {
      columns = columns(containerWidth);
    }

    if (columns === undefined) {
      columns = 1;
      if (containerWidth >= 500) columns = 2;
      if (containerWidth >= 900) columns = 3;
      if (containerWidth >= 1500) columns = 4;
    }
    galleryStyle = { position: "relative" };
    thumbs = computeColumnLayout({
      containerWidth: width,
      columns,
      margin,
      photos
    });
    galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
  }

  const renderComponent = renderImage || Photo;

  return (
    <div className="react-photo-gallery--gallery">
      <div ref={galleryEl} style={galleryStyle}>
        {thumbs.map((thumb, index) => {
          const { left, top, containerHeight, ...photo } = thumb;
          return renderComponent({
            left,
            top,
            key: thumb.key || thumb.src,
            containerHeight,
            index,
            margin,
            direction,
            onClick: handleClick,
            photo,
            Container,
            onAction,
            isOwner
          });
        })}
      </div>
    </div>
  );
});

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  targetRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  limitNodeSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  margin: PropTypes.number,
  renderImage: PropTypes.func
};

Gallery.defaultProps = {
  margin: 2,
  direction: "row",
  targetRowHeight: 300
};
export { Photo };
export default Gallery;
