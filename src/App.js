import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import CartView from './views/CartView';
import OrderView from './views/OrderView';
import ProfileView from './views/ProfileView';
import BookDetail from './views/BookDetail';
import BookManagementView from './views/BookManagementView';
import OrderManagementView from './views/OrderManagementView';
import UserManagementView from './views/UserManagementView';
import RegisterView from './views/RegisterView';
import ErrorPage from './views/error-page';
import SideBar from './routes/SideBar';
import React, { useState } from 'react';
import HeaderInfo from './components/HeaderInfo';
import { Layout } from 'antd';
import './css/App.css';
import './css/index.css';

const { Header, Content, Sider, Footer } = Layout;

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userauth, setUserauth] = useState(null);

    const handleLogin = (user) => {
        setLoggedIn(true);
        setUserauth(user);
    };

    const handleLogout = async () => {
        console.log("logout");
        setLoggedIn(false);
        setUserauth(null);
        try {
            const response = await fetch("http://localhost:8080/users/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                const elapsedTime = await response.text();
                alert(elapsedTime);
                setLoggedIn(false);
                setUserauth(null);
            } else {
                // 处理错误情况
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred during logout");
        }
    };

    return (
        <Layout className="layout">
            <Header>
                <HeaderInfo />
            </Header>
            <BrowserRouter>
                <div style={{ display: 'flex' }}>
                    {loggedIn && <SideBar user={userauth} />}
                    <Content className="ant-layout-content">
                        <Routes>
                            <Route path="/" element={<LoginView onLogin={handleLogin} />} />
                            <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
                            <Route path="/register" element={<RegisterView />} />
                            {loggedIn && <Route path="/home" element={<HomeView />} />}
                            {loggedIn && <Route path="/cart" element={<CartView user={userauth.token} />} />}
                            {loggedIn && <Route path="/order" element={<OrderView user={userauth.token} />} />}
                            {loggedIn && <Route path="/profile" element={<ProfileView user={userauth.token} onLogout={handleLogout}/>} />}
                            {loggedIn && <Route path="/bookManagement" element={<BookManagementView user={userauth} />} />}
                            {loggedIn && <Route path="/OrderManagement" element={<OrderManagementView user={userauth} />} />}
                            {loggedIn && <Route path="/UserManagement" element={<UserManagementView user={userauth} />} />}
                            {loggedIn && <Route path="/bookDetails" element={<BookDetail user={userauth.token} />} />}
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
