import { css } from 'glamor'

export default {
  button: css({
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #4286F4',
    borderRadius: '5px',
    color: '#4286F4',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '16px',
    height: '30px',
    padding: '5px',
    ':hover': {
      backgroundColor: '#4286F4',
      color: '#FFFFFF'
    },
    ':focus': {
      outline: 'none'
    }
  })
}
