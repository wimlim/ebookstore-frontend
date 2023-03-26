import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import CartView from "./views/CartView";
import OrderView from "./views/OrderView";
import ProfileView from "./views/ProfileView";
import BookDetail from "./views/BookDetail";
import ErrorPage from "./views/error-page";
import SideBar from "./routes/SideBar";
import React from "react";
import HeaderInfo from "./components/HeaderInfo";
import { Layout, theme } from 'antd';
import "./css/index.css";

const { Header, Content, Sider, Footer } = Layout;

const data = [["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150", "1", "Out of Stock", "asdf"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140", "2", "On sale", "asdf"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107", "3", "Out of Stock", "asdf"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100", "4", "On sale", "asdf"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100", "5", "On sale", "asdf"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100", "6", "On sale", "asdf"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100", "7", "On sale", "asdf"],
    ["Spore", "J. K. Alpha", "English", "1887", "100", "8", "On sale", "awsd"],
];

const books = data.map((book) => {
    return {
        name: book[0],
        author: book[1],
        language: book[2],
        year: book[3],
        price: book[4],
        id: book[5],
        status: book[6],
        description: book[7],
    };
});

const App = () => {
    return (
        <Layout className="layout">
            <Header>
                <HeaderInfo />
            </Header>
            <BrowserRouter>
                <div style={{ display: 'flex' }}>
                    <SideBar />
                    <Content className={"ant-layout-content"}>
                        <Routes>
                            <Route path="/" element={<HomeView books = {books}/>} />
                            <Route path="/cart" element={<CartView books = {books}/>} />
                            <Route path="/order" element={<OrderView />}/>
                            <Route path="/profile" element={<ProfileView />}/>
                            <Route path="/bookDetails" element={<BookDetail books = {books}/>}/>
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Content>
                </div>
            </BrowserRouter>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default App;
