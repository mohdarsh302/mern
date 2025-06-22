import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Address from "./pages/user/Address";
import AllAddress from "./pages/user/AllAddress";
import UpdateAddress from "./pages/user/UpdateAddress";
import FilterShop from "./pages/FilterShop";
import NewProductDetails from "./pages/NewProductDetails";
import NewCartPage from "./pages/NewCartPage";
import Checkout from "./pages/Checkout";
import VerifyEmail from "./pages/VerifyEmail";
import Blog from "./pages/Blog";
import BelogDetails from "./pages/BelogDetails";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/new-product/:slug" element={<NewProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop" element={<FilterShop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/new-cart" element={<NewCartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/add-address" element={<Address />} />
          <Route path="user/all-addresses" element={<AllAddress />} />
          <Route path="user/get-address/:id" element={<UpdateAddress />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
         <Route path="/verify-email" element={<VerifyEmail />} />
         <Route path="/blog" element={<Blog />} />
         <Route path="/blog-details/:id" element={<BelogDetails />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
