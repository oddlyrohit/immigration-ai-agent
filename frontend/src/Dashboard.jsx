import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

const Dashboard = ({ onStartChat, onOpenCalculator }) => {
  const { user } = useUser();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🇦🇺</div>
            <div>
              <div style={styles.logoTitle}>Immigration AI</div>
              <div style={styles.logoSubtitle}>Dashboard</div>
            </div>
          </div>
          <div style={styles.userSection}>
            <span style={styles.welcomeText}>
              Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div style={styles.content}>
        <div style={styles.welcomeCard}>
          <h1 style={styles.welcomeTitle}>
            Welcome to Your Immigration Dashboard 👋
          </h1>
          <p style={styles.welcomeText}>
            Track your visa journey, calculate points, and get AI-powered guidance
          </p>
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.actionsGrid}>
            <div style={styles.actionCard} onClick={onStartChat}>
              <div style={styles.actionIcon}>💬</div>
              <h3 style={styles.actionTitle}>AI Chat Assistant</h3>
              <p style={styles.actionDesc}>Get instant answers about Australian visas</p>
              <button style={styles.actionBtn}>Start Chat →</button>
            </div>

            <div style={styles.actionCard} onClick={onOpenCalculator}>
              <div style={styles.actionIcon}>🧮</div>
              <h3 style={styles.actionTitle}>Points Calculator</h3>
              <p style={styles.actionDesc}>Calculate your visa eligibility points</p>
              <button style={styles.actionBtn}>Calculate →</button>
            </div>

            <div style={styles.actionCard}>
              <div style={styles.actionIcon}>📄</div>
              <h3 style={styles.actionTitle}>My Documents</h3>
              <p style={styles.actionDesc}>Upload and manage your visa documents</p>
              <button style={styles.actionBtnDisabled} disabled>Coming Soon</button>
            </div>

            <div style={styles.actionCard}>
              <div style={styles.actionIcon}>📊</div>
              <h3 style={styles.actionTitle}>Application Tracker</h3>
              <p style={styles.actionDesc}>Track your visa application status</p>
              <button style={styles.actionBtnDisabled} disabled>Coming Soon</button>
            </div>
          </div>
        </div>

        {/* Profile Overview */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Your Profile</h2>
          <div style={styles.profileCard}>
            <div style={styles.profileHeader}>
              <div style={styles.profileAvatar}>
                {user?.firstName?.charAt(0) || 'U'}
              </div>
              <div>
                <div style={styles.profileName}>
                  {user?.fullName || 'User'}
                </div>
                <div style={styles.profileEmail}>
                  {user?.emailAddresses[0]?.emailAddress}
                </div>
              </div>
            </div>
            <div style={styles.profileStats}>
              <div style={styles.stat}>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Applications</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Documents</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statValue}>0</div>
                <div style={styles.statLabel}>Consultations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div style={styles.activityCard}>
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <p style={styles.emptyText}>No recent activity yet</p>
              <p style={styles.emptySubtext}>Start by using the AI chat or points calculator</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recommended Next Steps</h2>
          <div style={styles.stepsCard}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Calculate Your Points</h4>
                <p style={styles.stepDesc}>Check if you meet the minimum requirements for skilled migration</p>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Chat with AI Assistant</h4>
                <p style={styles.stepDesc}>Get personalized advice about visa pathways</p>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Book MARA Consultation</h4>
                <p style={styles.stepDesc}>Connect with a registered migration agent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  header: { background: 'white', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, zIndex: 100 },
  headerContent: { maxWidth: '1400px', margin: '0 auto', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '40px', height: '40px', background: '#002664', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  logoTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a1a' },
  logoSubtitle: { fontSize: '12px', color: '#666' },
  userSection: { display: 'flex', alignItems: 'center', gap: '16px' },
  welcomeText: { fontSize: '14px', color: '#666', fontWeight: '500' },
  
  content: { maxWidth: '1400px', margin: '0 auto', padding: '40px 32px' },
  welcomeCard: { background: 'linear-gradient(135deg, #002664 0%, #0056b3 100%)', color: 'white', padding: '48px', borderRadius: '16px', marginBottom: '40px', textAlign: 'center' },
  welcomeTitle: { fontSize: '36px', fontWeight: '700', marginBottom: '12px', margin: 0 },
  
  section: { marginBottom: '48px' },
  sectionTitle: { fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' },
  
  actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' },
  actionCard: { background: 'white', padding: '32px', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', ':hover': { transform: 'translateY(-4px)' } },
  actionIcon: { fontSize: '48px', marginBottom: '16px' },
  actionTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a' },
  actionDesc: { fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.5' },
  actionBtn: { width: '100%', background: '#002664', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  actionBtnDisabled: { width: '100%', background: '#e5e5e5', color: '#999', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'not-allowed' },
  
  profileCard: { background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e5e5' },
  profileAvatar: { width: '64px', height: '64px', borderRadius: '50%', background: '#002664', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' },
  profileName: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  profileEmail: { fontSize: '14px', color: '#666' },
  profileStats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' },
  stat: {},
  statValue: { fontSize: '32px', fontWeight: '700', color: '#002664', marginBottom: '4px' },
  statLabel: { fontSize: '14px', color: '#666' },
  
  activityCard: { background: 'white', padding: '48px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  emptyState: { textAlign: 'center' },
  emptyIcon: { fontSize: '64px', marginBottom: '16px' },
  emptyText: { fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' },
  emptySubtext: { fontSize: '14px', color: '#666' },
  
  stepsCard: { background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  step: { display: 'flex', gap: '20px', padding: '24px 0', borderBottom: '1px solid #e5e5e5', ':last-child': { borderBottom: 'none' } },
  stepNumber: { width: '40px', height: '40px', borderRadius: '50%', background: '#002664', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', flexShrink: 0 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a' },
  stepDesc: { fontSize: '14px', color: '#666', lineHeight: '1.5', margin: 0 }
};

export default Dashboard;