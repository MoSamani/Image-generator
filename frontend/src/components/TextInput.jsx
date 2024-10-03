import React from 'react'

function TextInput(props) {
  const { type, name, placeholder } = props
  return <input type={type} name={name} placeholder={placeholder}></input>
}

export default TextInput
