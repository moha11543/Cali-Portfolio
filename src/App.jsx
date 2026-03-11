import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import PresetsManager from './pages/Admin/PresetsManager';
import OrdersManager from './pages/Admin/OrdersManager';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PublicLayout />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="presets" element={<PresetsManager />} />
          <Route path="orders" element={<OrdersManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
