import React, { Component } from 'react';
import { Table, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleAmountChange = (value, record) => {
        const newRecord = {
            ...record,
            amount: value,
        };
        this.props.handleAmountChange(newRecord);
    };

    render() {
        const { lists } = this.props;

        const columns = [
            {
                title: 'Cover',
                dataIndex: 'cover',
                key: 'cover',
                render: (text, record) => (
                    <Link to={`/bookDetails?id=${record.cover}`}>
                        <img src={`http://localhost:8080/books/image/${record.cover}`} alt="Book cover" style={{ maxHeight: '100px', maxWidth: '100px' }} />
                    </Link>
                )
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (text, record) => (
                    <InputNumber min={1} defaultValue={record.amount} onChange={(value) => this.handleAmountChange(value, record)} />
                ),
            },
            {
                title: 'Price/＄',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" danger onClick={() => this.props.handleDelete(record)}>
                        Delete
                    </Button>
                ),
            },
        ];

        const pagination = {
            pageSize: 10,
            total: lists.length,
            showQuickJumper: true,
        };

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={lists}
                    pagination={pagination}
                />
            </div>
        );
    }
}

export default ShoppingList;
