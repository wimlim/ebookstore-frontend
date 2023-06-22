import axios from 'axios';

async function fetchOrders() {
    try {
        const response = await axios.get('http://localhost:8080/orders/all');
        const json = response.data;
        const orders = json.map((timestampObj) => {
            const timestamp = timestampObj.timestamp;
            const items = timestampObj.items.map((item) => ({
                id: item.bookId,
                title: item.title,
                amount: item.num,
                price: item.price,
            }));
            return {
                id: timestampObj.id,
                userId: timestampObj.userId,
                timestamp,
                items,
            };
        });
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { fetchOrders };
