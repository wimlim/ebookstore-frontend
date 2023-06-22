import axios from 'axios';

class UserService {
    async fetchUsers() {
        try {
            const response = await axios.get('http://localhost:8080/users/all');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async banUser(userId) {
        try {
            await axios.put(`http://localhost:8080/users/ban/${userId}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async unbanUser(userId) {
        try {
            await axios.put(`http://localhost:8080/users/unban/${userId}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default new UserService();
