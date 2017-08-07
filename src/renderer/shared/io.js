import fs from 'fs'
import { remote } from 'electron'

const path = remote.app.getPath('userData') + '\\nDB'
const io = {}

io.path = path

io.loadID = (id) => {

}

io.loadData = () => {
  let code = 'SUCCESS'
  let stack = ''
  let data = null

  // Create directory if it doesn't exist
  try {
    fs.mkdirSync(path)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      code = err.code
      stack = err.stack
    }
  }

  // Try to fetch the data if it exists
  try {
    data = JSON.parse(fs.readFileSync(path + '\\test.json', 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') {
      const newData = {}

      data = newData
      fs.writeFileSync(path + '\\test.json', JSON.stringify(newData), { encoding: 'utf8', flag: 'wx' })
    } else {
      code = err.code
      stack = err.stack
    }
  }
  console.log(data)

  return { code, data, stack }
}

io.saveData = (data) => {
  fs.writeFileSync(path + '\\test.json', JSON.stringify(data), { encoding: 'utf8' })
}

export default io