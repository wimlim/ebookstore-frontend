export async function fetchOrders() {
    try {
        const res = await fetch(`http://localhost:8080/orders/all`);
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const json = await res.json();
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
        console.log("Error fetching data:", error);
        throw new Error("Failed to fetch data. Please try again later.");
    }
}
