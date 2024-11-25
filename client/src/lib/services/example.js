// authService.js
import axios from 'axios';

const API_URL = 'https://api.findacofounder.online/auth';

export async function registerUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, {email, password});
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token); // Store the JWT token
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        }, {withCredentials: true});
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token); // Store the JWT token
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}