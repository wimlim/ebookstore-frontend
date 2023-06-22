import React, { Component } from 'react';
import { Button } from 'antd';
import '../css/home.css'
import SearchBar from "../components/SearchBar";
import ShoppingList from "../components/ShoppingList";


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
        this.handlePurchase = this.handlePurchase.bind(this);
    }

    handleSearch = (content) => {
        this.setState({ searchContent: content });
    }

    handleDelete = async (record) => {
        const response = await fetch(`http://localhost:8080/lists/${this.props.user}?bookId=${record.cover}`, {
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
        const response = await fetch(`http://localhost:8080/lists/${this.props.user}?bookId=${record.cover}&amount=${record.amount}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
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
        try {
            const response = await fetch(`http://localhost:8080/lists/${this.props.user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                alert("Purchase successfully!");
            } else {
                throw new Error("Failed to create order!");
            }
            this.setState({ lists: [] });
        } catch (error) {
            console.error(error);
            alert("Error occurred while purchasing the items!");
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:8080/lists/${this.props.user}`);
            const json = await res.json();
            const books = json.map(data => ({
                cover: data.id,
                title: data.title,
                amount: data.amount,
                price: data.price
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
