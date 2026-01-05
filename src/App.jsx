import React from 'react';
import { Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DynamicProductPage from './components/DynamicProductPage';
import HomePage from './pages/HomePage';
import WhoWeAre from "./pages/About/WhoWeAre";
import MeetOurTeam from "./pages/About/MeetOurTeam";
import Product from './pages/Product';
import ProjectOne from './pages/Project/ProjectOne';
import ProjectTwo from './pages/Project/ProjectTwo';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Client from './pages/Client';

// Admin Panel Imports
import { 
  AdminLayout, 
  Dashboard, 
  Messages, 
  Products, 
  AddProduct,
  Inquiries,
  Analytics, 
  Settings, 
  AdminLogin 
} from './admin';
function App() {
  return (
    <Routes>
      {/* Admin Login Route - Public */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Public Routes - Inside AppLayout */}
      <Route path="/*" element={
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/meet-our-team" element={<MeetOurTeam />} />
            <Route path='/products' element={<WhoWeAre /> } />
            <Route path="/:category" element={<DynamicProductPage />} />
            <Route path="/project-one" element={<ProjectOne />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path="/clients" element={<Client />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AppLayout>
      } />
    </Routes>
  )
}




export default App;
