import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import UserService from '../services/UserService';

const { Column } = Table;

class UserManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount = async () => {
        const users = await UserService.fetchUsers();
        this.setState({ users });
    };

    handleBanUser = async (userId) => {
        const success = await UserService.banUser(userId);
        if (success) {
            message.success('User banned successfully');
            const users = await UserService.fetchUsers();
            this.setState({ users });
        } else {
            message.error('Failed to ban user');
        }
    };

    handleUnbanUser = async (userId) => {
        const success = await UserService.unbanUser(userId);
        if (success) {
            message.success('User unbanned successfully');
            const users = await UserService.fetchUsers();
            this.setState({ users });
        } else {
            message.error('Failed to unban user');
        }
    };

    render() {
        const { users } = this.state;
        const adminUsers = users.filter((user) => user.is_admin);
        const normalUsers = users.filter((user) => !user.is_admin);

        return (
            <div>
                <h2>Admin Users</h2>
                <Table dataSource={adminUsers} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Account" dataIndex="account" key="account" />
                </Table>

                <h2>Normal Users</h2>
                <Table dataSource={normalUsers} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Account" dataIndex="account" key="account" />
                    <Column
                        title="isBan"
                        dataIndex="is_banned"
                        key="is_banned"
                        render={(text) => (text === true ? 'Yes' : 'No')}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Button
                                type="danger"
                                onClick={() =>
                                    record.is_banned === true
                                        ? this.handleUnbanUser(record.id)
                                        : this.handleBanUser(record.id)
                                }
                                disabled={record.is_admin}
                            >
                                {record.is_banned === true ? 'Unban User' : 'Ban User'}
                            </Button>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default UserManagementView;
