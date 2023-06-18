import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

import SearchBar from '../components/SearchBar';

const { Column } = Table;

class OrderManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            searchedOrders: [],
            editingOrderId: null,
            editingOrderItems: [],
            isEditing: false,
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

    handleSearch = (value) => {
        const { orders } = this.state;
        const searchedOrders = orders.filter((order) =>
            order.items.some((item) => item.title.includes(value))
        );
        this.setState({ searchedOrders });
    };

    render() {
        const {
            orders,
            searchedOrders,
            editingOrderId,
            editingOrderItems,
            isEditing,
        } = this.state;

        const dataSource = searchedOrders.length > 0 ? searchedOrders : orders;

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} />

                <Table dataSource={dataSource} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column
                        title="Timestamp"
                        dataIndex="timestamp"
                        key="timestamp"
                    />
                    <Column
                        title="User ID"
                        dataIndex="userId"
                        key="userId"
                    />
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
