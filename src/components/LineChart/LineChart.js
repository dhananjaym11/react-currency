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
            height = orgHeight - margin.top - margin.bottom;

        const xScale = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.amount), d3.max(data, d => d.amount)])
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
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("path")
            .datum(data)
            .attr("d", valueline(data))
            .attr("class", "line");

        // X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default LineChart;