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
            books: [] // 保存从localhost:8080获取的书籍数据
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8080/books');
            const json = await res.json();
            const books = json.map(data => ({
                id: data[0],
                name: data[1],
                price: data[5],
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
