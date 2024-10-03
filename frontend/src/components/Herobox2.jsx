import React from 'react'
import Webcam from 'react-webcam'
import { useState, useRef, useContext } from 'react'
import { FormDataContext } from './FormDataContext'
import uploadImage from '../img/upload.png'
import './herobox2/herobox2.css'

function Herobox2() {
  const { formData, setFormData } = useContext(FormDataContext)
  const webcamRef = useRef(null)
  const fileLoadRef = useRef()
  const [isToggled, setToggle] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const capture = () => {
    if (isToggled) {
      const capturedImage = webcamRef.current.getScreenshot()
      const blob = b64toBlob(capturedImage, 'image/jpeg')

      if (blob.size > 10 * 1024 * 1024) {
        setErrorMessage(
          'Das Bild ist größer als 10 MB. Bitte ein kleineres Bild verwenden.'
        )
        return
      }

      const blobURL = URL.createObjectURL(blob)
      setFormData({ ...formData, imageSrc: blobURL })
      setErrorMessage('')
      console.log('Captured Blob: ', blob)
    }
  }

  const b64toBlob = (base64Data, contentType = 'image/jpeg') => {
    const byteCharacters = atob(base64Data.split(',')[1])
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  const handleToggle = () => {
    setFormData({ ...formData, imageSrc: '' })
    setToggle(!isToggled)
  }

  const handleImageUpload = (event) => {
    event.preventDefault()
    fileLoadRef.current.click()
  }

  const uploadImageDisplay = () => {
    const uploadedFile = fileLoadRef.current.files[0]

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('Die Bilddatei darf nicht größer als 10 MB sein.')
      return
    }

    const cachedURL = URL.createObjectURL(uploadedFile)
    setFormData({ ...formData, imageSrc: cachedURL })
    setErrorMessage('')
    console.log('Uploaded Image: ', cachedURL)
  }

  console.log('FormData in Herobox2: ', formData)

  return (
    <div className="herobox2">
      <div className="camerContainer">
        {isToggled && formData.imageSrc === '' ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        ) : !isToggled && formData.imageSrc === '' ? (
          <div>
            <button
              type="submit"
              className="uploadButton"
              onClick={handleImageUpload}
            >
              <img
                src={uploadImage}
                alt="Upload Icon"
                className="uploadImage"
              />
            </button>
            <form id="form" encType="multipart/form-data">
              <input
                type="file"
                id="file"
                ref={fileLoadRef}
                onChange={uploadImageDisplay}
                hidden
              />
            </form>
          </div>
        ) : (
          <div className="imgcontainer">
            <img
              src={formData.imageSrc}
              alt="Captured or Uploaded"
              className="img"
            />
          </div>
        )}
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className="toggle-wrapper">
        <label htmlFor="toggle" className="toggleLabel">
          Kamera
        </label>
        <button
          name="toggle"
          className={`toggle-btn ${isToggled ? 'toggled' : ''}`}
          onClick={handleToggle}
        >
          <div className="thumb"></div>
        </button>

        <button onClick={capture} className="captureButton">
          Aufnehmen
        </button>

        <button
          onClick={() => setFormData({ ...formData, imageSrc: '' })}
          className="refreshButton"
        >
          Löschen
        </button>
      </div>
    </div>
  )
}

export default Herobox2
