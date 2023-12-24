import React, { Component } from 'react';
import { Layout } from 'antd';
import SideBar from "../routes/SideBar";
import HeaderInfo from "../components/HeaderInfo";
import SearchBar from "../components/SearchBar";
import MyCarousel from "../components/Carousel";
import BookList from "../components/BookList";
import '../css/home.css'

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            books: []
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount() {
        if (this.state.searchContent === '') {
            try {
                const res = await fetch('http://localhost:8080/books');
                const json = await res.json();
                const books = json.map(data => ({
                    id: data.id,
                    name: data.title,
                    price: data.price,
                }));
                this.setState({ books });
            } catch (err) {
                console.error('Error fetching data:', err);
            }
            return;
        }

        const query = {
            query: `
            query {
                bookByTitle(title: "${this.state.searchContent}") {
                    id
                    title
                    author
                    language
                    isbn
                    price
                    stock
                    description
                }
            }
        `
        };

        try {
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query)
            });
            const json = await res.json();
            const books = json.data.bookByTitle.map(data => ({
                id: data.id,
                name: data.title,
                price: data.price,
            }));
            this.setState({ books });
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    handleSearch = (content) => {
        this.setState({ searchContent: content });
    }

    render() {
        const filteredBooks = this.state.books.filter(book => {
            return book.name.toLowerCase().includes(this.state.searchContent.toLowerCase());
        });

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} />
                <MyCarousel />
                <BookList books={filteredBooks} />
            </div>
        );
    }
}

export default HomeView;
