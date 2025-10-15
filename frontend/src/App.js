import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ChatInterface from './ChatInterface';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleStartChat = (message = '') => {
    setInitialMessage(message);
    setShowChat(true);
  };

  const handleBackToLanding = () => {
    setShowChat(false);
    setInitialMessage('');
  };

  return (
    <div>
      {showChat ? (
        <ChatInterface 
          initialMessage={initialMessage}
          onBack={handleBackToLanding}
        />
      ) : (
        <LandingPage onStartChat={handleStartChat} />
      )}
    </div>
  );
}

export default App;