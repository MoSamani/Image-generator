import React from 'react'

function RadioInput(props) {
  const { type, name, value, onChange, checked } = props

  return (
    <label>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      ></input>
      {value}
    </label>
  )
}

export default RadioInput
