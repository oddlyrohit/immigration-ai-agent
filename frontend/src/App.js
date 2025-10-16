import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './LandingPage';
import ChatInterface from './ChatInterface';
import PointsCalculator from './PointsCalculator';
import Dashboard from './Dashboard';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'chat', 'calculator', 'dashboard'
  const [initialMessage, setInitialMessage] = useState('');

  const handleStartChat = (message = '') => {
    setInitialMessage(message);
    setCurrentPage('chat');
  };

  const handleOpenCalculator = () => {
    setCurrentPage('calculator');
  };

  const handleOpenDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setInitialMessage('');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div>
        {/* When user is signed in, show dashboard by default */}
        <SignedIn>
          {currentPage === 'chat' && (
            <ChatInterface 
              initialMessage={initialMessage}
              onBack={handleBackToDashboard}
            />
          )}
          {currentPage === 'calculator' && (
            <PointsCalculator onBack={handleBackToDashboard} />
          )}
          {(currentPage === 'landing' || currentPage === 'dashboard') && (
            <Dashboard 
              onStartChat={handleStartChat}
              onOpenCalculator={handleOpenCalculator}
            />
          )}
        </SignedIn>

        {/* When user is NOT signed in, show landing page */}
        <SignedOut>
          {currentPage === 'chat' && (
            <ChatInterface 
              initialMessage={initialMessage}
              onBack={handleBackToLanding}
            />
          )}
          {currentPage === 'calculator' && (
            <PointsCalculator onBack={handleBackToLanding} />
          )}
          {currentPage === 'landing' && (
            <LandingPage 
              onStartChat={handleStartChat}
              onOpenCalculator={handleOpenCalculator}
            />
          )}
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}

export default App;