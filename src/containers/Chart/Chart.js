import React from 'react';

import './Chart.scss';
import { ENV } from "../../utility/constant";
import { getLocalstorage } from '../../utility/functions';
import Loader from '../../components/Loader/Loader';
import LineChart from '../../components/LineChart/LineChart';

class ChartContainer extends React.Component {
    state = {
        timeRange: 'week',
        chartdata: null,
        isShow: false
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
        this.setState({
            isShow: true
        })

        const preferredCurrency = getLocalstorage('currency');
        const { timeRange } = this.state;
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

        fetch(`${ENV}history?base=${preferredCurrency}&symbols=USD,EUR,GBP&start_at=${startAt}&end_at=${endAt}`)
            .then(res => res.json())
            .then(results => {
                const { rates } = results;
                const obj = {};
                const chartValues = [];
                Object.keys(rates).forEach(function (date) {
                    Object.keys(rates[date]).forEach(function (currency) {
                        const newDate = new Date(date);
                        if (obj[currency]) {
                            obj[currency].push({
                                date: newDate,
                                amount: rates[date][currency]
                            })
                        } else {
                            obj[currency] = [];
                            obj[currency].push({
                                date: newDate,
                                amount: rates[date][currency]
                            })
                        }
                    })
                });
                Object.keys(obj).forEach(function (currency) {
                    const sortedArr = obj[currency].sort((a, b) => a.date - b.date);
                    chartValues.push({
                        name: currency,
                        values: sortedArr,
                    })
                });

                this.setState({
                    chartdata: chartValues,
                    isShow: false
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const { timeRange, chartdata, isShow } = this.state;
        const preferredCurrency = getLocalstorage('currency');
        return (
            <div className="chart-page">
                <h2 className="page-title">Chart</h2>

                <div className="alert alert-info">Your preferred currency is {preferredCurrency}</div>
                <form>
                    <div className="row">
                        {/* <div className="form-group col-3">
                            <label>Select other currency</label>
                            <select className="form-control" onChange={this.changeHandler} name="otherCurrency" defaultValue={otherCurrency}>
                                <option val="USD">USD</option>
                                <option val="EUR">EUR</option>
                                <option val="GBP">GBP</option>
                            </select>
                        </div> */}
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
                        <LineChart orgWidth={600} orgHeight={350} data={chartdata} />
                    </div>}

                <Loader isShow={isShow} />

            </div>
        )
    }
}

export default ChartContainer;