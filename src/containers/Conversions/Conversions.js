import React from 'react';

import { ENV } from "../../utility/constant";

class ConversionsContainer extends React.Component {
    state = {
        ammount: 0,
        otherCurrency: 'USD',
        result: 0
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    covertHandler = () => {
        console.log(this.state);
        const preferredCurrency = localStorage.getItem('currency');
        const { ammount, otherCurrency } = this.state;

        fetch(`${ENV}latest?base=${preferredCurrency}&symbols=${otherCurrency}`)
            .then(res => res.json())
            .then(results => {
                console.log(results);
                const factor = results.rates[otherCurrency];
                this.setState({
                    result: (ammount * factor).toFixed(2)
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const { ammount, otherCurrency, result } = this.state;
        const preferredCurrency = localStorage.getItem('currency');

        return (
            <div>
                <h2>Conversions</h2>

                <form>
                    <div className="form-group">
                        <label>Enter ammount (in {preferredCurrency})</label>
                        <input className="form-control" type="text" name="ammount" onChange={this.changeHandler} value={ammount} />
                    </div>
                    <div className="form-group">
                        <label>Select other currency</label>
                        <select className="form-control" onChange={this.changeHandler} name="otherCurrency" defaultValue={otherCurrency}>
                            <option val="USD">USD</option>
                            <option val="EUR">EUR</option>
                            <option val="GBP">GBP</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-primary" type="button" onClick={this.covertHandler}>Convert</button>
                    </div>
                </form>

                {result &&
                    <h5>Result: {result}</h5>
                }
            </div>
        )
    }
}

export default ConversionsContainer;