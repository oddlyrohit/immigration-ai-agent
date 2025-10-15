import React, { useState } from 'react';
import ChatInterface from './ChatInterface';

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState('');

  if (showChat) {
    return <ChatInterface initialMessage={selectedVisa} onBack={() => setShowChat(false)} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🇦🇺</div>
            <div>
              <div style={styles.logoTitle}>Immigration AI</div>
              <div style={styles.logoSubtitle}>Australia • MARA-ready handoff</div>
            </div>
          </div>
          <nav style={styles.nav}>
            <a href="#why" style={styles.navLink}>Why us</a>
            <a href="#visas" style={styles.navLink}>Visas</a>
            <button style={styles.signInBtn}>Sign in</button>
            <button style={styles.ctaBtn} onClick={() => setShowChat(true)}>
              Start free assessment
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.badge}>
              🟢 Live policy-aware • Updated daily
            </div>
            <h1 style={styles.heroTitle}>
              Your AI co-pilot for<br />
              <span style={styles.heroHighlight}>Australian visas</span>
            </h1>
            <p style={styles.heroText}>
              Instant answers, eligibility checks, smart checklists, and live rule updates — 
              with a seamless handoff to our in-house registered MARA professional when you're ready to lodge.
            </p>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Ask anything about your visa... e.g. 'Points for 190 in VIC?'"
                style={styles.searchInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedVisa(e.target.value);
                    setShowChat(true);
                  }
                }}
              />
              <button style={styles.askBtn} onClick={() => setShowChat(true)}>Ask</button>
            </div>
            <div style={styles.quickQuestions}>
              {['Am I eligible for subclass 189?', 'What points do I need for 190 VIC?', 
                'Student visa to PR pathway?', '491 vs 482: which suits me?'].map((q, i) => (
                <button
                  key={i}
                  style={styles.quickBtn}
                  onClick={() => { setSelectedVisa(q); setShowChat(true); }}
                >
                  {q}
                </button>
              ))}
            </div>
            <p style={styles.disclaimer}>
              <strong>Disclaimer:</strong> This platform is just for your information and does not provide legal 
              immigration assistance. We connect you with our in-house MARA-registered professionals for review & lodgement.
            </p>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.chartPlaceholder}>
            <img src="/success-rate-hero.svg" alt="Success Rate Visualization" />
              📊 Success Rate Visualization
            </div>
          </div>
        </div>
      </section>

      {/* Why Immigration AI Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Immigration AI</h2>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureTitle}>AI Visa Copilot</h3>
            <p style={styles.featureText}>
              Chat in plain English. Instant, tailored pathways, risks, and next steps for Australian visas.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>✓</div>
            <h3 style={styles.featureTitle}>Smart Checklists</h3>
            <p style={styles.featureText}>
              Auto-generated document lists, deadlines, and reminders you can tick off as you go.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📢</div>
            <h3 style={styles.featureTitle}>Live Rule Updates</h3>
            <p style={styles.featureText}>
              Keep pace with Home Affairs notices, state nomination changes, and policy tweaks.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>👔</div>
            <h3 style={styles.featureTitle}>MARA Handoff</h3>
            <p style={styles.featureText}>
              One-click transfer to a registered MARA professional for review and lodgement.
            </p>
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section style={styles.section} id="visas">
        <h2 style={styles.sectionTitle}>Explore by Visa Type</h2>
        <div style={styles.visaGrid}>
          {[
            { icon: '🎓', title: 'Student Visas', desc: 'Guides • Checklists • FAQs' },
            { icon: '💼', title: 'Skilled Visas', desc: 'Points calculator • Occupation lists' },
            { icon: '🏢', title: 'Business Visas', desc: 'Guides • Checklists • FAQs' },
            { icon: '❤️', title: 'Partner Visas', desc: 'Guides • Checklists • FAQs' }
          ].map((visa, i) => (
            <div key={i} style={styles.visaCard} onClick={() => { setSelectedVisa(visa.title); setShowChat(true); }}>
              <div style={styles.visaIcon}>{visa.icon}</div>
              <h3 style={styles.visaTitle}>{visa.title}</h3>
              <p style={styles.visaDesc}>{visa.desc}</p>
              <button style={styles.exploreBtn}>Explore →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Three Column Section */}
      <section style={styles.section}>
        <div style={styles.threeCol}>
          <div style={styles.colCard}>
            <h3 style={styles.colTitle}>Pathway Planner</h3>
            <h4 style={styles.colSubtitle}>From student to PR — see your options</h4>
            <ul style={styles.colList}>
              <li>Points estimator for 189/190/491</li>
              <li>State vs. demand signals</li>
              <li>Risk flags & alternatives</li>
            </ul>
            <button style={styles.colBtn}>Try the planner →</button>
          </div>
          <div style={styles.colCard}>
            <h3 style={styles.colTitle}>Compliance</h3>
            <h4 style={styles.colSubtitle}>MARA-ready handoff</h4>
            <p style={styles.colText}>
              We don't lodge applications. When you're ready, transfer your case securely 
              to a registered MARA professional for review and lodgement.
            </p>
            <p style={styles.colDisclaimer}>
              Not immigration assistance. Information only. Always consider obtaining 
              advice from a registered migration agent.
            </p>
          </div>
          <div style={styles.colCard}>
            <h3 style={styles.colTitle}>Updates</h3>
            <h4 style={styles.colSubtitle}>Live policy feed</h4>
            <div style={styles.updatesList}>
              <div style={styles.updateItem}>
                <span style={styles.updateTitle}>Home Affairs notice</span>
                <span style={styles.updateDate}>today</span>
              </div>
              <div style={styles.updateItem}>
                <span style={styles.updateTitle}>VIC 190 nomination update</span>
                <span style={styles.updateDate}>2d ago</span>
              </div>
              <div style={styles.updateItem}>
                <span style={styles.updateTitle}>New English test equivalence</span>
                <span style={styles.updateDate}>1w ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={styles.section}>
        <div style={styles.pricing}>
          <div style={styles.priceCard}>
            <div style={styles.priceTier}>Starter</div>
            <div style={styles.priceAmount}>Free</div>
            <ul style={styles.priceFeatures}>
              <li>Basic Q&A</li>
              <li>Starter checklists</li>
              <li>Limited updates</li>
            </ul>
            <button style={styles.priceBtn}>Get started</button>
          </div>
          <div style={{...styles.priceCard, ...styles.priceCardPopular}}>
            <div style={styles.popularBadge}>Most popular</div>
            <div style={styles.priceTier}>Pro</div>
            <div style={styles.priceAmount}>$19/mo</div>
            <ul style={styles.priceFeatures}>
              <li>Full planner & points</li>
              <li>Smart reminders</li>
              <li>Unlimited updates</li>
            </ul>
            <button style={styles.priceBtnPrimary}>Start Pro</button>
          </div>
          <div style={styles.priceCard}>
            <div style={styles.priceTier}>Pro + MARA</div>
            <div style={styles.priceAmount}>On request</div>
            <ul style={styles.priceFeatures}>
              <li>Case export</li>
              <li>Secure MARA handoff</li>
              <li>Human review call</li>
            </ul>
            <button style={styles.priceBtn}>Talk to us</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerTitle}>Immigration AI</div>
            <div style={styles.footerLocation}>Melbourne, Australia</div>
            <div style={styles.footerCopyright}>© 2025 Immigration AI. All rights reserved.</div>
          </div>
          <div style={styles.footerLinks}>
            <a href="#terms" style={styles.footerLink}>Terms</a>
            <a href="#privacy" style={styles.footerLink}>Privacy</a>
            <a href="#compliance" style={styles.footerLink}>Compliance</a>
          </div>
          <div style={styles.footerDisclaimer}>
            <strong>Disclaimer</strong>
            <p>This platform provides general information only and is not a substitute for 
            advice from a registered migration agent. We partner with MARA-registered 
            professionals for review and lodgement.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#1a1a1a' },
  header: { background: 'white', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, zIndex: 100 },
  headerContent: { maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '40px', height: '40px', background: '#002664', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  logoTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a1a' },
  logoSubtitle: { fontSize: '12px', color: '#666' },
  nav: { display: 'flex', alignItems: 'center', gap: '24px' },
  navLink: { color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
  signInBtn: { background: 'none', border: 'none', color: '#1a1a1a', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
  ctaBtn: { background: '#1a1a1a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  hero: { background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)', padding: '80px 24px' },
  heroContent: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' },
  heroLeft: {},
  badge: { background: 'white', border: '1px solid #e5e5e5', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', display: 'inline-block', marginBottom: '24px' },
  heroTitle: { fontSize: '56px', fontWeight: '700', lineHeight: '1.1', marginBottom: '24px' },
  heroHighlight: { color: '#002664' },
  heroText: { fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '32px' },
  searchBox: { display: 'flex', gap: '12px', marginBottom: '16px' },
  searchInput: { flex: 1, padding: '14px 20px', border: '2px solid #e5e5e5', borderRadius: '8px', fontSize: '15px' },
  askBtn: { background: '#002664', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  quickQuestions: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' },
  quickBtn: { background: 'white', border: '1px solid #e5e5e5', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' },
  disclaimer: { fontSize: '13px', color: '#666', lineHeight: '1.5' },
  heroRight: { display: 'flex', justifyContent: 'center' },
  chartPlaceholder: { width: '100%', height: '300px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
  sectionTitle: { fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '48px' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' },
  featureCard: { textAlign: 'center' },
  featureIcon: { width: '60px', height: '60px', background: '#002664', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px', color: 'white' },
  featureTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '12px' },
  featureText: { fontSize: '14px', color: '#666', lineHeight: '1.6' },
  visaGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' },
  visaCard: { background: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' },
  visaIcon: { fontSize: '40px', marginBottom: '16px' },
  visaTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '8px' },
  visaDesc: { fontSize: '14px', color: '#666', marginBottom: '16px' },
  exploreBtn: { background: 'none', border: 'none', color: '#002664', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  threeCol: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' },
  colCard: { background: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '32px' },
  colTitle: { fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: '#666', marginBottom: '8px' },
  colSubtitle: { fontSize: '20px', fontWeight: '600', marginBottom: '16px' },
  colList: { listStyle: 'none', padding: 0, marginBottom: '16px', fontSize: '14px', lineHeight: '2' },
  colBtn: { background: 'none', border: 'none', color: '#002664', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  colText: { fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '16px' },
  colDisclaimer: { fontSize: '12px', color: '#999', fontStyle: 'italic' },
  updatesList: {},
  updateItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' },
  updateTitle: { fontSize: '14px' },
  updateDate: { fontSize: '12px', color: '#999' },
  pricing: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  priceCard: { background: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '32px', position: 'relative' },
  priceCardPopular: { border: '2px solid #002664' },
  popularBadge: { position: 'absolute', top: '-12px', right: '24px', background: '#ffc107', color: '#1a1a1a', padding: '4px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  priceTier: { fontSize: '14px', fontWeight: '600', marginBottom: '8px' },
  priceAmount: { fontSize: '36px', fontWeight: '700', marginBottom: '24px' },
  priceFeatures: { listStyle: 'none', padding: 0, marginBottom: '24px', fontSize: '14px', lineHeight: '2' },
  priceBtn: { width: '100%', background: 'white', border: '1px solid #e5e5e5', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  priceBtnPrimary: { width: '100%', background: '#ffc107', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  footer: { background: '#f5f7fa', padding: '60px 24px' },
  footerContent: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '48px' },
  footerTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '8px' },
  footerLocation: { fontSize: '14px', color: '#666', marginBottom: '4px' },
  footerCopyright: { fontSize: '12px', color: '#999' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '12px' },
  footerLink: { color: '#666', textDecoration: 'none', fontSize: '14px' },
  footerDisclaimer: { fontSize: '12px', color: '#666', lineHeight: '1.6' }
};

export default LandingPage;