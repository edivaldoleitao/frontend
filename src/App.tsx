import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/initial";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DiscoverPage from "./pages/discover";
import UpgradePage from "./pages/upgrade";
import DealsPage from "./pages/deals";
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
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateUser" element={<RegisterPage />} />
          <Route
            path="/EditProfile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="/descobrir" element={<DiscoverPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/ofertas" element={<DealsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/produtos" element={<ListProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
