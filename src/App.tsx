// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// const MainPage = lazy(() => import('./pages/MainPage'));
// import Layout from './layout/Layout';
// import './App.css';
// import PlaceDetailPage from './pages/PlaceDetailPage';
// import CreateReviewPage from './pages/CreateReviewPage';
// import PrepareServicePage from './pages/PrepareServicePage';
// import ExplorePage from './pages/ExplorePage';
// import AllReviewPage from './pages/AllReviewsPage';
// import RoulettePage from './pages/RoulettePage';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BackLayout from './layout/BackLayout';
// import ProtectedRoute from './components/share/ProtectedRoute';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import BackLayout from './layout/BackLayout';
import ProtectedRoute from './components/share/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route path="detail/:id" element={<PlaceDetailPage />} />
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
            </Route>
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
