import React from 'react';

import './Home.css';

class HomeContainer extends React.Component {

    state = {
        currency: 'INR',
        msg: ''
    }

    changeHandler = (e) => {
        this.setState({
            currency: e.target.value
        })
    }

    saveHandler = () => {
        localStorage.setItem('currency', this.state.currency);
        this.setState({
            msg: 'Updated preferred currency'
        });
    }

    componentDidMount() {
        const currency = localStorage.getItem('currency');
        if (currency) {
            this.setState({
                currency
            })
        }
    }

    render() {
        const { currency, msg } = this.state;
        return (
            <div className="home-page">
                <h2 className="page-title">Choose a preferred currency</h2>
                <div className="row">
                    <div className="form-group col-3">
                        <select className="form-control" onChange={this.changeHandler} value={currency}>
                            <option val="INR">INR</option>
                            <option val="USD">USD</option>
                            <option val="EUR">EUR</option>
                            <option val="GBP">GBP</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary" type="button" onClick={this.saveHandler}>Save</button>
                    </div>
                </div>

                {msg &&
                    <div className="row">
                        <div className="col-3">
                            <p className="msg alert alert-success">{msg}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default HomeContainer;