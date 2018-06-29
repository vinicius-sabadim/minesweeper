import { css } from 'glamor'

const commonCell = {
  alignItems: 'center',
  backgroundColor: '#CCCCCC',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 'bold',
  height: '25px',
  justifyContent: 'center',
  position: 'relative',
  width: '25px'
}

export const grid = css({
  borderTop: '2px solid #555555',
  borderLeft: '2px solid #555555',
  borderBottom: '2px solid #EEEEEE',
  borderRight: '2px solid #EEEEEE',
  display: 'inline-block'
})

export const cell = css({
  ...commonCell,
  borderTop: '2px solid #EEEEEE',
  borderLeft: '2px solid #EEEEEE',
  borderBottom: '2px solid #555555',
  borderRight: '2px solid #555555',
  ':hover': {
    backgroundColor: '#EEEEEE'
  }
})

export const cellVisible = css({
  ...commonCell,
  borderTop: '2px solid #555555',
  borderLeft: '2px solid #555555',
  borderBottom: '2px solid #CCCCCC',
  borderRight: '2px solid #CCCCCC',
})

export const cell1 = css({
  color: '#4286F4'
})

export const cell2 = css({
  color: '#0BA51B'  
})

export const cell3 = css({
  color: '#D11F1F'  
})

export const cell4 = css({
  color: '#6E25DB'  
})

export const cell5 = css({
  color: '#DB7325'  
})

export const cell6 = css({
  color: '#E22FB6'  
})

export const cell7 = css({
  color: '#398452'  
})

export const cell8 = css({
  color: '#683B39'  
})

export const row = css({
  display: 'flex',
  justifyContent: 'center'
})

export const bomb = css({
  fontSize: '20px',
  left: '2px',
  position: 'absolute',
  top: '-1px'
})

export const value = css({
  fontSize: '22px',
  left: '7px',
  position: 'absolute',
  top: '0'
})