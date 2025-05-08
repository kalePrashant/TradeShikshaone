import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const HeroSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Array of image paths - update these with your actual image paths
  const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.jpg',
    '/images/slide5.jpg',
    '/images/slide6.jpg',
    '/images/slide7.jpg',
    '/images/slide8.jpg',
    '/images/slide9.jpg',
    '/images/slide10.jpg',
    '/images/slide11.jpg',
  ];

  useEffect(() => {
    // Check if images exist by preloading them
    const preloadImages = () => {
      let loadedCount = 0;
      const totalImages = images.length;
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            console.log('All slideshow images loaded successfully');
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      });
    };
    
    preloadImages();
  }, [images]);

  useEffect(() => {
    // Only start the slideshow if images are loaded
    if (!imagesLoaded) return;
    
    // Set up the interval to change images every 3 seconds (increased from 2 for better visibility)
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [imagesLoaded, images.length]);

  if (!imagesLoaded) {
    return <div className={styles.slideshow}>Loading slideshow...</div>;
  }

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`${styles.slideImage} ${index === activeIndex ? styles.active : ''}`}
        />
      ))}
    </div>
  );
};

export default HeroSlideshow;