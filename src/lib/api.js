import axios from "axios";
import Cookies from "js-cookie";

// Base URL of your Express backend, set in .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Attach the logged-in user's token to every request automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ---- Auth ----
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

// ---- Menu / Products ----
// NOTE: adjust the endpoint below if your backend route differs (e.g. /food, /menu)
export const getMenuItems = () => api.get("/products");
export const getMenuItem = (id) => api.get(`/products/${id}`);

// ---- Cart ----
export const addToCart = (productId, quantity = 1) =>
  api.post("/cart/add", { productId, quantity });
export const getCart = () => api.get("/cart");
export const removeFromCart = (productId) =>
  api.delete(`/cart/remove/${productId}`);

// ---- Orders / Checkout ----
export const checkout = (data) => api.post("/orders/checkout", data);
export const verifyPayment = (sessionId) =>
  api.get(`/orders/verify-payment?session_id=${sessionId}`);
export const getOrders = () => api.get("/orders");

// ---- Images ----
// Product images are saved on the backend as relative paths like
// "/uploads/xyz.jpg". The browser needs the full backend URL to load them,
// since the frontend and backend run on different ports.
export const API_BASE = API_URL.replace(/\/api\/?$/, "");
export const getImageUrl = (path) =>
  path ? (path.startsWith("http") ? path : `${API_BASE}${path}`) : null;
