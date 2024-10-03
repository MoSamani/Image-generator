import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerate = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if file is larger than 10 MB
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('Die Bilddatei darf nicht größer als 10 MB sein.');
      setFile(null);
      e.target.value = null;
    } else {
      setErrorMessage('');
      setFile(selectedFile);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !prompt) {
      setErrorMessage('Bitte laden Sie ein Bild hoch und geben Sie einen Prompt ein.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setImages([]);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);

    try {
      const response = await axios.post('http://localhost:5000/api/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { taskId } = response.data;

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
        setErrorMessage('Ein Fehler ist aufgetreten.');
        setIsLoading(false);
        eventSource.close();
      };
    } catch (error) {
      console.error('Error starting image processing:', error);
      setErrorMessage('Fehler beim Starten der Bildbearbeitung. Bitte versuchen Sie es erneut.');
      setIsLoading(false);
    }
  };

  return (
    <div className="ImageGenerate">
      <h1>Bild bearbeiten mit Stability AI</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Geben Sie Ihren Prompt ein"
        />
        <button type="submit">Bild bearbeiten</button>
      </form>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Bild wird bearbeitet, bitte warten</p>
        </div>
      )}

      {errorMessage && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <h2>Bearbeitete Bilder</h2>
          {images.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Bearbeitet ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGenerate;
