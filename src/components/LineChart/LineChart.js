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
        const node = this.node;
        const { orgWidth, orgHeight, data } = this.props;

        const margin = { top: 20, right: 20, bottom: 50, left: 50 },
            width = orgWidth - margin.left - margin.right,
            height = orgHeight - margin.top - margin.bottom;

        data.forEach((d) => {
            d.date = +d.date;
            d.amount = +d.amount;
        });

        // const xScale = d3.scaleTime()
        //     .domain([
        //         new Date(data[0].date),
        //         new Date(data[data.length - 1].date)
        //     ])
        //     .range([0, width]);
        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.amount)])
            .range([height, 0]);

        const valueline = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

        const xAxis = d3.axisBottom()
            .scale(xScale)
        // .tickFormat(d => d + '-A');
        // .tickFormat(d3.timeFormat("%m-%Y"));
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