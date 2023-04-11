import { Container } from '@mui/material';
import MainPage from './components/MainPage';
import MainHeader from'./components/MainHeader';
import Auth from './components/Auth';
import { Routes, Route } from 'react-router-dom';


export default function App() {

  return (
    <div>
      <MainHeader />
      <Container sx={{ height:"100vh"}}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </Container>
    </div>
    
  );

}