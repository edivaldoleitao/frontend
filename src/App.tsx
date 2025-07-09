import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/initial";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UpgradePage from "./pages/upgrade";
import EditProfile from "./pages/editProfile";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./pages/home";
import ListProductsPage from "./pages/listProducts";
import ConfirmAccount from "./pages/confirmAccount/confirmAccount";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateUser" element={<RegisterPage />} />
          <Route path="/ConfirmAccount/:id" element={<ConfirmAccount />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
