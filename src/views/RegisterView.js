import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const RegisterView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // 校验用户名是否重复
        // 在这里添加校验用户名的逻辑，比如向后端发送请求检查用户名是否已存在

        // 校验两次输入的密码是否相同
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // 校验邮箱格式是否正确
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });
            const data = await response.text();
            // 处理注册成功或失败的逻辑
            if (data === 'success') {
                alert('Registration successful');
                navigate('/login'); // 注册成功后跳转到登录页面
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while registering. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="input-container">
                    <label className="register-label">Username:</label>
                    <input type="text" className="register-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-container">
                    <label className="register-label">Password:</label>
                    <input type="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-container">
                    <label className="register-label">Confirm Password:</label>
                    <input type="password" className="register-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="input-container">
                    <label className="register-label">Email:</label>
                    <input type="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="button-container">
                    <button type="submit" className="register-button">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterView;
