import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import InitialPage from './pages/initial';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DiscoverPage from './pages/discover';
import UpgradePage from './pages/upgrade';
import DealsPage from './pages/deals';
import ListProductsPage from './pages/listProducts';
import HomePage from './pages/home';

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
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/produtos" element={<ListProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
