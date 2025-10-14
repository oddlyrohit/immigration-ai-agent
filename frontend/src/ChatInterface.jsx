import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ChatInterface = ({ initialMessage = '', onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (msg = inputMessage) => {
    if (!msg.trim()) return;

    const userMessage = {
      role: 'user',
      content: msg,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: msg,
        session_id: sessionId,
        conversation_history: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        sources: response.data.sources || [],
        warning: response.data.warning,
        requiresHuman: response.data.requires_human_agent
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button style={styles.backBtn} onClick={onBack}>← Back</button>
          <div style={styles.headerTitle}>
            <div style={styles.logoIcon}>🇦🇺</div>
            <div>
              <div style={styles.title}>Immigration AI</div>
              <div style={styles.subtitle}>Ask me anything about Australian visas</div>
            </div>
          </div>
          <div style={{width: '80px'}}></div>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
        {messages.length === 0 && (
          <div style={styles.welcome}>
            <div style={styles.welcomeIcon}>🤖</div>
            <h2 style={styles.welcomeTitle}>Welcome! How can I help you today?</h2>
            <p style={styles.welcomeText}>Ask me about Australian visas, eligibility, or immigration processes.</p>
            <div style={styles.exampleQuestions}>
              <strong>Try asking:</strong>
              {['What visa options do I have?', 'Tell me about the 189 visa', 'Student visa requirements'].map((q, i) => (
                <button key={i} style={styles.exampleBtn} onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={msg.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper}>
            <div style={styles.messageAvatar}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
              <div style={styles.messageText}>{msg.content}</div>
              
              {msg.warning && (
                <div style={styles.warning}>⚠️ {msg.warning}</div>
              )}
              
              {msg.requiresHuman && (
                <div style={styles.humanBadge}>👨‍💼 Licensed Agent Required</div>
              )}
              
              {msg.sources && msg.sources.length > 0 && (
                <div style={styles.sources}>
                  <strong>📚 Sources:</strong>
                  {msg.sources.map((s, j) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>
                      {s.url}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={styles.assistantMessageWrapper}>
            <div style={styles.messageAvatar}>🤖</div>
            <div style={styles.assistantMessage}>
              <div style={styles.typing}>
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            style={styles.input}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about Australian immigration..."
            disabled={isLoading}
          />
          <button
            style={styles.sendBtn}
            onClick={() => sendMessage()}
            disabled={isLoading || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
        <div style={styles.inputDisclaimer}>
          AI-powered information • Not legal advice • Consult MARA agent for applications
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f7fa' },
  header: { background: 'white', borderBottom: '1px solid #e5e5e5' },
  headerContent: { maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { background: 'none', border: 'none', color: '#002664', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  headerTitle: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '40px', height: '40px', background: '#002664', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  title: { fontSize: '16px', fontWeight: '700' },
  subtitle: { fontSize: '12px', color: '#666' },
  messagesContainer: { flex: 1, overflow: 'auto', padding: '32px 24px', maxWidth: '900px', margin: '0 auto', width: '100%' },
  welcome: { textAlign: 'center', padding: '60px 20px' },
  welcomeIcon: { fontSize: '64px', marginBottom: '16px' },
  welcomeTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '12px', color: '#1a1a1a' },
  welcomeText: { fontSize: '16px', color: '#666', marginBottom: '32px' },
  exampleQuestions: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' },
  exampleBtn: { background: 'white', border: '1px solid #e5e5e5', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', maxWidth: '400px' },
  userMessageWrapper: { display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'flex-end' },
  assistantMessageWrapper: { display: 'flex', gap: '12px', marginBottom: '24px' },
  messageAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: '#002664', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 },
  userMessage: { background: '#002664', color: 'white', padding: '16px 20px', borderRadius: '16px 16px 4px 16px', maxWidth: '600px' },
  assistantMessage: { background: 'white', padding: '16px 20px', borderRadius: '16px 16px 16px 4px', maxWidth: '600px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  messageText: { lineHeight: '1.6', whiteSpace: 'pre-wrap' },
  warning: { background: '#fff3cd', color: '#856404', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', marginTop: '12px' },
  humanBadge: { background: '#dc3545', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', marginTop: '12px', display: 'inline-block' },
  sources: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', fontSize: '13px' },
  sourceLink: { display: 'block', color: '#002664', marginTop: '4px', textDecoration: 'none' },
  typing: { display: 'flex', gap: '4px' },
  inputContainer: { background: 'white', borderTop: '1px solid #e5e5e5', padding: '20px 24px' },
  inputWrapper: { maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '12px' },
  input: { flex: 1, padding: '14px 20px', border: '2px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', outline: 'none' },
  sendBtn: { background: '#002664', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  inputDisclaimer: { maxWidth: '900px', margin: '12px auto 0', fontSize: '12px', color: '#999', textAlign: 'center' }
};

export default ChatInterface;