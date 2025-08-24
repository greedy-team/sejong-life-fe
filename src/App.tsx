import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './layout/Layout';
import './App.css';
import PlaceDetailPage from './pages/PlaceDetailPage';
import DiscoverPage from './pages/DiscoverPage';
import CreateReviewPage from './pages/CreateReviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="detail/:id" element={<PlaceDetailPage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="write-review/:id" element={<CreateReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
