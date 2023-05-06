import React, { Component } from 'react';
import { Button } from 'antd';
import '../css/home.css'
import SearchBar from "../components/SearchBar";
import OrderList from "../components/OrderList";

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:8080/orders/${this.props.user}`);
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const json = await res.json();
            const orders = [];
            for (const timestampObj of json) {
                const timestamp = timestampObj.timestamp;
                const items = timestampObj.items.map(itemArr => ({
                    id: itemArr[0],
                    title: itemArr[1],
                    amount: itemArr[2],
                    price: itemArr[3]
                }));
                orders.push({
                    timestamp,
                    items
                });
            }
            this.setState({ orders });
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('Failed to fetch data. Please try again later.');
        }
    }

    render() {

        return (
            <div>
                <OrderList orders={this.state.orders}/>
            </div>
        );
    }
}

export default CartView;
