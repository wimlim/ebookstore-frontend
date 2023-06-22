import React, { Component } from 'react';
import { Table, Input, DatePicker, Modal, Button } from 'antd';
import { filterOrders } from '../utils/OrderUtil';
import StatisticsModal from '../components/StatisticsModal';
import { fetchOrders } from '../services/OrderService'; // Import fetchOrders from OrderService

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
        this.fetchOrders(); // Call fetchOrders from componentDidMount
    }

    fetchOrders = async () => {
        try {
            const orders = await fetchOrders(); // Call the imported fetchOrders function
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
                    <StatisticsModal
                        showModal={showModal}
                        handleCloseModal={this.handleCloseModal}
                        statistics={statistics}
                        userConsumption={userConsumption}
                    />
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
