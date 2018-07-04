const commonListItem = {
  borderBottom: '2px solid #FFFFFF',
  cursor: 'pointer',
  padding: '10px'
}

const style = {
  menu: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    margin: '20px'
  },
  listItem: {
    ...commonListItem
  },
  listItemActive: {
    ...commonListItem,
    borderBottom: '2px solid #CCCCCC'
  }
}

export default style