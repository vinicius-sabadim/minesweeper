import { css } from 'glamor'

export default {
  menu: css({
    display: 'flex',
    listStyle: 'none',
    marginBottom: '30px'
  }),
  listItem: css({
    borderBottom: '2px solid #FFFFFF',
    cursor: 'pointer',
    marginRight: '20px',
    padding: '10px 0'
  }),
  listItemActive: css({
    borderBottom: '2px solid #CCCCCC'
  })
}
