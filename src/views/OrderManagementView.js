import React, { Component } from 'react';
import { Table, Input, DatePicker, Modal, Button } from 'antd';
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
            userConsumption: null,
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

        // Sort bookCount object by value in descending order
        const sortedBookCount = Object.entries(bookCount).sort((a, b) => b[1] - a[1]);

        const userConsumption = searchedOrders.reduce((acc, order) => {
            if (acc[order.userId]) {
                acc[order.userId] += order.items.reduce((total, item) => total + item.price * item.amount, 0);
            } else {
                acc[order.userId] = order.items.reduce((total, item) => total + item.price * item.amount, 0);
            }
            return acc;
        }, {});

        this.setState({ statistics: { bookCount: sortedBookCount, totalCount, totalPrice }, userConsumption, showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { searchedOrders, filterValue, filterRange, showModal, statistics, userConsumption } = this.state;
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

                {statistics && (
                    <Modal title="Statistics" visible={showModal} onCancel={this.handleCloseModal} footer={null}>
                        <div>
                            <h2>Book Sales Ranking</h2>
                            <Table
                                dataSource={statistics.bookCount}
                                pagination={false}
                                size="small"
                                style={{ marginBottom: '16px' }}
                            >
                                <Column title="Book ID" dataIndex="0" key="bookId" />
                                <Column title="Count" dataIndex="1" key="count" />
                            </Table>
                        </div>

                        <div>
                            <h2>User Consumption Ranking</h2>
                            <Table
                                dataSource={Object.entries(userConsumption).sort((a, b) => b[1] - a[1])} // Updated to sort by consumption
                                pagination={false}
                                size="small"
                            >
                                <Column title="User ID" dataIndex="0" key="userId" />
                                <Column
                                    title="Consumption"
                                    dataIndex="1"
                                    key="consumption"
                                    render={(value) => <span>${value.toFixed(2)}</span>}
                                />
                            </Table>
                        </div>
                    </Modal>
                )}

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
            </div>
        );
    }
}

export default OrderManagementView;
