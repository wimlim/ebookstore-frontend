import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import '../css/home.css'
import OrderList from "../components/OrderList";

const { RangePicker } = DatePicker;

class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedRange: null
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
                const items = timestampObj.items.map(item => ({
                    id: item.bookId,
                    title: item.title,
                    amount: item.num,
                    price: item.price
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

    handleRangeChange = (dates) => {
        this.setState({ selectedRange: dates });
    };

    filterOrders = () => {
        const { selectedRange, orders } = this.state;
        if (selectedRange && selectedRange.length === 2) {
            const [startDate, endDate] = selectedRange;
            const filteredOrders = orders.filter(order => {
                alert(order.timestamp)
                const orderDate = new Date(order.timestamp);
                return orderDate >= startDate && orderDate <= endDate;
            });
            return filteredOrders;
        }
        return orders;
    };

    render() {
        const { selectedRange } = this.state;

        return (
            <div>
                <RangePicker value={selectedRange} onChange={this.handleRangeChange} />
                <Button onClick={this.filterOrders}>Filter</Button>
                <OrderList orders={this.filterOrders()} />
            </div>
        );
    }
}

export default OrderView;
