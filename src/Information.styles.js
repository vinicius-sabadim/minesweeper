import { css } from 'glamor'

export const wrapper = css({
  margin: '20px 0'
})

export const button = css({
  border: '1px solid #4286F4',
  borderRadius: '5px',
  color: '#4286F4',
  cursor: 'pointer',
  fontSize: '16px',
  marginBottom: '20px',
  padding: '5px',
  ':hover': {
    backgroundColor: '#4286F4',
    color: '#FFFFFF'
  }
})

export const container = css({
  display: 'flex',
  justifyContent: 'center',
  '> p': {
    margin: '0 20px'
  }
})

export const info = css({
  color: '#4286F4',
  fontSize: '20px',
  fontWeight: 'bold'
})