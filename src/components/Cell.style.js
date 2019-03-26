import { css } from 'glamor'

const commonCell = {
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 'bold',
  height: '2rem',
  justifyContent: 'center',
  maxHeight: '40px',
  maxWidth: '40px',
  position: 'relative',
  userSelect: 'none',
  width: '2rem'
}

export default {
  cell: css({
    ...commonCell,
    borderTop: '2px solid #EEEEEE',
    borderLeft: '2px solid #EEEEEE',
    borderBottom: '2px solid #555555',
    borderRight: '2px solid #555555',
    ':hover': {
      backgroundColor: '#EEEEEE'
    }
  }),
  cellOver: css({
    ...commonCell,
    borderTop: '2px solid #EEEEEE',
    borderLeft: '2px solid #EEEEEE',
    borderBottom: '2px solid #555555',
    borderRight: '2px solid #555555'
  }),
  cellVisible: css({
    ...commonCell,
    backgroundColor: '#CCCCCC',
    borderTop: '2px solid #555555',
    borderLeft: '2px solid #555555',
    borderBottom: '2px solid #CCCCCC',
    borderRight: '2px solid #CCCCCC'
  }),
  cellHovered: css({
    backgroundColor: '#90FC6F'
  }),
  cellExploded: css({
    ...commonCell,
    backgroundColor: '#F76767',
    borderTop: '2px solid #555555',
    borderLeft: '2px solid #555555',
    borderBottom: '2px solid #F76767',
    borderRight: '2px solid #F76767'
  }),
  cellFlag: css({
    ...commonCell,
    borderTop: '2px solid #EEEEEE',
    borderLeft: '2px solid #EEEEEE',
    borderBottom: '2px solid #555555',
    borderRight: '2px solid #555555'
  }),
  emoji: css({
    color: 'red',
    fontSize: '20px',
    height: '1.5rem'
  }),
  value: css({
    fontSize: '22px'
  })
}
