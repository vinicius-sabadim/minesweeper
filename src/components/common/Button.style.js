import { css } from 'glamor'

export const button = css({
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  border: '1px solid #AAAAAA',
  borderRadius: '5px',
  color: '#AAAAAA',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '16px',
  height: '30px',
  padding: '5px',
  ':hover': {
    backgroundColor: '#AAAAAA',
    color: '#FFFFFF'
  },
  ':focus': {
    outline: 'none'
  }
})
