import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Intro from '@/components/Intro';
import Landing from '@/components/Landing';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';

const INTRO_REVEAL_AT = 2700;

export default function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLanding(true), INTRO_REVEAL_AT);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showLanding && <Landing />}
                {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
              </>
            }
          />
          <Route path="/auth" element={<AuthScreen />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
