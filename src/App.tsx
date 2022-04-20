import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login.page';
import SignupPage from './pages/Signup.page';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
