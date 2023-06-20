export function filterOrders(orders, selectedRange) {
    if (selectedRange && selectedRange.length === 2) {
        const startDate = new Date(selectedRange[0]);
        const endDate = new Date(selectedRange[1]);

        const startDateFormatted = startDate.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const endDateFormatted = endDate.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const filteredOrders = orders.filter((order) => {
            const timestamp = new Date(
                order.timestamp.replace(/[年月]/g, "/").replace("日", "")
            );
            const timestampFormatted = timestamp.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            return (
                timestampFormatted >= startDateFormatted &&
                timestampFormatted <= endDateFormatted
            );
        });
        return filteredOrders;
    }
    return orders;
}
