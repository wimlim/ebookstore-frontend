import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import SideBar from "../routes/SideBar";
import HeaderInfo from "../components/HeaderInfo";
import '../css/home.css'
import SearchBar from "../components/SearchBar";
import ShoppingList from "../components/ShoppingList";

const { Header, Content, Sider, Footer } = Layout;

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            lists: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    handleSearch = (content) => {
        this.setState({ searchContent: content });
    }

    handleDelete = async (record) => {
        const response = await fetch(`http://localhost:8080/lists/${record.cover}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            const newList = this.state.lists.filter(item => item.title !== record.title);
            this.setState({ lists: newList });
        }
    }

    handleAmountChange = async (record) => {
        const response = await fetch(`http://localhost:8080/lists/${record.cover}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });
        if(response.ok){
            const newList = this.state.lists.map(item => {
                if (item.cover === record.cover) {
                    return {
                        ...item,
                        amount: record.amount
                    }
                }
                return item;
            });
            this.setState({ lists: newList });
        }
    }

    handlePurchase = async () => {
        const response = await fetch('http://localhost:8080/lists/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.lists)
        });

        try {
            const responseData = await response.text();
            if (response.ok) {
                console.log('Order confirmed!');
                const newList = [];
                this.setState({ lists: newList });
                window.alert(JSON.stringify(responseData));
            } else {
                console.error(`HTTP error! status: ${response.status}, message: ${responseData}`);
                window.alert('Failed to purchase the list');
            }
        } catch(error) {
            console.error(error);
            window.alert('Failed to get response data');
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8080/lists');
            const json = await res.json();
            const books = json.map(data => ({
                cover: data[0],
                title: data[1],
                amount: data[2],
                price: data[3]
            }));
            this.setState({ lists: books });
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    render() {
        const filteredLists = this.state.lists.filter(item => {
            return item.title.toLowerCase().includes(this.state.searchContent.toLowerCase());
        });

        const tmp_lists = filteredLists.map(list => {
            return {
                cover: list.cover,
                title: list.title,
                amount: list.amount,
                price: list.amount * list.price,
            };
        });

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} />
                <ShoppingList lists={tmp_lists} handleDelete={this.handleDelete} handleAmountChange={this.handleAmountChange} />
                <Button onClick={this.handlePurchase}> Purchase</Button>
            </div>
        );
    }
}

export default CartView;
