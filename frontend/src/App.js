import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { FormDataContext } from './components/FormDataContext'
import Home from './pages/Home'
import PromptSettings from './pages/PromptSettings'
import ImageGenerator from './pages/ImageGenerator'

const App = () => {
  const [formData, setFormData] = useState({
    era: '',
    location: '',
    old: '',
    special: '',
    gender: '',
    imageSrc: '',
  })
  const [imageSrc, setImageSrc] = useState('')

  return (
    <>
      {/* <NavBar /> */}
      <FormDataContext.Provider
        value={{ formData, setFormData, imageSrc, setImageSrc }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promptsettings" element={<PromptSettings />} />
          <Route path="/imagegenerator" element={<ImageGenerator />} />
        </Routes>
      </FormDataContext.Provider>
    </>
  )
}

export default App
