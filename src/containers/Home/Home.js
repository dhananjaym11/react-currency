import React from 'react';

class HomeContainer extends React.Component {

    state = {
        currency: 'INR',
    }

    changeHandler = (e) => {
        this.setState({
            currency: e.target.value
        })
    }

    saveHandler = () => {
        localStorage.setItem('currency', this.state.currency);
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
        return (
            <div>
                <div className="form-group">
                    <h3>Choose a preferred currency</h3>
                    <select className="form-control" onChange={this.changeHandler} value={this.state.currency}>
                        <option val="INR">INR</option>
                        <option val="USD">USD</option>
                        <option val="EUR">EUR</option>
                        <option val="GBP">GBP</option>
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={this.saveHandler}>Save</button>
                </div>
            </div>
        )
    }
}

export default HomeContainer;