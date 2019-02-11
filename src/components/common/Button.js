import React from 'react'

import * as styles from './Button.style'

const componentName = props => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
)

export default componentName
