import React from 'react';
import { Modal, Table } from 'antd';

const { Column } = Table;

const StatisticsModal = ({ showModal, handleCloseModal, statistics, userConsumption }) => {
    return (
        <Modal title="Statistics" visible={showModal} onCancel={handleCloseModal} footer={null}>
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
                    dataSource={Object.entries(userConsumption).sort((a, b) => b[1] - a[1])}
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
    );
};

export default StatisticsModal;
