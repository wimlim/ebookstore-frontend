import React, { Component } from 'react';
import { Table, Input, DatePicker, Modal, Button } from 'antd';
import axios from 'axios';
import { filterOrders } from '../utils/OrderUtil';

const { Column } = Table;
const { RangePicker } = DatePicker;

class OrderManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            searchedOrders: [],
            filterValue: '',
            filterRange: null,
            showModal: false,
            statistics: null,
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = async () => {
        try {
            const res = await fetch(`http://localhost:8080/orders/all`);
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
                    id: timestampObj.id,
                    userId: timestampObj.userId,
                    timestamp,
                    items,
                };
            });
            this.setState({ orders });
            this.handleSearch();
        } catch (error) {
            console.log("Error fetching data:", error);
            alert("Failed to fetch data. Please try again later.");
        }
    };

    handleInputChange = (e) => {
        this.setState({ filterValue: e.target.value });
    };

    handleRangeChange = (dates) => {
        this.setState({ filterRange: dates });
    };

    handleSearch = () => {
        const { orders, filterValue, filterRange } = this.state;
        let searchedOrders = [...orders];

        if (filterValue) {
            searchedOrders = searchedOrders.filter((order) =>
                order.items.some((item) => item.title.toLowerCase().includes(filterValue.toLowerCase()))
            );
        }

        if (filterRange && filterRange.length === 2) {
            searchedOrders = filterOrders(searchedOrders, filterRange);
        }

        this.setState({ searchedOrders });
    };

    handleShowStatistics = () => {
        const { searchedOrders } = this.state;
        // Calculate statistics
        let bookCount = {};
        let totalCount = 0;
        let totalPrice = 0;

        searchedOrders.forEach((order) => {
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
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { searchedOrders, filterValue, filterRange, showModal, statistics } = this.state;
        const dataSource = searchedOrders;

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <Input
                        placeholder="Search by title"
                        value={filterValue}
                        name="filterValue"
                        onChange={this.handleInputChange}
                        onBlur={this.handleSearch}
                    />
                    <RangePicker
                        style={{ marginLeft: '16px' }}
                        value={filterRange}
                        onChange={this.handleRangeChange}
                        onOk={this.handleSearch}
                        onBlur={this.handleSearch}
                    />
                    <Button type="primary" onClick={this.handleShowStatistics}>
                        Show Statistics
                    </Button>
                </div>

                <Table dataSource={dataSource} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Timestamp" dataIndex="timestamp" key="timestamp" />
                    <Column title="User ID" dataIndex="userId" key="userId" />
                    <Column
                        title="Items"
                        dataIndex="items"
                        key="items"
                        render={(items) => (
                            <ul>
                                {items.map((item) => (
                                    <li key={item.id}>
                                        Title: {item.title}, Num: {item.amount}, Price: {item.price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    />
                </Table>

                <Modal title="Statistics" visible={showModal} onCancel={this.handleCloseModal} footer={null}>
                    {statistics && (
                        <div>
                            <h4>Book Count:</h4>
                            <ul>
                                {Object.keys(statistics.bookCount).map((bookId) => (
                                    <li key={bookId}>
                                        Book ID: {bookId}, Count: {statistics.bookCount[bookId]}
                                    </li>
                                ))}
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

export default OrderManagementView;
