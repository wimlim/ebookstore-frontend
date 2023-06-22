import axios from 'axios';

const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:8080/books');
        const books = response.data;
        return books;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { fetchBooks };