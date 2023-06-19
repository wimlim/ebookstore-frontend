import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { Column } = Table;
const { RangePicker } = DatePicker;

class OrderManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            searchedOrders: [],
            editingOrderId: null,
            editingOrderItems: [],
            isEditing: false,
            filterValue: '',
            filterRange: null,
        };
    }
    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders/all');
            const orders = response.data;
            this.setState({ orders });
            this.handleSearch();
        } catch (error) {
            console.log(error);
        }
    };

    showEditModal = (order) => {
        const { id, items } = order;
        this.setState({
            editingOrderId: id,
            editingOrderItems: items,
            isEditing: true,
        });
    };

    handleEditCancel = () => {
        this.setState({
            editingOrderId: null,
            editingOrderItems: [],
            isEditing: false,
        });
    };

    handleEditSave = async () => {
        const { editingOrderId, editingOrderItems } = this.state;

        const updatedOrder = {
            id: editingOrderId.toString(),
            items: editingOrderItems,
        };

        try {
            await axios.put(
                `http://localhost:8080/orders/${editingOrderId}`,
                JSON.stringify(updatedOrder),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            this.fetchOrders();
            this.handleEditCancel();
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/orders/${id}`);
            this.fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSearch = () => {
        const { orders, filterValue, filterRange } = this.state;

        const searchedOrders = orders.filter((order) => {
            const { timestamp, items } = order;

            const isTitleMatched = items.some((item) =>
                item.title.includes(filterValue)
            );

            const isTimestampInRange = filterRange
                ? timestamp >= filterRange[0] && timestamp <= filterRange[1]
                : true;


            return isTitleMatched && isTimestampInRange;
        });

        this.setState({ searchedOrders });
    };

    handleRangeChange = (dates) => {
        this.setState({ filterRange: dates }, this.handleSearch);
    };

    render() {
        const {
            searchedOrders,
            editingOrderId,
            editingOrderItems,
            isEditing,
            filterValue,
            filterRange,
        } = this.state;

        const dataSource = searchedOrders;

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <Input
                        placeholder="Search by title"
                        value={filterValue}
                        onChange={(e) =>
                            this.setState({ filterValue: e.target.value })
                        }
                        onBlur={this.handleSearch}
                    />
                    <RangePicker
                        style={{ marginLeft: '16px' }}
                        value={filterRange}
                        onChange={this.handleRangeChange}
                        onOk={this.handleSearch}
                        onBlur={this.handleSearch}
                    />
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
                                    <li key={item.bookId}>
                                        Title: {item.title}, Num: {item.num}, Price: {item.price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <div>
                                <Button
                                    type="primary"
                                    onClick={() => this.showEditModal(record)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => this.handleDelete(record.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    />
                </Table>

                <Modal
                    title="Edit Order"
                    visible={isEditing}
                    onCancel={this.handleEditCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleEditCancel}>
                            Cancel
                        </Button>,
                        <Button key="save" type="primary" onClick={this.handleEditSave}>
                            Save
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item label="Items">
                            <Input.TextArea
                                name="editingOrderItems"
                                value={editingOrderItems}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default OrderManagementView;