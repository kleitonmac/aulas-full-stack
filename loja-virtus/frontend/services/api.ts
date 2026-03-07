import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
}

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (item) => api.post('/cart/add', item),
  updateQuantity: (productId, quantity) =>
    api.put(`/cart/update/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete('/cart/clear'),
}

export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders/create', orderData),
  getUserOrders: () => api.get('/orders/my-orders'),
  getAllOrders: () => api.get('/orders'),
  updateOrderStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/status`, { status }),
}

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
}

export default api
