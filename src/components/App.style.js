import { css } from 'glamor'

export const app = css({
  textAlign: 'center'
})

export const container = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px auto 0',
  width: '360px'
})

export const button = css({
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