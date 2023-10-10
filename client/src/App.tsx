import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login';
import ProtectedLayout from './Layout/ProtectedLayout';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;