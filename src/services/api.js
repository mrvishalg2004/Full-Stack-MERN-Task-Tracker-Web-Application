import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Request interceptor to potentially add tokens later
api.interceptors.request.use((config) => {
  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can show global toast errors here
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  getAll: (params) => api.get('/tasks', { params }),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;
