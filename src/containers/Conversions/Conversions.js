import React from 'react';

import { ENV } from "../../utility/constant";
import Loader from '../../components/Loader/Loader';

class ConversionsContainer extends React.Component {
    state = {
        amount: 0,
        otherCurrency: 'USD',
        result: 0,
        isShow: false
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    covertHandler = () => {
        this.setState({
            isShow: true
        })

        const preferredCurrency = localStorage.getItem('currency');
        const { amount, otherCurrency } = this.state;

        fetch(`${ENV}latest?base=${preferredCurrency}&symbols=${otherCurrency}`)
            .then(res => res.json())
            .then(results => {
                const factor = results.rates[otherCurrency];
                this.setState({
                    result: (amount * factor).toFixed(2),
                    isShow: false
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const { amount, otherCurrency, result, isShow } = this.state;
        const preferredCurrency = localStorage.getItem('currency');

        return (
            <div className="conversions-page">
                <h2 className="page-title">Conversions</h2>

                <form>
                    <div className="row">
                        <div className="form-group col-3">
                            <label>Enter amount (in {preferredCurrency})</label>
                            <input className="form-control" type="text" name="amount" onChange={this.changeHandler} value={amount} />
                        </div>
                        <div className="form-group col-3">
                            <label>Select conversions currency</label>
                            <select className="form-control" onChange={this.changeHandler} name="otherCurrency" defaultValue={otherCurrency}>
                                <option val="USD">USD</option>
                                <option val="EUR">EUR</option>
                                <option val="GBP">GBP</option>
                            </select>
                        </div>
                        <div className="form-group col-2">
                            <label>&nbsp;</label>
                            <button className="btn btn-primary" type="button" onClick={this.covertHandler}>Convert</button>
                        </div>
                        {result ?
                            <div className="form-group col-3">
                                <label>Result:</label>
                                <h5 className="alert alert-success">{result}</h5>
                            </div> : null
                        }
                    </div>
                </form>

                <Loader isShow={isShow} />

            </div>
        )
    }
}

export default ConversionsContainer;