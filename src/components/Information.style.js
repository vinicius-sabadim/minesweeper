import { css } from 'glamor'

export default {
  container: css({
    marginRight: '50px'
  }),
  wrapper: css({
    marginBottom: '30px'
  }),
  info: css({
    color: '#4286F4',
    fontSize: '20px',
    fontWeight: 'bold'
  }),
  button: css({
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
  }),
  victory: css({
    color: '#4286F4',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '30px'
  }),
  cheatArea: css({
    border: '1px solid #BBBBBB',
    marginTop: '30px',
    padding: '10px',
    '> h1': {
      color: '#555555',
      fontSize: '20px',
      marginBottom: '10px'
    }
  }),
  checked: css({
    display: 'block',
    marginBottom: '10px',
    '> input': {
      marginRight: '5px'
    }
  })
}
