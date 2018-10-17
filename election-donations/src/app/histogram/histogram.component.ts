import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-histogram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  will_data = [{"name": "Hillary Clinton", "donations": 111715}, {"name": "Donald Trump", "donations": 50500}, {"name": "Bernie Sanders", "donations": 500}, {"name": "Ben Carson", "donations": 71430}]
  title = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 80};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() {}

  ngOnInit() {
      console.log(this.will_data)
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
  }

  private initSvg() {
      this.svg = d3.select('svg');
      this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
      this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
      this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
      this.x.domain(this.will_data.map((d) => d.name));
      this.y.domain([0, d3Array.max(this.will_data, (d) => d.donations)*1.2]);
  }

  private drawAxis() {
      this.g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));
      this.g.append('g')
          .attr('class', 'axis axis--y')  
          .call(d3Axis.axisLeft(this.y).ticks(10, '$'))
          .append('text')
          .attr('class', 'axis-title')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Donations Raised (USD)');
  }

  private drawBars() {
      this.g.selectAll('.bar')
          .data(this.will_data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => this.x(d.name) )
          .attr('y', (d) => this.y(d.donations) )
          .attr('width', this.x.bandwidth())
          .attr('height', (d) => this.height - this.y(d.donations) );
  }

}
