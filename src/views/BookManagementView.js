import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import BookModal from '../components/BookModal';
import fetchBooks from '../services/BookService';
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
            editingBookIsbn: '',
            editingBookPrice: '',
            editingBookStock: '',
            editingBookDescription: '',
            isEditing: false,
            isAdding: false,
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

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
            isAdding: false, // Ensure adding mode is turned off
        });
    };
    fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            const books = response.data;
            this.setState({ books });
        } catch (error) {
            console.log(error);
        }
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
            editingBookIsbn,
            editingBookPrice,
            editingBookStock,
            editingBookDescription,
        } = this.state;

        const updatedBook = {
            id: editingBookId.toString(),
            title: editingBookTitle.toString(),
            author: editingBookAuthor.toString(),
            language: editingBookLanguage.toString(),
            isbn: editingBookIsbn.toString(),
            price: editingBookPrice.toString(),
            stock: editingBookStock.toString(),
            description: editingBookDescription.toString(),
        };

        try {
            await axios.put(`http://localhost:8080/books/${editingBookId}`, JSON.stringify(updatedBook), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await this.fetchBooks();
            this.handleEditCancel();
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/books/${id}`);
            await this.fetchBooks();
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

    showAddModal = () => {
        this.setState({
            isAdding: true,
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

    handleAddSave = async () => {
        const {
            editingBookTitle,
            editingBookAuthor,
            editingBookLanguage,
            editingBookIsbn,
            editingBookPrice,
            editingBookStock,
            editingBookDescription,
        } = this.state;
        if (editingBookDescription == '' || editingBookTitle == '' || editingBookAuthor == '' || editingBookLanguage == '' || editingBookIsbn == '' || editingBookPrice == '' || editingBookStock == '') {
            alert("Please fill all the fields");
            return;
        }

        const newBook = {
            title: editingBookTitle.toString(),
            author: editingBookAuthor.toString(),
            language: editingBookLanguage.toString(),
            isbn: editingBookIsbn.toString(),
            price: editingBookPrice.toString(),
            stock: editingBookStock.toString(),
            description: editingBookDescription.toString(),
        };

        try {
            await axios.post('http://localhost:8080/books', JSON.stringify(newBook), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await this.fetchBooks();
            this.handleAddCancel();
        } catch (error) {
            console.log(error);
        }
    };

    handleAddCancel = () => {
        this.setState({
            isAdding: false,
            editingBookId: null,
            editingBookTitle: '',
            editingBookAuthor: '',
            editingBookLanguage: '',
            editingBookIsbn: '',
            editingBookPrice: '',
            editingBookStock: '',
            editingBookDescription: '',
        });
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
            isAdding,
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
                    <Column title="ISBN" dataIndex="isbn" key="isbn" />
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

                <Button type="primary" onClick={this.showAddModal}>
                    Add
                </Button>

                <BookModal
                    isAdding={isAdding}
                    isEditing={isEditing}
                    editingBookTitle={editingBookTitle}
                    editingBookAuthor={editingBookAuthor}
                    editingBookLanguage={editingBookLanguage}
                    editingBookIsbn={editingBookIsbn}
                    editingBookPrice={editingBookPrice}
                    editingBookStock={editingBookStock}
                    editingBookDescription={editingBookDescription}
                    handleInputChange={this.handleInputChange}
                    handleCancel={isAdding ? this.handleAddCancel : this.handleEditCancel}
                    handleSave={isAdding ? this.handleAddSave : this.handleEditSave}
                />
            </div>
        );
    }
}

export default BookManagementView;
