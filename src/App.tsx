import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { InitialPage } from './pages/initial/InitialPage'
import AuthLayout from './components/layouts/AuthLayout/AuthLayout'
import "./index.css"


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InitialPage />}/>
          <Route path="/login" element={<AuthLayout setLogin={true} />}/>
          <Route path="/CreateUser" element={<AuthLayout setLogin={false}/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App