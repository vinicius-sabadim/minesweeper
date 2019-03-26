import { css } from 'glamor'

const commonListItem = {
  borderBottom: '2px solid #FFFFFF',
  cursor: 'pointer',
  marginRight: '20px',
  padding: '10px 0'
}

export default {
  menu: css({
    display: 'flex',
    listStyle: 'none',
    marginBottom: '30px'
  }),

  listItem: css({
    ...commonListItem
  }),
  listItemActive: css({
    ...commonListItem,
    borderBottom: '2px solid #CCCCCC'
  })
}
