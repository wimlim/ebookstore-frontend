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
                body: JSON.stringify({ account: username, password }),
                credentials: 'include',
            });
            const data = await response.text();
            if (data == 'banned') {
                alert('You have been banned.');
            } else if (data !== '') {
                const [token, isAdmin] = data.split(',');
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

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="box-container">
                <h1 className="login-title">Login</h1>
                <form>
                    <div className="input-container">
                        <label className="login-label">Username:</label>
                        <input
                            type="text"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-label">Password:</label>
                        <input
                            type="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button type="button" className="login-button" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="button-container">
                        <button type="button" className="register-button" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
