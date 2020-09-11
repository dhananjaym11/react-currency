import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {
    componentDidMount() {
        this.createchart();
    }

    componentDidUpdate() {
        this.createchart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data;
    }

    createchart() {
        const { orgWidth, orgHeight, data } = this.props;
        const node = this.node;

        // First clean up the svg, so when update happens there's no previous data is present
        d3.select(node)
            .selectAll("g")
            .remove();

        const margin = { top: 20, right: 20, bottom: 50, left: 50 },
            width = orgWidth - margin.left - margin.right,
            height = orgHeight - margin.top - margin.bottom,
            color = ['red', 'green', 'blue'];

        const xScale = d3.scaleUtc()
            .domain(d3.extent(data[0].values, d => d.date))
            .range([0, width - 200]);
        const yScale = d3.scaleLinear()
            .domain([
                d3.min(data, d => d3.min(d.values, d => d.amount)),
                d3.max(data, d => d3.max(d.values, d => d.amount))
            ])
            .range([height, 0]);

        const valueline = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5)
            .tickFormat(d3.timeFormat("%d-%m"));
        const yAxis = d3.axisLeft()
            .scale(yScale)

        const svg = d3.select(node)
            .attr('width', orgWidth)
            .attr('height', orgHeight)

        const svgChartG = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // currecny lines
        const lineGroup = svgChartG.append('g')
            .selectAll('.line-group')
            .data(data)
            .enter()
            .append('g');

        lineGroup.append('path')
            .attr('d', d => valueline(d.values))
            .attr('class', 'line')
            .style('stroke', (d, i) => color[i])

        // X Axis
        svgChartG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Y Axis
        svgChartG.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // legend
        const svgLegend = svg.append("g")
            .attr("class", "legend-group")
            .attr("transform", "translate(" + (orgWidth - 150) + "," + margin.top + ")");

        const svgLegendG = svgLegend.selectAll(".legend")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => "translate(0," + i * 18 + ")");

        svgLegendG
            .append("text")
            .attr("x", 25)
            .attr("y", 18)
            .attr("dy", ".35em")
            .text(d => d.name);

        svgLegendG.append("line")          // attach a line
            .attr("class", 'legend-line')
            .attr("x1", 0)
            .attr("y1", 18)
            .attr("x2", 17)
            .attr("y2", 18)
            .style("stroke", (d, i) => color[i]);
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default LineChart;