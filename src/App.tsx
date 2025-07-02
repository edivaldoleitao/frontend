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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
