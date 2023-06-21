import React, { Component } from 'react';
import { Table, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { orders } = this.props;

        let orderCount = 0;

        return (
            <div>
                {orders.map((order) => {
                    orderCount++;
                    return (
                        <div key={order.id}>
                            <h2>Order {order.id} - {order.timestamp}</h2>
                            <Table
                                dataSource={order.items}
                                columns={[                                {                                    title: 'Cover',                                    dataIndex: 'id',                                    key: 'id',                                    render: (text, record) => (                                        <Link to={`/bookDetails?id=${record.id}`}>                                            <img src={`http://localhost:8080/books/image/${record.id}`} alt="Book cover" style={{ maxHeight: '100px', maxWidth: '100px' }} />                                        </Link>                                    )                                },                                {                                    title: 'Title',                                    dataIndex: 'title',                                    key: 'title',                                },                                {                                    title: 'Amount',                                    dataIndex: 'amount',                                    key: 'amount',                                },                                {                                    title: 'Price/＄',                                    dataIndex: 'price',                                    key: 'price',                                },                                {                                    title: 'Total/＄',                                    key: 'total',                                    render: (text, record) => (                                        <span>{record.amount * record.price}</span>                                    )                                },                            ]}
                                footer={() => (
                                    <div style={{ textAlign: 'right' }}>
                                        <h3>Total: {order.items.reduce((sum, item) => sum + item.amount * item.price, 0)}</h3>
                                    </div>
                                )}
                                pagination={false}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default OrderList;