const API_URL = 'http://localhost:5000/api';

// Fungsi untuk menyimpan token ke localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Fungsi untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Fungsi untuk menghapus token dari localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Fungsi untuk mengecek apakah user sudah login
const isAuthenticated = () => {
  return !!getToken();
};

// Fungsi untuk mendapatkan header Authorization
const getAuthHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}; 