import { css } from 'glamor'

export const container = css({
  marginRight: '50px'
})

export const wrapper = css({
  marginBottom: '30px'
})

export const info = css({
  color: '#4286F4',
  fontSize: '20px',
  fontWeight: 'bold'
})

export const button = css({
  backgroundColor: '#FFFFFF',
  border: '1px solid #AAAAAA',
  borderRadius: '5px',
  color: '#AAAAAA',
  cursor: 'pointer',
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

export const victory = css({
  color: '#4286F4',
  fontSize: '20px',
  fontWeight: 'bold'
})
