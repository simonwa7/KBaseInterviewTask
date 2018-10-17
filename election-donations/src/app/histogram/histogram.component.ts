import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
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
  @Input('candidateData') candidateData = [];
  @Input('title') title = 'Histogram';

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 80};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() {}

  ngOnInit() {
      console.log(this.candidateData)
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();

      console.log(d3.select('svg').node().getBoundingClientRect().width)
  }

  private initSvg() {
      this.svg = d3.select('svg');
      this.width = +this.svg.node().getBoundingClientRect().width - this.margin.left - this.margin.right;
      this.height = +this.svg.node().getBoundingClientRect().height - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
      this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
      this.x.domain(this.candidateData.map((d) => d.name));
      this.y.domain([0, d3Array.max(this.candidateData, (d) => d.value)*1.5]);
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
          .data(this.candidateData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => this.x(d.name) )
          .attr('y', (d) => this.y(d.value) )
          .attr('width', this.x.bandwidth())
          .attr('height', (d) => this.height - this.y(d.value) );
  }

}
