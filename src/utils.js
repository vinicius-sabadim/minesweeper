export const random = (value) => Math.floor(Math.random() * value)

export const getGridSize = (level) => {
  if (level === 'Beginner') return { rows: 9, columns: 9 }
  if (level === 'Intermediate') return { rows: 16, columns: 16 }
  if (level === 'Expert') return { rows: 16, columns: 30 }
}

export const getBombsQuantity = (level) => {
  if (level === 'Beginner') return 10
  if (level === 'Intermediate') return 40
  return 99
}