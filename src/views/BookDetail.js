import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/detail.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const BookDetail = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(location.search).get('id');
    const [book, setBook] = useState(null);

    const handleGoBack = () => {
        navigate('/home');
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`http://localhost:8080/lists/${props.user}?bookId=${id}&amount=${1}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        } catch (error) {
            console.error(error);
            alert("Failed to add to cart!");
        }
    };

    const handlePurchase = async  () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/${props.user}?book_id=${id}`, {
                method: 'PUT',
               headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                alert("Purchaes successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to purchase!");
        }
    }

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const data = [
        {
            key: '1',
            field: 'Title',
            value: book?.name,
        },
        {
            key: '2',
            field: 'Author',
            value: book?.author,
        },
        {
            key: '3',
            field: 'Language',
            value: book?.language,
        },
        {
            key: '4',
            field: 'Year',
            value: book?.year,
        },
        {
            key: '5',
            field: 'Price',
            value: `¥${book?.price}`,
        },
        {
            key: '6',
            field: 'Status',
            value: book?.status,
        },
    ];

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`http://localhost:8080/books/${id}`);
            const data = await response.json();
            const bookData = data[0];
            const book = {
                id: bookData[0],
                name: bookData[1],
                author: bookData[2],
                language: bookData[3],
                year: bookData[4],
                price: bookData[5],
                status: bookData[6],
                description: bookData[7]
            };
            setBook(book);
        }
        fetchBook();
    }, [id]);

    return (
        <Content className="book-detail">
            <div className="back-button-container">
                <ArrowLeftOutlined onClick={handleGoBack}/>
                <Text onClick={handleGoBack}>Back to Home</Text>
            </div>
            {book && (
                <div className="book-details-container">
                    <div className="book-image">
                        <img src={require("../assets/books/" + book.id + ".jpg")} alt="Book Cover" style={{ width: 200, height: 300 }} />
                    </div>
                    <div className="descriptions">
                        <Title className="title" level={2}>
                            {book.name}
                        </Title>
                        <Table columns={columns} dataSource={data} pagination={false} showHeader={false}/>
                    </div>
                </div>
            )}
            {book && (
                <div className="description">
                    <Title level={4}>Description</Title>
                    <Text>{book.description}</Text>
                </div>
            )}
            <div className="buttons-container">
                <Button size="large" onClick={handlePurchase}>Buy Now</Button>
            <Button size="large" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
        </Content>
    );
}

export default BookDetail;
