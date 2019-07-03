export const generateGrid = (rows, columns) => {
  const cells = rows * columns

  return [...Array(cells)].reduce((acc, _, index) => {
    const id = parseInt(index, 10)

    return [
      ...acc,
      {
        id,
        row: Math.floor(id / columns),
        column: id % columns,
        hasBomb: false,
        hasFlag: false,
        dangerLevel: 0,
        isHovered: false,
        isVisible: false,
        neighbors: []
      }
    ]
  }, [])
}
