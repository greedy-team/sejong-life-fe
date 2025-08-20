import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './layout/Layout';
import './App.css';
import PlaceDetailPage from './pages/PlaceDetailPage';
import DiscoverPage from './pages/DiscoverPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="detail" element={<PlaceDetailPage />} />
          <Route path="discover" element={<DiscoverPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
