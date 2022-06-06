import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './views/Home';
import Draw from './views/Draw';
import Winners from './views/Winners';
import PersistLogin from './components/Auth/PersistLogin';
import Login from './views/Login';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <div className="h-100vh">
      <UserProvider>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>
          <Route element={<PersistLogin />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/draw" element={<Draw />} />
              <Route path="/winners" element={<Winners />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate from="*" to="/" />} />
        </Routes>
      </UserProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
