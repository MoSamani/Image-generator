import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './ImageGenerator/ImageGenerate.css';

const ImageGenerate = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('taskId'); 

  useEffect(() => {
    if (!taskId) {
      setErrorMessage('Error - task Id is missing.');
      setIsLoading(false);
      return;
    }

    // begin listening for events from the server 
    const eventSource = new EventSource(`http://localhost:5000/api/stream/${taskId}`);

    eventSource.addEventListener('image', (e) => {
      setImages((prevImages) => [...prevImages, e.data]);
    });

    eventSource.addEventListener('end', () => {
      setIsLoading(false);
      eventSource.close();
    });

    eventSource.onerror = (e) => {
      console.error('EventSource failed:', e);
      setErrorMessage('Error');
      setIsLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [taskId]);

  const downloadImages = () => {
    console.log(images.length)
    if(isLoading === false){
      console.log('START DOWNLOAD...');
      var date = new Date();
      var currentTime = ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
      
      for(var i = 0; i < images.length; i++){        
        const a = document.createElement('a');
        a.download = `timelens_${i+1}_${currentTime}.png`;
        a.href = images[i];
        a.click();
      }
    }
    else{
      alert("Bildgenerierung ist noch nicht abgeschlossen!")
    }
  }


  return (
    <div className="imageGenerate">
      <h1>Bildergalerie</h1>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Bild wird generiert - bitte warten...</p>
        </div>
      )}

      {/* {errorMessage && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )} */}

      {images.length > 0 && (
        <div className='image-gallery'>
          {images.map((imgSrc, index) => (
            <img className="gallery-image" key={index} src={imgSrc} alt={`Done ${index + 1}`} />
          ))}
        </div>
      )}
      <div className="button-container">
        <button className="nextbutton" onClick={() => downloadImages()}>
            Download
        </button>  
        <button className="nextbutton" onClick={() => navigate(`/promptsettings`)}>
            Noch einmal
        </button> 
      </div>   
    </div>
  );
};

export default ImageGenerate;