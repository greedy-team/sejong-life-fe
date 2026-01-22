import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import BackLayout from './layout/BackLayout';
import ProtectedRoute from './components/share/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResultPage from './pages/SearchResultPage';
import AdminPlacesPage from './pages/AdminPlacesPage';
import AdminPage from './pages/AdminPage';
import AdminReviewsPage from './pages/AdminReviewsPage';

// lazy import
const MainPage = lazy(() => import('./pages/MainPage'));
const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const CreateReviewPage = lazy(() => import('./pages/CreateReviewPage'));
const PrepareServicePage = lazy(() => import('./pages/PrepareServicePage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const AllReviewPage = lazy(() => import('./pages/AllReviewsPage'));
const RoulettePage = lazy(() => import('./pages/RoulettePage'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="preparingService" element={<PrepareServicePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="roulette" element={<RoulettePage />} />
            </Route>
            <Route path="/" element={<BackLayout />}>
              <Route path="detail/:id/reviews" element={<AllReviewPage />} />
              <Route
                path="write-review/:id"
                element={
                  <ProtectedRoute>
                    <CreateReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route path="detail/:id" element={<PlaceDetailPage />} />
              <Route path="search" element={<SearchResultPage />} />
              <Route path="admin/places" element={<AdminPlacesPage />} />
              <Route path="admin/reviews" element={<AdminReviewsPage />} />
            </Route>

            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
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
