import React, {Component} from 'react';
import Card from "../card/card";
import styles from './app.module.css'
import Filters from "../filters/filters";
import {DURATION_ASC, PRICE_ASC, PRICE_DESC} from "../filters/orders";

const comparators = {
    [PRICE_ASC]: (a,b) => a.flight.price.total.amount - b.flight.price.total.amount,
    [PRICE_DESC]: (a,b) => b.flight.price.total.amount - a.flight.price.total.amount,
    [DURATION_ASC]: (a,b) => a.flight.legs[0].duration - b.flight.legs[0].duration
};

function applyFilters(flights, {order, ignoreTransfers, prices}) {
    const filteredFlights = flights.filter(f => {
        const price = f.flight.price.total.amount;
        if(price < prices[0] || price > prices[1]){
            return false;
        }
        return !ignoreTransfers || f.flight.legs[0].segments.length < 2;
    });
    return filteredFlights.sort(comparators[order]);
}

class App extends Component {

    static getDerivedStateFromProps(props, state){
        return {
            flights: applyFilters(props.flights, state)
        }
    }

    state = {
        order: PRICE_ASC,
        ignoreTransfers: false,
        prices: [0, 100000],
        flights: []
    };

    setOrder = (order) => {
        this.setState({order});
    };

    setTransferFilter = (active) => {
        this.setState({ignoreTransfers: active});
    };

    setPrice = (value, index) => {
        this.setState(state => {
            const prices = [...this.state.prices];
            prices[index] = +value||0;
            return {
                prices
            };
        });
    };

    render() {
        const {flights, order, ignoreTransfers, prices} = this.state;
        return (
            <div className={styles.root}>
                <div className={styles.panel}>
                    <Filters order={order} ignoreTransfers={ignoreTransfers}
                             setPrice={this.setPrice}
                             prices={prices}
                             setOrder={this.setOrder} setTransferFilter={this.setTransferFilter}/>
                </div>
                <div className={styles.container}>
                    {flights.map((data, i) => <Card key={data.flightToken} {...data} />)}
                </div>
            </div>
        )
    }
}

export default App;
