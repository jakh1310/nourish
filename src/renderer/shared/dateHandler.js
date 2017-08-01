const dateHandler = {}

function d () {
  const date = new Date()
  const dd = date.getDate()
  const mm = date.getMonth()
  const yy = date.getFullYear()

  return { dd, mm, yy }
}

function dateOffset (offset) {
  const date = new Date(d().yy, d().mm, d().dd + offset)
  const dd = date.getDate()
  const mm = date.getMonth()
  const yy = date.getFullYear()

  return { dd, mm, yy }
}

dateHandler.getDateString = (offset = 0) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let month = months[dateOffset(offset).mm]
  let year = dateOffset(offset).yy

  let day = dateOffset(offset).dd
  let suffix = 'th'
  let j = day % 10
  let k = day % 100
  if (j == 1 && k != 11) {
    suffix = 'st'
  } else if (j == 2 && k != 12) {
    suffix = 'nd'
  } else if (j == 3 && k != 13) {
    suffix = 'rd'
  }
  
  return `${month} ${day}, ${year}`
}

dateHandler.getDateID = (offset = 0) => {
  const day = (dateOffset(offset).dd < 10) ? '0'+dateOffset(offset).dd : dateOffset(offset).dd
  const month = (dateOffset(offset).mm < 9) ? '0'+(dateOffset(offset).mm+1) : dateOffset(offset).mm
  const year = dateOffset(offset).yy

  return day + month + year
}

export default dateHandler