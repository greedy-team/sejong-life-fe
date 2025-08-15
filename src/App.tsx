import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './layout/Layout';
import './App.css';
import PlaceDetailPage from './pages/PlaceDetailPage';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<MainPage />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <PlaceDetailPage></PlaceDetailPage>
  );
}

export default App;
