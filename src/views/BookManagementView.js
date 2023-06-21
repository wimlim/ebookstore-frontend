import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

import SearchBar from '../components/SearchBar';

const { Column } = Table;

class BookManagementView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchedBooks: [],
            editingBookId: null,
            editingBookTitle: '',
            editingBookAuthor: '',
            editingBookLanguage: '',
            editingBookIsbn: '', // Updated: Changed from "ISBN"
            editingBookPrice: '',
            editingBookStock: '',
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
            isbn,
            price,
            stock,
            description,
        } = book;
        this.setState({
            editingBookId: id,
            editingBookTitle: title,
            editingBookAuthor: author,
            editingBookLanguage: language,
            editingBookIsbn: isbn,
            editingBookPrice: price,
            editingBookStock: stock,
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
            editingBookIsbn: '',
            editingBookPrice: '',
            editingBookStock: '',
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
            editingBookIsbn, // Updated: Changed from "ISBN"
            editingBookPrice,
            editingBookStock,
            editingBookDescription,
        } = this.state;

        const updatedBook = {
            id: editingBookId.toString(),
            title: editingBookTitle.toString(),
            author: editingBookAuthor.toString(),
            language: editingBookLanguage.toString(),
            isbn: editingBookIsbn.toString(), // Updated: Changed from "ISBN"
            price: editingBookPrice.toString(),
            stock: editingBookStock.toString(), // Updated: Changed from "status"
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

    handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/books/${id}`);
            this.fetchBooks();
        } catch (error) {
            console.log(error);
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSearch = (value) => {
        const { books } = this.state;
        const searchedBooks = books.filter((book) => book.title.includes(value));
        this.setState({ searchedBooks });
    };

    render() {
        const {
            books,
            searchedBooks,
            editingBookId,
            editingBookTitle,
            editingBookAuthor,
            editingBookLanguage,
            editingBookIsbn,
            editingBookPrice,
            editingBookStock,
            editingBookDescription,
            isEditing,
        } = this.state;

        const dataSource = searchedBooks.length > 0 ? searchedBooks : books;

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} />

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
                    <Column title="ISBN" dataIndex="isbn" key="isbn" /> {/* Updated: Changed from "ISBN" */}
                    <Column title="Price" dataIndex="price" key="price" />
                    <Column title="Stock" dataIndex="stock" key="stock" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <div>
                                <Button type="primary" onClick={() => this.showEditModal(record)}>
                                    Edit
                                </Button>
                                <Button type="danger" onClick={() => this.handleDelete(record.id)}>
                                    Delete
                                </Button>
                            </div>
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
                        <Form.Item label="ISBN">
                            <Input
                                name="editingBookIsbn"
                                value={editingBookIsbn}
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
                        <Form.Item label="Stock">
                            <Input
                                name="editingBookStock"
                                value={editingBookStock}
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
