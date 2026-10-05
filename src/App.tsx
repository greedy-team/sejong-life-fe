import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './layout/Layout';
import ProtectedRoute from './components/share/ProtectedRoute';
import Spinner from './components/share/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { SESSION_EXPIRED_KEY } from './api/api';
import 'react-toastify/dist/ReactToastify.css';
import MyPage from './pages/MyPage';
import MyReviewPage from './pages/MyReviewPage';
import AdminPlacesPage from './pages/AdminPlacesPage';
import AdminPage from './pages/AdminPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import AdminProtectedRoute from './features/admin/components/AdminProtectedRoute';
import MyPlacesPage from './pages/MyPlacesPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import KakaoMapPage from './pages/KakaoMapPage';
import ScrollToTop from './components/share/ScrollToTop';

// lazy import
const MainPage = lazy(() => import('./pages/MainPage'));
const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const CreateReviewPage = lazy(() => import('./pages/CreateReviewPage'));
const PrepareServicePage = lazy(() => import('./pages/PrepareServicePage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const AllReviewPage = lazy(() => import('./pages/AllReviewsPage'));
const RoulettePage = lazy(() => import('./pages/RoulettePage'));

function App() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_EXPIRED_KEY)) {
      sessionStorage.removeItem(SESSION_EXPIRED_KEY);
      toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="preparingService" element={<PrepareServicePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="roulette" element={<RoulettePage />} />
              <Route path="detail/:id" element={<PlaceDetailPage />} />
              <Route
                path="mypage"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/map" element={<KakaoMapPage />} />
            </Route>

            <Route path="detail/:id/reviews" element={<AllReviewPage />} />
            <Route
              path="write-review/:id"
              element={
                <ProtectedRoute>
                  <CreateReviewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin/places"
              element={
                <ProtectedRoute>
                  <AdminProtectedRoute>
                    <AdminPlacesPage />
                  </AdminProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/reviews"
              element={
                <ProtectedRoute>
                  <AdminProtectedRoute>
                    <AdminReviewsPage />
                  </AdminProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="mypage/myReviews"
              element={
                <ProtectedRoute>
                  <MyReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="mypage/myPlaces"
              element={
                <ProtectedRoute>
                  <MyPlacesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminProtectedRoute>
                    <AdminPage />
                  </AdminProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route path="/privacy" element={<PrivacyPolicy />} />
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
