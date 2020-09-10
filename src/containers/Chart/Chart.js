import React from 'react';

import './Chart.css';
import { ENV } from "../../utility/constant";
import LineChart from '../../components/LineChart/LineChart';

class ChartContainer extends React.Component {
    state = {
        timeRange: 'week',
        otherCurrency: 'USD',
        chartdata: null
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formatDate(d) {
        const month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month, day].join('-');
    }

    showHandler = () => {
        const preferredCurrency = localStorage.getItem('currency');
        const { timeRange, otherCurrency } = this.state;
        let diff = 0;

        if (timeRange === 'week') {
            diff = 7;
        } else if (timeRange === 'month') {
            diff = 30;
        }
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - diff);
        const startAt = this.formatDate(startDate);
        const endAt = this.formatDate(new Date());

        fetch(`${ENV}history?base=${preferredCurrency}&symbols=${otherCurrency}&start_at=${startAt}&end_at=${endAt}`)
            .then(res => res.json())
            .then(results => {
                const chartValues = [];
                Object.keys(results.rates).forEach(function (el) {
                    chartValues.push({
                        'date': new Date(el),
                        'amount': results.rates[el][otherCurrency]
                    })
                })
                chartValues.sort((a, b) => a.date - b.date);
                this.setState({
                    chartdata: chartValues
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const { timeRange, otherCurrency, chartdata } = this.state;
        const preferredCurrency = localStorage.getItem('currency');
        return (
            <div className="chart-page">
                <h2 className="page-title">Chart</h2>

                <div className="alert alert-info">Your preferred currency is {preferredCurrency}</div>
                <form>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Select other currency</label>
                            <select className="form-control" onChange={this.changeHandler} name="otherCurrency" defaultValue={otherCurrency}>
                                <option val="USD">USD</option>
                                <option val="EUR">EUR</option>
                                <option val="GBP">GBP</option>
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label>Select period</label>
                            <select className="form-control" onChange={this.changeHandler} name="timeRange" defaultValue={timeRange}>
                                <option value="week">Last week</option>
                                <option value="month">Last month</option>
                            </select>
                        </div>
                        <div className="form-group col-2">
                            <label>&nbsp;</label>
                            <button className="btn btn-primary" type="button" onClick={this.showHandler}>Show chart</button>
                        </div>
                    </div>
                </form>

                {chartdata &&
                    <div>
                        <LineChart orgWidth={400} orgHeight={350} data={chartdata} />
                    </div>}

            </div>
        )
    }
}

export default ChartContainer;