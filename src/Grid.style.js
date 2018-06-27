const commonCell = {
  backgroundColor: '#CCCCCC',
  border: '1px solid #EEEEEE',
  height: '30px',
  width: '30px'
}

const style = {
  cell: {
    ...commonCell
  },
  cellBomb: {
    ...commonCell,
    backgroundColor: '#FF0000'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default style