import { css } from 'glamor'

const commonListItem = {
  borderBottom: '2px solid #FFFFFF',
  cursor: 'pointer',
  padding: '10px'
}

export const menu = css({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'center'
})

export const listItem = css({
  ...commonListItem
})

export const listItemActive = css({
  ...commonListItem,
  borderBottom: '2px solid #CCCCCC'
})