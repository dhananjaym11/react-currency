import React from 'react';

import { ENV } from "../../utility/constant";

class ChartContainer extends React.Component {
    state = {
        timeRange: 'week',
        otherCurrency: 'USD'
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
        console.log(this.state);
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

        console.log(startAt, endAt);

        fetch(`${ENV}history?base=${preferredCurrency}&symbols=${otherCurrency}&start_at=${startAt}&end_at=${endAt}`)
            .then(res => res.json())
            .then(results => {
                console.log(results);
                const chartValues = [];
                Object.keys(results.rates).forEach(function (el) {
                    chartValues.push({
                        'date': new Date(el),
                        'currency': results.rates[el][otherCurrency]
                    })
                })
                chartValues.sort((a, b) => a.date - b.date)
                console.log(chartValues);
            })
            .catch(error => console.log(error));
    }

    render() {
        const { timeRange, otherCurrency } = this.state;
        const preferredCurrency = localStorage.getItem('currency');
        return (
            <div>
                <h2>Chart</h2>

                <form>
                    <div className="form-group">
                        <label>Preferred currency = {preferredCurrency}</label>
                    </div>
                    <div className="form-group">
                        <label>Select other currency</label>
                        <select className="form-control" onChange={this.changeHandler} name="otherCurrency" defaultValue={otherCurrency}>
                            <option val="USD">USD</option>
                            <option val="EUR">EUR</option>
                            <option val="GBP">GBP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.changeHandler} name="timeRange" defaultValue={timeRange}>
                            <option value="week">Last week</option>
                            <option value="month">Last month</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-primary" type="button" onClick={this.showHandler}>Show chart</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChartContainer;