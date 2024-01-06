import React, { Component } from 'react';
import { Button } from 'antd';
import '../css/home.css'
import SearchBar from "../components/SearchBar";
import ShoppingList from "../components/ShoppingList";
import $ from 'jquery';

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            lists: [],
            totalAmount: 0
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
    }

    fetchTotalAmount = async () => {
        try {
            const response = await fetch(`http://localhost:8080/lists/amount/${this.props.user}`);
            if (response.ok) {
                const totalAmount = await response.json(); // 直接获取整数值
                this.setState({ totalAmount });
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error fetching total amount:', error);
        }
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
            this.componentDidMount();
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
            this.componentDidMount();
        }
    }
    handlePurchase = async() => {
        try {
            // 建立WebSocket连接
            const userId = $("#name").val();
            const socketUrl = `ws://localhost:8080/transfer/${this.props.user}`;

            const socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                // 发送购买请求到后端
                const response = fetch(`http://localhost:8080/lists/${this.props.user}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                // 在WebSocket连接打开后，等待消息
                socket.onmessage = (event) => {
                    // 处理从WebSocket服务器接收到的消息
                    const serverMsg = "收到服务端信息：" + event.data;
                    // 在这里处理收到的消息，例如将消息显示在UI上
                    alert("购买成功！");
                    this.componentDidMount();
                    // 关闭WebSocket连接
                    socket.close();
                };
            };
            socket.onclose = () => {
                console.log("WebSocket连接已关闭");
            };

            socket.onerror = () => {
                console.log("WebSocket发生了错误");
            };

        } catch (error) {
            console.error(error);
            alert("购买商品时出现错误！");
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:8080/lists/${this.props.user}`);
            await this.fetchTotalAmount();
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
                price:  list.price,
            };
        });

        return (
            <div>
                <SearchBar handleSearch={this.handleSearch} />
                <ShoppingList lists={tmp_lists} handleDelete={this.handleDelete} handleAmountChange={this.handleAmountChange} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={this.handlePurchase}> Purchase</Button>
                    <div style={{ background: '#f0f0f0', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>Total Amount:</span> {this.state.totalAmount}
                    </div>
                </div>
            </div>
        );
    }
}

export default CartView;
