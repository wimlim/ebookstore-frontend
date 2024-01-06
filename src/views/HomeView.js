import React, { Component } from 'react';
import SearchBar from "../components/SearchBar";
import MyCarousel from "../components/Carousel";
import BookList from "../components/BookList";
import '../css/home.css'

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'title',
            searchContent: '',
            books: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
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

        if (this.state.searchType == 'type') {
            try {
                const res = await fetch('http://localhost:8080/books/type/' + this.state.searchContent);
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
        this.setState({ searchContent: content }, () => {
            this.componentDidMount();
        });
    }
    handleSearchTypeChange = (event) => {
        this.setState({ searchType: event.target.value }, () => {
            this.componentDidMount();
        });
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <SearchBar handleSearch={this.handleSearch} />
                    <select
                        onChange={this.handleSearchTypeChange}
                        value={this.state.searchType}
                        style={{ marginLeft: '1rem' }}
                    >
                        <option value="title">按标题搜索</option>
                        <option value="type">按类型搜索</option>
                    </select>
                </div>
                <MyCarousel />
                <BookList books={this.state.books} />
            </div>
        );
    }
}

export default HomeView;
