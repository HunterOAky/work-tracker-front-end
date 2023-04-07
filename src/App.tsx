import { Container } from '@mui/material';
import MainPage from './components/MainPage';
import MainHeader from'./components/MainHeader';

export default function App() {

  return (
    <div>
      <MainHeader />
      <Container sx={{ height:"100vh"}}>
        
        <MainPage />
      </Container>
    </div>
    
  );

}