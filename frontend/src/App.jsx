import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
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
  );
}

export default App;
