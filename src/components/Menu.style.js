import { css } from 'glamor'

const commonListItem = {
  borderBottom: '2px solid #FFFFFF',
  cursor: 'pointer',
  marginRight: '20px',
  padding: '10px 0'
}

export const menu = css({
  display: 'flex',
  listStyle: 'none',
  marginBottom: '30px'
})

export const listItem = css({
  ...commonListItem
})

export const listItemActive = css({
  ...commonListItem,
  borderBottom: '2px solid #CCCCCC'
})