import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ChatInterface from './ChatInterface';
import PointsCalculator from './PointsCalculator';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'chat', 'calculator'
  const [initialMessage, setInitialMessage] = useState('');

  const handleStartChat = (message = '') => {
    setInitialMessage(message);
    setCurrentPage('chat');
  };

  const handleOpenCalculator = () => {
    setCurrentPage('calculator');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setInitialMessage('');
  };

  return (
    <div>
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
    </div>
  );
}

export default App;