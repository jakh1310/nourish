import * as d3 from 'd3'

class d3w {
  constructor(el) {
    this.el = d3.select(el)

    this.el.append("svg")
  }

  addData(data) {

  }

  setSize(h, w) {
    console.log(h, w)
  }

  updateData(data) {
    
  }
}

export default d3w