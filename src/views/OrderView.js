import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import '../css/home.css';
import OrderList from '../components/OrderList';

const { RangePicker } = DatePicker;

class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedRange: null,
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:8080/orders/${this.props.user}`);
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const json = await res.json();
            const orders = json.map((timestampObj) => {
                const timestamp = timestampObj.timestamp;
                const items = timestampObj.items.map((item) => ({
                    id: item.bookId,
                    title: item.title,
                    amount: item.num,
                    price: item.price,
                }));
                return {
                    timestamp,
                    items,
                };
            });
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
            const startDate = new Date(selectedRange[0]);
            const endDate = new Date(selectedRange[1]);

            const startDateFormatted = startDate.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            const endDateFormatted = endDate.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            const filteredOrders = orders.filter((order) => {
                const timestamp = new Date(order.timestamp.replace(/[年月]/g, '/').replace('日', ''));
                return (
                    timestamp >= startDate &&
                    timestamp <= endDate
                );
            });

            return filteredOrders;
        }

        return orders;
    };

    render() {
        const { selectedRange } = this.state;

        return (
            <div>
                <RangePicker
                    value={selectedRange}
                    onChange={this.handleRangeChange}
                    format="YYYY年MM月DD日"
                />
                <Button onClick={this.filterOrders}>Filter</Button>
                <OrderList orders={this.filterOrders()} />
            </div>
        );
    }
}

export default OrderView;
