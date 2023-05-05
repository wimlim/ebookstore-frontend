import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import CartView from "./views/CartView";
import OrderView from "./views/OrderView";
import ProfileView from "./views/ProfileView";
import BookDetail from "./views/BookDetail";
import ErrorPage from "./views/error-page";
import SideBar from "./routes/SideBar";
import React, { useState } from "react";
import HeaderInfo from "./components/HeaderInfo";
import { Layout, theme } from 'antd';
import "./css/index.css";

const { Header, Content, Sider, Footer } = Layout;


const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (user) => {
        setLoggedIn(true);
        setUser(user);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <Layout className="layout">
            <Header>
                <HeaderInfo />
            </Header>
            <BrowserRouter>
                <div style={{display:'flex'}}>
                    {loggedIn && <SideBar user={user} />}
                    <Content className="ant-layout-content">
                        <Routes>
                            <Route path="/" element={<LoginView onLogin={handleLogin} />} />
                            {loggedIn && <Route path="/home" element={<HomeView user={user} />} />}
                            {loggedIn && <Route path="/cart" element={<CartView user={user} />} />}
                            {loggedIn && <Route path="/order" element={<OrderView user={user} />} />}
                            {loggedIn && <Route path="/profile" element={<ProfileView user={user} />} />}
                            {loggedIn && <Route path="/bookDetails" element={<BookDetail user={user} />} />}
                            {loggedIn && <Route path="*" element={<ErrorPage />} />}
                        </Routes>
                    </Content>
                </div>
            </BrowserRouter>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default App;
