import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './layout/Layout';
import './App.css';
import PlaceDetailPage from './pages/PlaceDetailPage';
import CreateReviewPage from './pages/CreateReviewPage';
import PrepareServicePage from './pages/PrepareServicePage';
import ExplorePage from './pages/ExplorePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="detail/:id" element={<PlaceDetailPage />} />
            <Route
              path="write-review/:placeId"
              element={<CreateReviewPage />}
            />
            <Route path="preparingService" element={<PrepareServicePage />} />
            <Route path="explore" element={<ExplorePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={800}
        closeOnClick
        hideProgressBar
      />
    </>
  );
}

export default App;
