import React from 'react';
import { Table, Button } from 'antd';

const { Column } = Table;

const BookTable = (props) => {
    const { dataSource, handleEditModal, handleDelete } = props;

    return (
        <Table dataSource={dataSource} rowKey="id">
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Title" dataIndex="title" key="title" />
            <Column
                title="Cover"
                dataIndex="id"
                key="cover"
                render={(id) => (
                    <img
                        src={`http://localhost:8080/books/image/${id}`}
                        alt="Book Cover"
                        style={{ width: '100px', height: 'auto' }}
                    />
                )}
            />
            <Column title="Author" dataIndex="author" key="author" />
            <Column title="Language" dataIndex="language" key="language" />
            <Column title="ISBN" dataIndex="isbn" key="isbn" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column title="Stock" dataIndex="stock" key="stock" />
            <Column title="Description" dataIndex="description" key="description" />
            <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <div>
                        <Button type="primary" onClick={() => handleEditModal(record)}>
                            Edit
                        </Button>
                        <Button type="danger" onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default BookTable;
