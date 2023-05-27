import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Book = ({ info }) => {
    const navigate = useNavigate();

    const showBookDetails = () => {
        navigate(`/bookDetails?id=${info.id}`);
    };


    return (
        <Card
            hoverable
            style={{ width: 181 }}
            cover={<img alt="Book Cover" src={`http://localhost:8080/books/image/${info.id}`} className={"bookImg"} />}
            onClick={showBookDetails}
        >
            <Meta title={info.name} description={'¥' + info.price} />
        </Card>
    );
};

export default Book