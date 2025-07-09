import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/initial";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UpgradePage from "./pages/upgrade";
import EditProfile from "./pages/editProfile";
import PrivateRoute from "./routes/PrivateRoute";
import ProductPage from "./pages/productDetail/ProductDetail";
import HomePage from "./pages/home";
import ListProductsPage from "./pages/listProducts";
import RecoverPasswordPage from "./pages/forgotPassword/recoverPassword/RecoverPassword";
import ChangePasswordPage from "./pages/forgotPassword/changePassword/ChangePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateUser" element={<RegisterPage />} />
          <Route path="/RecoverPassword" element={<RecoverPasswordPage />} />
          <Route path="/ChangePassword/:id" element={<ChangePasswordPage />} />
          <Route
            path="/EditProfile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="/upgrade" element={<UpgradePage />} />          
          <Route path="/produtos" element={<ListProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
