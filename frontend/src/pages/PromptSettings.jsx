import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Herobox1 from '../components/Herobox1'
import Herobox2 from '../components/Herobox2'
import { FormDataContext } from '../components/FormDataContext'
import Header from '../components/Header'

const PromptSettings = () => {

  const navigate = useNavigate()
  const { formData } = useContext(FormDataContext)
  console.log('formData Main: ', formData.imageSrc)

  const handleNextClick = async () => {
    const { old, era, location, special, gender, imageSrc } = formData;

    if (!old || !era || !location || !special || !imageSrc) {
      alert('Bitte alle Felder ausfüllen.');
      return;
    }
    const prompt = `Bitte erstelle einen detaillierten Bild-Prompt für ein KI-Bildgenerierungsmodell. Das Bild soll eine ${old}-jährige ${gender} Person während der Epoche ${era} in ${location} darstellen, die eine ${special} zeigt oder hält. Füge angemessene physische Merkmale, Kleidung und Umgebung hinzu, die zur Epoche und zum Ort passen. Das Bild sollte realistisch und detailliert sein. Bitte antworte unbedingt auf Englisch.`;

    const imageBlobURL = formData.imageSrc;
  
    if (!imageBlobURL || !prompt) {
      alert('Bitte Bild hochladen.');
      return;
    }

    try {
      const blob = await fetchBlobFromURL(imageBlobURL);
      console.log("prompt: ", prompt);
      const formDataToSend = new FormData();
      formDataToSend.append('image', blob, 'image.jpg');
      formDataToSend.append('prompt', prompt);
  
      const response = await axios.post('http://localhost:5000/api/edit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const { taskId } = response.data;
  
      navigate(`/imagegenerator?taskId=${taskId}`);
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      alert('Fehler beim Hochladen des Bildes. Bitte versuche es erneut.');
    }
  }
  async function fetchBlobFromURL(blobURL) {
    const response = await fetch(blobURL)
    const blob = await response.blob()
    return blob
  }

  return (
    <>
      <Header />
      <main className="roboto-regular">
        <div className="promptSelectorContainer">
          <Herobox1 />
          <Herobox2 />
        </div>
        <div className="buttonContainer">
          <button className="backbutton_v2" onClick={() => navigate(`/`)}>
            Zurück
          </button>
          <button className="nextbutton" onClick={handleNextClick}>
            Weiter
          </button>
        </div>
      </main>
    </>
  )
}

export default PromptSettings
