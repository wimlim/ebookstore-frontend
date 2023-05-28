import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const LoginView = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account: username, password })
            });
            const data = await response.text();
            if (data !== '') {
                const [token, isAdmin] = data.split(",");
                const tokenAndAdmin = { token, isAdmin };
                onLogin(tokenAndAdmin);
                navigate('/home');
            } else {
                alert('Incorrect username or password');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while logging in. Please try again later.');
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form>
                <label>
                    <span className="login-label">Username:</span>
                    <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    <span className="login-label">Password:</span>
                    <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginView;
