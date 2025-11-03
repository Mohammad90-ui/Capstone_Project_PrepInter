import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import LoginPage from "./components/Login";
import LandingPage from "./components/LandingPage";

// Lazy load heavy components for code splitting
const Dashboard = lazy(() => import("./components/Dashboard"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const Performance = lazy(() => import("./components/Performance"));
const MockInterviewSetup = lazy(() => import("./components/MockInterviewSetup"));
const InterviewComplete = lazy(() => import("./components/InterviewResult"));
const InterviewPage = lazy(() => import("./components/InterviewPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signIn" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ProfilePage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/performance" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Performance />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/mock-interview-setup" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <MockInterviewSetup />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/result" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <InterviewComplete />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/interview" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <InterviewPage />
              </Suspense>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
