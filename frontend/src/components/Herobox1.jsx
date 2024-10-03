import React from 'react'
import { era, locations, hobby } from '../data'
import RadioInput from './RadioInput'
import { useContext } from 'react'
import { FormDataContext } from './FormDataContext'
import './herobox1/herobox1.css'

function Herobox1() {
  const { formData, setFormData } = useContext(FormDataContext)
  console.log('Formdata: ', formData)

  const handleRadioChange = (name, value) => {
    if (name === 'Era') {
      setFormData({ ...formData, era: value })
    }
    if (name === 'Location') {
      setFormData({ ...formData, location: value })
    }
  }

  const handleTextInputChangeAge = (event) => {
    const value = event.target.value

    if (isNaN(value)) {
      alert('Bitte nur Zahlen eingeben!')
      document.getElementById('Old').value = ''
    } else {
      setFormData((currentState) => {
        return { ...currentState, old: value }
      })
    }
  }

  const handleTextInputChangeSpecial = (event) => {
    setFormData({ ...formData, special: event.target.value })
  }

  const handleBadge = (event) => {
    setFormData({ ...formData, special: event.target.value })
    // if (formData.special.includes(event.target.value)) {
    //   let hobbyList = formData.special.filter((item) => {
    //     return item !== event.target.value
    //   })
    //   setFormData({
    //     ...formData,
    //     special: hobbyList,
    //   })
    // } else {
    //   setFormData({
    //     ...formData,
    //     special: [...formData.special, event.target.value],
    //   })
    // }
  }

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  return (
    <div className="herobox1">
      <form method="post">
        <div className="inputWrapper form">
          <p className="inputLabel">Zeitalter</p>
          <div className="radioGroup">
            {era.map((props) => {
              return (
                <RadioInput
                  {...props}
                  key={props.id}
                  value={props.value}
                  checked={formData.era === props.value}
                  onChange={() => handleRadioChange(props.name, props.value)}
                />
              )
            })}
          </div>

          <p className="inputLabel">Ort</p>
          <div className="radioGroup">
            {locations.map((props) => {
              return (
                <RadioInput
                  {...props}
                  key={props.id}
                  value={props.value}
                  checked={formData.location === props.value}
                  onChange={() => handleRadioChange(props.name, props.value)}
                />
              )
            })}
          </div>

          <p className="inputLabel">Wie alt bist du?</p>
          <input
            type="text"
            name="Old"
            id="Old"
            onChange={handleTextInputChangeAge}
            value={formData.old}
          ></input>

          <p className="inputLabel">Was für ein Geschlecht möchtest du darstellen?</p>
          <select name="gender" className='genderSelect' value={formData.gender || 'keine Auswahl'} onChange={handleGenderChange}>
            <option value="">keine Auswahl</option>
            <option value="männlich">männlich</option>
            <option value="weiblich">weiblich</option>
            <option value="">divers</option>
          </select>

          <p className="inputLabel">
            Was ist etwas Besonderes, das auf dem Bild abgebildet werden soll?
          </p>
          <div key="pille" className="pille">
            {hobby.map((_hobby, idx) => {
              let classname = 'badgegray roboto-bold'
              if (formData.special.includes(_hobby)) {
                classname = 'badgeclicked roboto-bold'
              }
              return (
                <input
                  type="button"
                  ky={idx}
                  value={_hobby}
                  className={classname}
                  onClick={handleBadge}
                ></input>
              )
            })}
          </div>
          {/* <p className="inputLabel">
            Falls Sie andere wünsche haben, tragen Sie es ein!
          </p> */}
          <input
            type="text"
            name="Promt"
            id="Promt"
            onChange={handleTextInputChangeSpecial}
            value={formData.special}
          ></input>
        </div>
      </form>
    </div>
  )
}

export default Herobox1
