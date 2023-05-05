import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

export const Book = ({ info }) => {
    const navigate = useNavigate();

    const showBookDetails = () => {
        navigate(`/bookDetails?id=${info.id}`);
    };

    return (
        <Card
            hoverable
            style={{ width: 181 }}
            cover={<img alt="Book Cover" src={require("../assets/books/" + info.id + ".jpg")} className={"bookImg"} />}
            onClick={showBookDetails}
        >
            <Meta title={info.name} description={'¥' + info.price} />
        </Card>
    );
};

export default Book;
