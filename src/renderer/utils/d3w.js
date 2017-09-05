import * as d3 from 'd3'

const parseDate = d3.timeParse("%d%m%Y")

class d3w {
  constructor(el, w, h) {
    this.el = d3.select(el)

    this.margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    }
    this.width = w - this.margin.left - this.margin.right
    this.height = h - this.margin.top - this.margin.bottom

    this.x = d3.scaleTime().range([0, this.width])
    this.y = d3.scaleLinear().range([this.height, 0])

    this.line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => { return this.x(d.date) })
      .y((d) => { return this.y(d.calories) })

    this.svg = this.el.append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
    
    this.svg.append("path")
      .attr("class", "line")

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .attr("class", "x-axis")
      .call(d3.axisBottom(this.x))

    this.svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(this.y))
  }

  updateData(data) {
    data.forEach((d) => {
      d.date = parseDate(d.date)
      d.calories = +d.calories
    })

    this.x.domain(d3.extent(data, (d) => { return d.date }))
    this.y.domain([0, d3.max(data, (d) => { return d.calories })])

    this.el.transition()

    this.svg.select(".line")
      //.duration(750)
      .attr("d", this.line(data))

    this.svg.select(".x-axis")
      .call(d3.axisBottom(this.x))

    this.svg.select(".y-axis")
      .call(d3.axisLeft(this.y))
  }

  setSize(h, w) {
    this.width = w - this.margin.left - this.margin.right
    this.height = h - this.margin.top - this.margin.bottom

    this.svg.attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
  }
}

export default d3w