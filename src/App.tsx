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
import HomePage from "./pages/home";
import ListProductsPage from "./pages/listProducts";
import RecoverPasswordPage from "./pages/recoverPassword";
import UpdatePasswordPage from "./pages/updatePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InitialPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateUser" element={<RegisterPage />} />
          
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
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/produtos" element={<ListProductsPage />} />
          <Route path="/recover-password" element={<RecoverPasswordPage />}/>
          <Route path="/update-password/:userId" element={<UpdatePasswordPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
