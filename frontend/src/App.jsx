import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OTPVerify from './pages/OTPVerify';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Receipts from './pages/Receipts';
import DeliveryOrders from './pages/DeliveryOrders';
import InternalTransfers from './pages/InternalTransfers';
import StockAdjustments from './pages/StockAdjustments';
import MoveHistory from './pages/MoveHistory';
import Warehouses from './pages/Warehouses';
import Settings from './pages/Settings';
import './App.css';

// ⚠️ Replace with your actual Google OAuth Client ID from console.cloud.google.com
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<OTPVerify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/delivery-orders" element={<DeliveryOrders />} />
          <Route path="/internal-transfers" element={<InternalTransfers />} />
          <Route path="/stock-adjustments" element={<StockAdjustments />} />
          <Route path="/move-history" element={<MoveHistory />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
