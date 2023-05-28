import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const { Column } = Table;

class BookManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            editingBookId: null,
            editingBookTitle: '',
            editingBookAuthor: '',
            editingBookLanguage: '',
            editingBookPublished: '',
            editingBookPrice: '',
            editingBookStatus: '',
            editingBookDescription: '',
            isEditing: false,
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            const books = response.data;
            this.setState({ books });
        } catch (error) {
            console.log(error);
        }
    };

    showEditModal = (book) => {
        const {
            id,
            title,
            author,
            language,
            published,
            price,
            status,
            description,
        } = book;
        this.setState({
            editingBookId: id,
            editingBookTitle: title,
            editingBookAuthor: author,
            editingBookLanguage: language,
            editingBookPublished: published,
            editingBookPrice: price,
            editingBookStatus: status,
            editingBookDescription: description,
            isEditing: true,
        });
    };

    handleEditCancel = () => {
        this.setState({
            editingBookId: null,
            editingBookTitle: '',
            editingBookAuthor: '',
            editingBookLanguage: '',
            editingBookPublished: '',
            editingBookPrice: '',
            editingBookStatus: '',
            editingBookDescription: '',
            isEditing: false,
        });
    };

    handleEditSave = async () => {
        const {
            editingBookId,
            editingBookTitle,
            editingBookAuthor,
            editingBookLanguage,
            editingBookPublished,
            editingBookPrice,
            editingBookStatus,
            editingBookDescription,
        } = this.state;

        const updatedBook = {
            id: editingBookId.toString(),
            title: editingBookTitle.toString(),
            author: editingBookAuthor.toString(),
            language: editingBookLanguage.toString(),
            published: editingBookPublished.toString(),
            price: editingBookPrice.toString(),
            status: editingBookStatus.toString(),
            description: editingBookDescription.toString(),
        };

        try {
            await axios.put(`http://localhost:8080/books/${editingBookId}`, JSON.stringify(updatedBook), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.fetchBooks();
            this.handleEditCancel();
        } catch (error) {
            console.log(error);
        }
    };
;

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            books,
            editingBookId,
            editingBookTitle,
            editingBookAuthor,
            editingBookLanguage,
            editingBookPublished,
            editingBookPrice,
            editingBookStatus,
            editingBookDescription,
            isEditing,
        } = this.state;

        return (
            <div>
                <Table dataSource={books} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Title" dataIndex="title" key="title" />
                    <Column title="Author" dataIndex="author" key="author" />
                    <Column title="Language" dataIndex="language" key="language" />
                    <Column title="Published" dataIndex="published" key="published" />
                    <Column title="Price" dataIndex="price" key="price" />
                    <Column title="Status" dataIndex="status" key="status" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Button type="primary" onClick={() => this.showEditModal(record)}>
                                Edit
                            </Button>
                        )}
                    />
                </Table>

                <Modal
                    title="Edit Book"
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
                        <Form.Item label="Title">
                            <Input
                                name="editingBookTitle"
                                value={editingBookTitle}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Author">
                            <Input
                                name="editingBookAuthor"
                                value={editingBookAuthor}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Language">
                            <Input
                                name="editingBookLanguage"
                                value={editingBookLanguage}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Published">
                            <Input
                                name="editingBookPublished"
                                value={editingBookPublished}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input
                                name="editingBookPrice"
                                value={editingBookPrice}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Input
                                name="editingBookStatus"
                                value={editingBookStatus}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input.TextArea
                                name="editingBookDescription"
                                value={editingBookDescription}
                                onChange={this.handleInputChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default BookManagementView;
