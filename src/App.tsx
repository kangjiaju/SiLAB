import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HistoryPage from './components/HistoryPage';
import Sidebar from './components/Sidebar';
import DraggablePanel from './components/DraggablePanel';
import PageTransition from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/history" element={<PageTransition><HistoryPage /></PageTransition>} />
        <Route path="/dashboard" element={
          <PageTransition>
            <div className="flex h-screen bg-gray-900">
              <Sidebar />
              <main className="flex-grow overflow-hidden">
                <DraggablePanel />
              </main>
            </div>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;