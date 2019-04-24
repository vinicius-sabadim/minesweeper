import React from 'react'

import './Checkbox.css'

const Checkbox = ({ checked, label, onChange }) => {
  return (
    <label className="container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark" />
    </label>
  )
}

export default Checkbox
