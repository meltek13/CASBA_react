import React from 'react'
import './style.css'

const ButtonDelete = (props) => {
  return (
    <button className="button-delete" onClick={props.action}>{props.name}</button>
  )
}

export default ButtonDelete