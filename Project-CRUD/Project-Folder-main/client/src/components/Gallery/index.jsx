import React, { useState } from 'react';
import styles from "./styles.module.css";

const Gallery = () => {
  // Sample image data - replace with your actual images
  const [images, setImages] = useState([
    { id: 1, src: 'https://th.bing.com/th/id/OIP.XV6mwy--MUtHr-C7prx-0gHaEK?w=328&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/400x300', alt: 'I' },
    { id: 2, src: 'https://th.bing.com/th/id/OIP.0kCaTX_cgT-ZehM9OIxmlwHaEK?w=328&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/400x300', alt: 'Hate' },
    { id: 3, src: 'https://th.bing.com/th/id/OIP.mTqrLYboBkMycTIUE_9vKAHaE5?w=242&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/400x300', alt: 'You' },
    { id: 4, src: 'https://th.bing.com/th/id/OIP._2I1h6egwO8yeNXK-ScdxQHaE8?w=248&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/400x300', alt: 'I' },
    { id: 5, src: 'https://th.bing.com/th/id/OIP.d5HkEL2wmD9xF7pOyRFy1AHaE8?w=224&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'Am' },
    { id: 6, src: 'https://th.bing.com/th/id/OIP.rH26bsQLAzEoPOW1_KmU5gHaEe?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'Done' },
    { id: 7, src: 'https://th.bing.com/th/id/OIP.cSpyl1cQXVZpsDiAgEjZsQHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'With' },
    { id: 8, src: 'https://th.bing.com/th/id/OIP.YvVG3NgSzIk_jGF1H0ibuQHaHa?w=181&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'You' },
    { id: 9, src: 'https://th.bing.com/th/id/OIP.f8pzU7dgreRySXQ0YsA86wHaEJ?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'May' },
    { id: 10, src:'https://th.bing.com/th/id/OIP.jI2n2Fbyzvd6RV2B-fc6IgHaEK?w=324&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'See' },
    { id: 11, src:'https://th.bing.com/th/id/OIP.-I_RqRXq4urSInwTG8-U0wHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'You' },
    { id: 12, src:'https://th.bing.com/th/id/OIP.88VsSyJlyYLdMPqVmG4rywHaEK?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'Bye' },
    { id: 13, src:'https://th.bing.com/th/id/OIP.4kFXU9lwfJPMlX5kdl7TkwHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'In' },
    { id: 14, src:'https://th.bing.com/th/id/OIP.wx7BzDBqyDLlx6NVCLR_cAHaEK?w=202&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'Future' },
    { id: 15, src:'https://th.bing.com/th/id/OIP.Xee8e4-E8MrcGP6IjvXVEgAAAA?w=272&h=159&c=7&r=0&o=5&dpr=1.3&pid=1.7/400x300', alt: 'Bye' },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.gallery_container}>
      <nav className={styles.navbar}>
        <h1>JILLU</h1>
        <a href="/"><button className={styles.white_btn}>Back</button></a>
      </nav>
      
      <div className={styles.gallery_content}>
        {images.map((image) => (
          <div 
            key={image.id} 
            className={styles.image_item}
            onClick={() => openImage(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className={styles.gallery_image}
            />
            <div className={styles.image_overlay}>
              <p>{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className={styles.modal} onClick={closeImage}>
          <div className={styles.modal_content}>
            <span className={styles.close_button} onClick={closeImage}>&times;</span>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className={styles.enlarged_image}
            />
            <p className={styles.image_caption}>{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;