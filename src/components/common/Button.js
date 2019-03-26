import React from 'react'

import styles from './Button.style'

const Button = props => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
)

export default Button
