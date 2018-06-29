const commonCell = {
  alignItems: 'center',
  backgroundColor: '#CCCCCC',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold',
  height: '30px',
  justifyContent: 'center',
  width: '30px' 
}

const style = {
  grid: {
    borderTop: '2px solid #555555',
    borderLeft: '2px solid #555555',
    borderBottom: '2px solid #EEEEEE',
    borderRight: '2px solid #EEEEEE',
    display: 'inline-block'
  },
  cell: {
    ...commonCell,
    borderTop: '2px solid #EEEEEE',
    borderLeft: '2px solid #EEEEEE',
    borderBottom: '2px solid #555555',
    borderRight: '2px solid #555555',
  },
  cellClicked: {
    ...commonCell,
    borderTop: '1px solid #555555',
    borderLeft: '1px solid #555555',
    borderBottom: '3px solid #CCCCCC',
    borderRight: '3px solid #CCCCCC',
  },
  cell1: {
    color: '#4286F4'
  },
  cell2: {
    color: '#0BA51B'
  },
  cell3: {
    color: '#d11f1f'
  },
  cell4: {
    color: '#6e25db'
  },
  cell5: {
    color: '#db7325'
  },
  cell6: {
    color: '#e22fb6'
  },
  cell7: {
    color: '#79e22f'
  },
  cell8: {
    color: '#683b39'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default style