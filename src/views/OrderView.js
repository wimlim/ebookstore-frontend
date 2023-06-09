import React, { Component } from "react";
import { Button, DatePicker, Modal } from "antd";
import "../css/home.css";
import OrderList from "../components/OrderList";
import { filterOrders } from "../utils/OrderUtil";

const { RangePicker } = DatePicker;

class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedRange: null,
            showModal: false,
            statistics: null,
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
                const id = timestampObj.id;
                const items = timestampObj.items.map((item) => ({
                    id: item.bookId,
                    title: item.title,
                    amount: item.num,
                    price: item.price,
                }));
                return {
                    id,
                    timestamp,
                    items,
                };
            });
            this.setState({ orders });
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Failed to fetch data. Please try again later.");
        }
    }

    handleRangeChange = (dates) => {
        this.setState({ selectedRange: dates });
    };

    handleStatistics = () => {
        const { orders, selectedRange } = this.state;
        if (selectedRange && selectedRange.length === 2) {
            const filteredOrders = filterOrders(orders, selectedRange);

            let bookCount = {};
            let totalCount = 0;
            let totalPrice = 0;

            filteredOrders.forEach((order) => {
                order.items.forEach((item) => {
                    if (bookCount[item.id]) {
                        bookCount[item.id] += item.amount;
                    } else {
                        bookCount[item.id] = item.amount;
                    }
                    totalCount += item.amount;
                    totalPrice += item.price * item.amount;
                });
            });

            const statistics = {
                bookCount,
                totalCount,
                totalPrice,
            };

            this.setState({ statistics, showModal: true });
        }
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { selectedRange, orders, showModal, statistics } = this.state;
        const filteredOrders = filterOrders(orders, selectedRange) || [];

        return (
            <div>
                <RangePicker
                    value={selectedRange}
                    onChange={this.handleRangeChange}
                    format="YYYY年MM月DD日"
                />
                <Button onClick={this.handleStatistics}>Statistics</Button>
                <OrderList orders={filteredOrders} />

                <Modal
                    title="Statistics"
                    visible={showModal}
                    onCancel={this.handleCloseModal}
                    footer={null}
                >
                    {statistics && (
                        <div>
                            <h4>Book Count:</h4>
                            <ul>
                                {Object.keys(statistics.bookCount).map((bookId) => {
                                    let title = '';
                                    for (const order of filteredOrders) {
                                        const item = order.items.find((item) => item.id == bookId);
                                        if (item) {
                                            title = item.title;
                                            break;
                                        }
                                    }
                                    return (
                                        <li key={bookId}>
                                            Book Name: {title}, Count: {statistics.bookCount[bookId]}
                                        </li>
                                    );
                                })}
                            </ul>
                            <p>Total Count: {statistics.totalCount}</p>
                            <p>Total Price: {statistics.totalPrice}</p>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}

export default OrderView;
